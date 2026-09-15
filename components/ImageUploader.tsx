"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { UploadCloud, Image as ImageIcon, Camera, Trash2, CheckCircle2 } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  onClear: () => void;
  onOpenCamera: () => void;
  selectedFile: File | null;
  previewUrl: string | null;
}

export default function ImageUploader({
  onImageSelected,
  onClear,
  onOpenCamera,
  selectedFile,
  previewUrl,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        onImageSelected(file);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[240px] ${
            isDragging
              ? "border-sky-500 bg-sky-50/70 scale-[0.99]"
              : "border-slate-300 hover:border-sky-400 bg-slate-50/50 hover:bg-sky-50/30"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-3 shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h4 className="font-semibold text-slate-800 text-base mb-1">
            Drag & drop packaged product label image
          </h4>
          <p className="text-xs text-slate-500 mb-4 max-w-sm">
            Upload clear photos of front/back product labels. Supports JPG, PNG, WEBP (Max 15MB).
          </p>

          <div className="flex flex-wrap items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Browse Files
            </button>
            <span className="text-xs text-slate-400">or</span>
            <button
              type="button"
              onClick={onOpenCamera}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Camera className="w-3.5 h-3.5 text-sky-600" />
              <span>Use Camera</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Uploaded Label Preview"
            className="w-full max-h-[300px] object-contain mx-auto"
          />

          {/* Overlay info */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-medium truncate max-w-[200px] sm:max-w-xs">
                {selectedFile?.name || "Uploaded Image"}
              </span>
            </div>

            <button
              type="button"
              onClick={onClear}
              className="p-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
