import { formatCurrency } from "@/lib/utils";
import { AlertOctagon, ShieldAlert, CheckCircle, Scale } from "lucide-react";

interface PenaltyCardProps {
  penaltyInr: number;
  failedCount: number;
  warningCount: number;
}

export default function PenaltyCard({ penaltyInr, failedCount, warningCount }: PenaltyCardProps) {
  const isCompliant = penaltyInr === 0;

  return (
    <div
      className={`rounded-2xl p-5 border shadow-sm transition-all ${
        isCompliant
          ? "bg-gradient-to-br from-emerald-50 to-emerald-100/40 border-emerald-200"
          : "bg-gradient-to-br from-rose-50 via-white to-amber-50 border-rose-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isCompliant ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
            }`}
          >
            {isCompliant ? <CheckCircle className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {isCompliant ? "Statutory Compliance Clear" : "Legal Penalty Risk Estimate"}
            </h3>
            <p className="text-xs text-slate-600">
              Section 36 of Legal Metrology Act, 2009 & Packaged Commodities Rules
            </p>
          </div>
        </div>

        {/* Fine Amount */}
        <div className="text-right">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-500 block">
            {isCompliant ? "Statutory Fine" : "Estimated Maximum Fine"}
          </span>
          <span
            className={`text-2xl font-extrabold ${
              isCompliant ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {formatCurrency(penaltyInr)}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-700 leading-relaxed">
        {isCompliant ? (
          <p className="flex items-center gap-2 text-emerald-800 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>
              All mandatory packaging rules are satisfied. Zero penalty risk under Legal Metrology Act.
            </span>
          </p>
        ) : (
          <div className="space-y-1.5">
            <p className="font-semibold text-rose-800">
              Notice: {failedCount} mandatory declaration(s) failed validation.
            </p>
            <p className="text-slate-600">
              Under <b>Section 36(1)</b>, manufacturing, packing or selling non-standard packages attracts a fine up to <b>₹25,000</b> for the first offence, escalating to <b>₹50,000</b> and imprisonment up to one year for repeat offences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
