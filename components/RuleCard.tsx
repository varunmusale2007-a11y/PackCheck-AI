"use client";

import { useState } from "react";
import { RuleResult } from "@/lib/types";
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, Lightbulb, Scale, Tag } from "lucide-react";

interface RuleCardProps {
  rule: RuleResult;
  index: number;
}

export default function RuleCard({ rule, index }: RuleCardProps) {
  const [isOpen, setIsOpen] = useState(rule.status !== "PASS");

  const isPass = rule.status === "PASS";
  const isWarn = rule.status === "WARNING";
  const isFail = rule.status === "FAIL";

  const statusConfig = {
    PASS: {
      border: "border-emerald-200 hover:border-emerald-300",
      bg: "bg-white",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      label: "PASS"
    },
    WARNING: {
      border: "border-amber-200 hover:border-amber-300",
      bg: "bg-amber-50/30",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      label: "WARNING"
    },
    FAIL: {
      border: "border-rose-200 hover:border-rose-300",
      bg: "bg-rose-50/30",
      badgeBg: "bg-rose-100 text-rose-800 border-rose-200",
      icon: XCircle,
      iconColor: "text-rose-600",
      label: "FAIL"
    }
  }[rule.status];

  const Icon = statusConfig.icon;

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${statusConfig.border} ${statusConfig.bg} shadow-xs`}
    >
      {/* Header / Clickable summary */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
      >
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Status Icon */}
          <div className="mt-0.5 sm:mt-0 flex-shrink-0">
            <Icon className={`w-5 h-5 ${statusConfig.iconColor}`} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-900 text-sm sm:text-base">
                {rule.rule_name}
              </span>
              {rule.is_mandatory && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Mandatory
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <Scale className="w-3 h-3 text-slate-400" />
              <span>{rule.legal_clause}</span>
            </div>
          </div>
        </div>

        {/* Right Badge & Arrow */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusConfig.badgeBg}`}
          >
            {statusConfig.label}
          </span>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Accordion Details */}
      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 text-sm">
          {/* Extracted Value */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
              <Tag className="w-3.5 h-3.5 text-sky-600" />
              <span>Detected Label Content:</span>
            </div>
            {rule.extracted_value ? (
              <p className="font-mono text-xs text-slate-800 bg-white p-2 rounded border border-slate-200 font-medium">
                {rule.extracted_value}
              </p>
            ) : (
              <p className="text-xs text-rose-600 italic font-medium">
                No matching declaration detected on packaging label.
              </p>
            )}
          </div>

          {/* Finding / Reason */}
          <div className="text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800">Audit Finding: </span>
            {rule.reason}
          </div>

          {/* Smart Recommendation / Suggestion */}
          {rule.suggestion && (
            <div className="flex items-start gap-2 text-xs bg-sky-50 text-sky-900 p-2.5 rounded-lg border border-sky-200">
              <Lightbulb className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Corrective Action: </span>
                <span>{rule.suggestion}</span>
              </div>
            </div>
          )}

          {/* Legal Reference Note */}
          {rule.legal_reference && (
            <div className="text-[11px] text-slate-500 italic">
              <b>Statutory Note:</b> {rule.legal_reference}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
