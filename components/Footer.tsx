import Link from "next/link";
import { ShieldCheck, ExternalLink, Award, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/80 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 text-lg">
                Metrology<span className="text-sky-600">Guard</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Automated Legal Metrology (Packaged Commodities) Rules 2011 compliance verification engine developed for <b>Smart India Hackathon 2026</b> (Problem Statement: <b>SIH26034</b>).
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Ministry of Consumer Affairs, Food & Public Distribution Guidelines</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Compliance Rules
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Rule 6(1)(e): Maximum Retail Price (MRP)</li>
              <li>Rule 6(1)(c): Net Weight / Quantity</li>
              <li>Rule 6(1)(b): Manufacturer & PIN Code</li>
              <li>Rule 6(1)(g): Consumer Care Helpline</li>
              <li>Rule 6(1)(h): Country of Origin</li>
              <li>Section 31: 14-Digit FSSAI Lic No.</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/scan" className="hover:text-sky-600 transition-colors">
                  Scan Label Image
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-sky-600 transition-colors">
                  Scan Audit History
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-sky-600 transition-colors">
                  Admin Analytics
                </Link>
              </li>
              <li>
                <a
                  href="http://127.0.0.1:8000/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-sky-600 transition-colors"
                >
                  <span>Interactive API Docs</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Packaged Commodity Compliance Checker • Built for Smart India Hackathon</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Neon PostgreSQL Connected
            </span>
            <span>v1.0.0 Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
