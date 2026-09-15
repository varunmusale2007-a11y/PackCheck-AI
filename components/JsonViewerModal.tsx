"use client";

import { useState } from "react";
import { Code, X, Copy, Check } from "lucide-react";

interface JsonViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  title?: string;
}

export default function JsonViewerModal({
  isOpen,
  onClose,
  data,
  title = "Raw JSON API Response",
}: JsonViewerModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-slate-900 text-slate-100 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-sky-400" />
            <h3 className="font-semibold text-sm">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* JSON Content */}
        <div className="p-4 overflow-y-auto font-mono text-xs text-sky-300 bg-slate-900/90 leading-relaxed">
          <pre>{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>FastAPI REST Schema Validated</span>
          <span>{data?.rules_detail?.length || 0} Legal Metrology Rules Evaluated</span>
        </div>
      </div>
    </div>
  );
}
