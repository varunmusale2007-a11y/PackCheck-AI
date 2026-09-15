import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "Just now";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return dateString;
  }
}

export function getScoreDetails(score: number) {
  if (score >= 90) {
    return {
      label: "COMPLIANT",
      color: "#16A34A",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200",
      ringColor: "#22C55E",
      desc: "Fully adheres to Legal Metrology Packaged Commodities Rules, 2011."
    };
  } else if (score >= 60) {
    return {
      label: "PARTIALLY COMPLIANT",
      color: "#D97706",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
      ringColor: "#F59E0B",
      desc: "Minor mandatory or recommended label declarations are missing or formatted incorrectly."
    };
  } else {
    return {
      label: "NON-COMPLIANT",
      color: "#DC2626",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      borderColor: "border-rose-200",
      ringColor: "#EF4444",
      desc: "Critical mandatory declarations missing. High statutory penalty and seizure risk."
    };
  }
}
