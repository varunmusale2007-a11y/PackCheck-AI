"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ComplianceReport } from "@/lib/types";
import { getHistoryApi, deleteScanApi, seedSampleDataApi, getPdfDownloadUrl } from "@/lib/api";
import { formatDate, getScoreDetails, formatCurrency } from "@/lib/utils";
import {
  History as HistoryIcon,
  Search,
  Filter,
  Trash2,
  DownloadCloud,
  FileText,
  ScanLine,
  Loader2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2
} from "lucide-react";

export default function HistoryPage() {
  const [scans, setScans] = useState<ComplianceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isSeeding, setIsSeeding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const categories = ["All", "Food & FMCG", "Beverages", "Cosmetics", "Electronics", "Pharmaceuticals"];
  const statuses = ["All", "COMPLIANT", "PARTIALLY_COMPLIANT", "NON_COMPLIANT"];

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getHistoryApi(search, categoryFilter, statusFilter);
      setScans(data);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHistory();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, categoryFilter, statusFilter]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this scan record?")) return;
    try {
      setDeletingId(id);
      await deleteScanApi(id);
      setScans((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete record.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSeedSamples = async () => {
    try {
      setIsSeeding(true);
      await seedSampleDataApi();
      await fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Failed to seed sample datasets.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
            <HistoryIcon className="w-4 h-4" />
            <span>Audit History & Log</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Packaging Compliance Scans
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Search, filter, and inspect past Legal Metrology packaging audits.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSeedSamples}
            disabled={isSeeding}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            {isSeeding ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            )}
            <span>Seed Sample Labels</span>
          </button>

          <Link
            href="/scan"
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all"
          >
            <ScanLine className="w-4 h-4" />
            <span>New Scan</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product name or keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                Status: {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid / List */}
      {loading ? (
        <div className="min-h-[30vh] flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-6 h-6 text-sky-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading scan records...</p>
        </div>
      ) : scans.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <HistoryIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-800">No Scan Records Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No past compliance audits matched your filter criteria. Try seeding sample labels or scanning a new packaged product.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleSeedSamples}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
            >
              Seed Sample Labels
            </button>
            <Link
              href="/scan"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-all"
            >
              Scan Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scans.map((item) => {
            const scoreDetails = getScoreDetails(item.compliance_score);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 group"
              >
                <div>
                  {/* Top row: Category & Score */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1">
                      <span
                        className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${scoreDetails.bgColor} ${scoreDetails.textColor} ${scoreDetails.borderColor}`}
                      >
                        {item.compliance_score}%
                      </span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <Link href={`/report/${item.id}`} className="group-hover:text-sky-600 transition-colors">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">
                      {item.product_name}
                    </h3>
                  </Link>

                  <p className="text-[11px] text-slate-400 mb-3">
                    {formatDate(item.created_at)}
                  </p>

                  {/* Compliance Status & Penalties */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Status:</span>
                      <span className="font-semibold text-slate-800">{item.status.replace("_", " ")}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Penalty Risk:</span>
                      <span
                        className={`font-semibold ${
                          item.penalty_estimate_inr > 0 ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {formatCurrency(item.penalty_estimate_inr)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/report/${item.id}`}
                      className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Report</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <a
                      href={getPdfDownloadUrl(item.id!)}
                      download
                      title="Download PDF"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id!)}
                    disabled={deletingId === item.id}
                    title="Delete Scan"
                    className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
