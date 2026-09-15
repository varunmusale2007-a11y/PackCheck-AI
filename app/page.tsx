"use client";

import Link from "next/link";
import {
  ShieldCheck,
  ScanLine,
  FileText,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Scale,
  Database,
  Eye,
  DownloadCloud,
  Cpu
} from "lucide-react";

export default function HomePage() {
  const rulesList = [
    {
      clause: "Rule 6(1)(e)",
      title: "MRP & Taxes",
      desc: "Mandatory Maximum Retail Price with '(incl. of all taxes)' statement & unit sale price."
    },
    {
      clause: "Rule 6(1)(c)",
      title: "Net Quantity / Metric Unit",
      desc: "Standard metric weights (g, kg, ml, L) without informal plurals (e.g. 'gms')."
    },
    {
      clause: "Rule 6(1)(b)",
      title: "Manufacturer & PIN",
      desc: "Complete postal address with 6-digit Indian PIN code & mfg/packer classification."
    },
    {
      clause: "Rule 6(1)(d)",
      title: "Date of Mfg / Packing",
      desc: "Month and year of manufacture, packaging, or import in clear chronological format."
    },
    {
      clause: "Rule 6(1)(g)",
      title: "Consumer Care Contact",
      desc: "Mandatory helpline telephone number, email ID, and designation for complaints."
    },
    {
      clause: "Rule 6(1)(h)",
      title: "Country of Origin",
      desc: "Unambiguous country declaration (e.g. 'Made in India' / 'Country of Origin')."
    },
    {
      clause: "Sec 31 FSS Act",
      title: "14-Digit FSSAI Lic No.",
      desc: "Valid 14-digit Food Safety license number validation for all edible commodities."
    },
    {
      clause: "Rule 6(1)(i)",
      title: "Batch / Lot Code",
      desc: "Traceability identification code for batch tracking and recall audits."
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Smart India Hackathon 2026 • PS SIH26034</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Automated <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">Legal Metrology</span> Compliance Engine
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Instantly audit packaged commodity labels against India’s <b>Legal Metrology (Packaged Commodities) Rules, 2011</b>. Upload label images, extract text with multi-tier OCR, evaluate mandatory declarations, and generate official compliance certificates.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/scan"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white shadow-lg shadow-sky-500/25 hover:shadow-xl transition-all flex items-center gap-2 active:scale-95"
            >
              <ScanLine className="w-4 h-4" />
              <span>Start Label Audit</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/history"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-sky-400" />
              <span>View Scan History</span>
            </Link>
          </div>
        </div>

        {/* Decorative Grid and Glow */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Multi-Engine OCR Pipeline</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Image preprocessing (contrast, sharpening, deskewing) with EasyOCR & Tesseract fallback for reliable text extraction under varied packaging lighting.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">11+ Legal Metrology Rules</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Comprehensive regex and NLP rule validators verifying MRP, Net Quantity, PIN code address, manufacturing date, FSSAI lic no., and consumer grievance redressal.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <DownloadCloud className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">PDF Certificate & Penalties</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generates official Ministry of Consumer Affairs styled audit reports in PDF format along with statutory penalty risk calculations under Section 36 of the Act.
          </p>
        </div>
      </section>

      {/* Rules Covered Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Statutory Rule Suite</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Legal Metrology (Packaged Commodities) Rules Checked
            </h2>
          </div>

          <Link
            href="/scan"
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Try scanning a sample</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rulesList.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-2"
            >
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 inline-block">
                {rule.clause}
              </span>
              <h4 className="font-bold text-sm text-slate-900">{rule.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works / Workflow */}
      <section className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            End-to-End Workflow
          </span>
          <h3 className="text-2xl font-bold">How MetrologyGuard Works</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center mx-auto text-lg font-bold">
              1
            </div>
            <h4 className="font-bold text-sm">Image Upload / Capture</h4>
            <p className="text-xs text-slate-400">
              Drag & drop packaging photo or capture directly using your camera.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto text-lg font-bold">
              2
            </div>
            <h4 className="font-bold text-sm">Adaptive OCR</h4>
            <p className="text-xs text-slate-400">
              Filters enhance text contrast and extract full packaging declarations.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-lg font-bold">
              3
            </div>
            <h4 className="font-bold text-sm">Rule Evaluation</h4>
            <p className="text-xs text-slate-400">
              Python validation engine evaluates mandatory legal rules and assigns scores.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto text-lg font-bold">
              4
            </div>
            <h4 className="font-bold text-sm">Audit Certificate</h4>
            <p className="text-xs text-slate-400">
              Instant interactive checklist, missing field alerts, penalty risk, and PDF.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
