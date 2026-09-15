"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatsResponse, ComplianceReport } from "@/lib/types";
import { getStatsApi, getHistoryApi, deleteScanApi, seedSampleDataApi, getPdfDownloadUrl } from "@/lib/api";
import { formatDate, getScoreDetails, formatCurrency } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Database,
  Trash2,
  DownloadCloud,
  ExternalLink,
  Sparkles,
  Loader2,
  RefreshCw,
  Server,
  Activity,
  Award
} from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [scans, setScans] = useState<ComplianceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsData, scansData] = await Promise.all([
        getStatsApi(),
        getHistoryApi()
      ]);
      setStats(statsData);
      setScans(scansData);
    } catch (err) {
      console.error("Admin dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (!confirm(`Delete scan record #${id}?`)) return;
    try {
      setDeletingId(id);
      await deleteScanApi(id);
      setScans((prev) => prev.filter((s) => s.id !== id));
      const newStats = await getStatsApi();
      setStats(newStats);
    } catch (err) {
      alert("Failed to delete record.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSeed = async () => {
    try {
      setRefreshing(true);
      await seedSampleDataApi();
      await fetchData();
    } catch (err) {
      alert("Failed to seed sample datasets.");
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>Regulatory Admin & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Legal Metrology Compliance Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time monitoring of packaged commodity audit rates, violations, and database records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-sky-600" : "text-slate-500"}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleSeed}
            className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold border border-sky-200 shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Seed Samples</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading admin telemetry...</p>
        </div>
      ) : (
        <>
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Audits */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold uppercase tracking-wider">Total Scans Audited</span>
                <Activity className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{stats?.total_scans || 0}</div>
              <p className="text-[11px] text-slate-400">Processed through Legal Metrology engine</p>
            </div>

            {/* Compliant Rate */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold uppercase tracking-wider">Compliant Products</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-600">
                {stats?.compliant_count || 0}
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">
                {stats && stats.total_scans > 0
                  ? `${Math.round((stats.compliant_count / stats.total_scans) * 100)}% compliance rate`
                  : "0%"}
              </p>
            </div>

            {/* Violations / Non-compliant */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold uppercase tracking-wider">Flagged Violations</span>
                <ShieldAlert className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-3xl font-extrabold text-rose-600">
                {stats?.non_compliant_count || 0}
              </div>
              <p className="text-[11px] text-rose-700 font-medium">
                Attracts Section 36 statutory penalties
              </p>
            </div>

            {/* Average Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold uppercase tracking-wider">Average Compliance</span>
                <TrendingUp className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                {stats?.average_compliance_score || 0}%
              </div>
              <p className="text-[11px] text-slate-400">Mean across all scanned categories</p>
            </div>
          </div>

          {/* Analytics Breakdown: Missing Fields & System Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Missing Declarations (8 cols) */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Top Missing Mandatory Declarations</span>
              </h3>

              {stats?.top_missing_declarations && stats.top_missing_declarations.length > 0 ? (
                <div className="space-y-3 pt-2">
                  {stats.top_missing_declarations.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{item.field}</span>
                        <span className="text-slate-500">
                          {item.count} scans ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                          style={{ width: `${Math.min(100, item.percentage)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  No recurring missing field patterns detected yet.
                </div>
              )}
            </div>

            {/* System Info (4 cols) */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Server className="w-4 h-4 text-sky-600" />
                <span>Database & Service Health</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <span className="font-semibold text-emerald-900">Database Engine</span>
                  <span className="font-mono text-emerald-700 font-bold">Neon PostgreSQL</span>
                </div>

                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between">
                  <span className="font-semibold text-sky-900">Backend API</span>
                  <span className="font-mono text-sky-700 font-bold">FastAPI REST</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Statutory Standard</span>
                  <span className="font-mono text-slate-700 font-bold">LM (PC) Rules 2011</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">OCR Multi-Engine</span>
                  <span className="font-mono text-slate-700 font-bold">EasyOCR + Tesseract</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scans Database Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Full Database Records ({scans.length})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Penalty Risk</th>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scans.map((scan) => {
                    const scoreD = getScoreDetails(scan.compliance_score);
                    return (
                      <tr key={scan.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">#{scan.id}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900 max-w-[200px] truncate">
                          {scan.product_name}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold">
                            {scan.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[11px] border ${scoreD.bgColor} ${scoreD.textColor} ${scoreD.borderColor}`}
                          >
                            {scan.compliance_score}%
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-800">
                          {scan.status.replace("_", " ")}
                        </td>
                        <td className="px-4 py-3 font-semibold text-rose-600">
                          {formatCurrency(scan.penalty_estimate_inr)}
                        </td>
                        <td className="px-4 py-3 text-slate-400">{formatDate(scan.created_at)}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/report/${scan.id}`}
                              className="p-1 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                              title="View Report"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>

                            <a
                              href={getPdfDownloadUrl(scan.id!)}
                              download
                              className="p-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                              title="Download PDF"
                            >
                              <DownloadCloud className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => handleDelete(scan.id!)}
                              disabled={deletingId === scan.id}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Scan"
                            >
                              {deletingId === scan.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
