"use client";

import { SAMPLE_PRESETS } from "@/lib/sampleData";
import { SamplePreset } from "@/lib/types";
import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Tag } from "lucide-react";

interface SampleSelectorProps {
  onSelectSample: (sample: SamplePreset) => void;
  selectedId?: string;
}

export default function SampleSelector({ onSelectSample, selectedId }: SampleSelectorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Instant Test Presets (SIH Demo Showcase)
          </h4>
        </div>
        <span className="text-[11px] text-slate-500">1-Click Tryout</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {SAMPLE_PRESETS.map((sample) => {
          const isSelected = selectedId === sample.id;
          const isNonCompliant = sample.id === "sample-5";

          return (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? "border-sky-500 bg-sky-50/80 ring-2 ring-sky-500/20 shadow-xs"
                  : "border-slate-200 hover:border-sky-300 bg-white hover:bg-slate-50/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {sample.category}
                  </span>
                  {isNonCompliant ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                      <AlertTriangle className="w-3 h-3" />
                      Violation Demo
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Compliant
                    </span>
                  )}
                </div>

                <h5 className="font-semibold text-slate-900 text-xs line-clamp-1">
                  {sample.product_name}
                </h5>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Confidence: {sample.ocr_confidence}%</span>
                <span className="text-sky-600 font-semibold group-hover:underline">Select →</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
