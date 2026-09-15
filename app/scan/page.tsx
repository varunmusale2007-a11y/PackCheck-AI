"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import CameraModal from "@/components/CameraModal";
import SampleSelector from "@/components/SampleSelector";
import { SamplePreset } from "@/lib/types";
import { uploadImageApi, runOcrApi, checkComplianceApi } from "@/lib/api";
import {
  ScanLine,
  FileText,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  Tag,
  CheckCircle2,
  RefreshCw,
  Edit3
} from "lucide-react";

export default function ScanPage() {
  const router = useRouter();

  // Mode: "upload" | "paste"
  const [mode, setMode] = useState<"upload" | "paste">("upload");

  // State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Form Fields
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Food & FMCG");
  const [extractedText, setExtractedText] = useState("");
  const [ocrConfidence, setOcrConfidence] = useState<number>(90.0);
  const [activeSampleId, setActiveSampleId] = useState<string | undefined>();

  // Loading & Step states
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [isCheckingCompliance, setIsCheckingCompliance] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const categories = [
    "Food & FMCG",
    "Beverages",
    "Cosmetics & Personal Care",
    "Electronics & Appliances",
    "Pharmaceuticals & Healthcare",
    "General Commodity"
  ];

  const handleImageSelected = async (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
    setActiveSampleId(undefined);

    try {
      setIsProcessingOcr(true);
      setStatusMessage("Uploading packaging label...");
      const uploadRes = await uploadImageApi(file);
      setUploadedFilename(uploadRes.filename);

      setStatusMessage("Running multi-tier OCR pipeline & image enhancement...");
      const ocrRes = await runOcrApi(uploadRes.filename);

      setExtractedText(ocrRes.text);
      setOcrConfidence(ocrRes.confidence);
      setStatusMessage("Text extracted successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process image OCR. You can paste the text manually below.");
    } finally {
      setIsProcessingOcr(false);
    }
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadedFilename(null);
    setExtractedText("");
    setActiveSampleId(undefined);
    setError(null);
  };

  const handleSelectSample = (sample: SamplePreset) => {
    setActiveSampleId(sample.id);
    setProductName(sample.product_name);
    setCategory(sample.category);
    setExtractedText(sample.text);
    setOcrConfidence(sample.ocr_confidence);
    setUploadedFilename(sample.image_filename);
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
  };

  const handleRunAudit = async () => {
    if (!extractedText.trim()) {
      setError("Please provide packaging label text either via image upload, OCR, or text paste.");
      return;
    }

    setError(null);
    setIsCheckingCompliance(true);

    try {
      const report = await checkComplianceApi({
        text: extractedText,
        category: category,
        product_name: productName || "Packaged Commodity",
        image_filename: uploadedFilename,
        confidence: ocrConfidence,
      });

      if (report.id) {
        router.push(`/report/${report.id}`);
      } else {
        setError("Audit completed but failed to retrieve record ID.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Compliance audit verification failed.");
    } finally {
      setIsCheckingCompliance(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider">
          <ScanLine className="w-4 h-4" />
          <span>Statutory Compliance Scanner</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Verify Packaged Commodity Label
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Upload a clear label photo or choose a pre-loaded sample. Our AI extracts declarations and checks against India’s Legal Metrology Rules.
        </p>
      </div>

      {/* Preset Showcase */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <SampleSelector onSelectSample={handleSelectSample} selectedId={activeSampleId} />
      </div>

      {/* Main Scan Workbench */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              mode === "upload"
                ? "bg-white text-sky-700 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ScanLine className="w-4 h-4 text-sky-600" />
            <span>Image Upload & Camera OCR</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("paste")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              mode === "paste"
                ? "bg-white text-sky-700 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Edit3 className="w-4 h-4 text-sky-600" />
            <span>Paste / Edit Label Text Directly</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Product Title / Brand
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Aashirvaad Atta / Britannia Biscuits"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload Mode UI */}
          {mode === "upload" && (
            <div className="space-y-4">
              <ImageUploader
                selectedFile={selectedFile}
                previewUrl={previewUrl}
                onImageSelected={handleImageSelected}
                onClear={handleClearImage}
                onOpenCamera={() => setIsCameraOpen(true)}
              />

              {isProcessingOcr && (
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-3 text-sky-800 text-xs font-medium">
                  <Loader2 className="w-4 h-4 text-sky-600 animate-spin" />
                  <span>{statusMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* Extracted / Editable Text Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>Extracted Packaging Label Text</span>
              </label>
              <span className="text-[11px] text-slate-500">
                {extractedText ? `${extractedText.split(/\s+/).filter(Boolean).length} words` : "0 words"} • OCR Confidence: {ocrConfidence}%
              </span>
            </div>

            <textarea
              rows={8}
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              placeholder="Packaging text will appear here automatically after OCR extraction. You can also paste or edit text directly..."
              className="w-full p-4 rounded-2xl border border-slate-300 font-mono text-xs text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all leading-relaxed"
            />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleRunAudit}
              disabled={isCheckingCompliance || isProcessingOcr || !extractedText.trim()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isCheckingCompliance ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Legal Metrology Rules...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Compliance Audit</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleImageSelected}
      />
    </div>
  );
}
