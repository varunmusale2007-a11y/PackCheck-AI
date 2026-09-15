"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ComplianceReport } from "@/lib/types";
import { getReportByIdApi, getPdfDownloadUrl } from "@/lib/api";
import { formatDate, getScoreDetails } from "@/lib/utils";
import ComplianceGauge from "@/components/ComplianceGauge";
import RuleCard from "@/components/RuleCard";
import PenaltyCard from "@/components/PenaltyCard";
import JsonViewerModal from "@/components/JsonViewerModal";

import {
  FileText,
  DownloadCloud,
  Code,
  ScanLine,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Share2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  Check
} from "lucide-react";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id as string;

  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!reportId) return;

    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await getReportByIdApi(reportId);
        setReport(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load compliance audit report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
        <p className="text-sm font-medium text-slate-600">
          Loading Legal Metrology compliance audit report...
        </p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl border border-rose-200 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Report Not Found</h2>
        <p className="text-xs text-slate-500">{error || "The requested audit record does not exist."}</p>
        <Link
          href="/scan"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all"
        >
          <ScanLine className="w-4 h-4" />
          <span>Scan New Product</span>
        </Link>
      </div>
    );
  }

  const scoreInfo = getScoreDetails(report.compliance_score);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/history"
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-600 uppercase">
                Audit #{report.id}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">{formatDate(report.created_at)}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {report.product_name}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsJsonModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Code className="w-3.5 h-3.5 text-slate-500" />
            <span>JSON API</span>
          </button>

          <a
            href={getPdfDownloadUrl(report.id!)}
            download
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white text-xs font-bold shadow-md shadow-sky-500/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Download PDF Certificate</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Left Column Gauge + Stats, Right Column Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Animated Gauge */}
          <ComplianceGauge
            score={report.compliance_score}
            status={report.status}
            passedCount={report.passed_rules}
            totalCount={report.total_rules}
          />

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-center gap-1 text-emerald-700 text-xs font-bold mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pass</span>
              </div>
              <span className="text-lg font-extrabold text-emerald-900">{report.passed_rules}</span>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center justify-center gap-1 text-amber-700 text-xs font-bold mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Warn</span>
              </div>
              <span className="text-lg font-extrabold text-amber-900">{report.warning_rules}</span>
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
              <div className="flex items-center justify-center gap-1 text-rose-700 text-xs font-bold mb-0.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>Fail</span>
              </div>
              <span className="text-lg font-extrabold text-rose-900">{report.failed_rules}</span>
            </div>
          </div>

          {/* Penalty Risk Assessment */}
          <PenaltyCard
            penaltyInr={report.penalty_estimate_inr}
            failedCount={report.failed_rules}
            warningCount={report.warning_rules}
          />

          {/* Audit Metadata */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-2">
              Audit Specifications
            </h4>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-semibold text-slate-800">{report.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">OCR Confidence:</span>
                <span className="font-semibold text-slate-800">{report.ocr_confidence}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Legal Standard:</span>
                <span className="font-semibold text-slate-800">LM (PC) Rules 2011</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Database Record:</span>
                <span className="font-mono text-emerald-600 font-bold">Neon PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Checklist & Extracted Text */}
        <div className="lg:col-span-8 space-y-6">
          {/* Missing Mandatory Fields Alert Banner */}
          {report.missing_fields && report.missing_fields.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Critical Missing Mandatory Declarations ({report.missing_fields.length})</span>
              </div>
              <p className="text-xs text-rose-700">
                The following required fields under Legal Metrology Rules were not found on the label:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {report.missing_fields.map((field, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-100/80 text-rose-800 border border-rose-300 flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>{field}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Rules Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Statutory Rule-by-Rule Checklist ({report.rules_detail.length})</span>
              </h3>
              <span className="text-xs text-slate-500">Click any rule to inspect findings</span>
            </div>

            <div className="space-y-3">
              {report.rules_detail.map((rule, idx) => (
                <RuleCard key={rule.rule_id || idx} rule={rule} index={idx} />
              ))}
            </div>
          </div>

          {/* Raw Extracted Label Snippet Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>OCR Extracted Text Transcript</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">
                {report.ocr_text.length} characters
              </span>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-50 font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed border border-slate-200 max-h-48 overflow-y-auto">
              {report.ocr_text}
            </pre>
          </div>
        </div>
      </div>

      {/* JSON Viewer Modal */}
      <JsonViewerModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        data={report}
        title={`Audit Report #${report.id} JSON Schema`}
      />
    </div>
  );
}
