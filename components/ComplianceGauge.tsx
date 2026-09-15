"use client";

import { useEffect, useState } from "react";
import { getScoreDetails } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Award } from "lucide-react";

interface ComplianceGaugeProps {
  score: number;
  status: string;
  passedCount?: number;
  totalCount?: number;
  size?: number;
}

export default function ComplianceGauge({
  score,
  status,
  passedCount = 0,
  totalCount = 11,
  size = 200,
}: ComplianceGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const details = getScoreDetails(score);

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  // SVG calculations
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const StatusIcon = score >= 90 ? CheckCircle2 : score >= 60 ? AlertTriangle : XCircle;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      {/* Gauge Container */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={details.ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            {animatedScore}%
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-0.5">
            Compliance
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-5 flex flex-col items-center gap-2 text-center">
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${details.bgColor} ${details.textColor} ${details.borderColor}`}
        >
          <StatusIcon className="w-4 h-4" />
          <span>{details.label}</span>
        </div>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          {details.desc}
        </p>
        <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md">
          <Award className="w-3.5 h-3.5 text-sky-600" />
          <span>
            {passedCount} of {totalCount} Rules Satisfied
          </span>
        </div>
      </div>
    </div>
  );
}
