"use client";

import { useState } from "react";
import {
  Plus,
  Play,
  Pause,
  BarChart2,
  X,
  Search,
  TrendingUp,
  TrendingDown,
  Copy,
  Edit2,
  Trash2,
  MoreVertical,
  Target,
  Clock,
} from "lucide-react";
import Link from "next/link";

// Enhanced dummy data with more realistic metrics
const DUMMY_JOURNEYS = [
  {
    id: "j_1",
    name: "Abandoned Cart - High Intent",
    status: "ACTIVE",
    trigger: "cart_abandoned",
    channel: "WhatsApp",
    sent: 1205,
    delivered: 1198,
    opened: 892,
    clicked: 456,
    recovered: 340,
    revenue: 45000,
    trend: [12, 15, 18, 14, 20, 18, 22, 19, 25, 28],
    lastRun: "2h ago",
  },
  {
    id: "j_2",
    name: "Welcome Series - New Signups",
    status: "ACTIVE",
    trigger: "account_created",
    channel: "Email",
    sent: 8900,
    delivered: 8850,
    opened: 4200,
    clicked: 1680,
    recovered: 120,
    revenue: 0,
    trend: [45, 50, 48, 52, 55, 58, 60, 62, 65, 68],
    lastRun: "15m ago",
  },
  {
    id: "j_3",
    name: "Win-back 30 Days",
    status: "PAUSED",
    trigger: "inactive_30d",
    channel: "SMS",
    sent: 450,
    delivered: 448,
    opened: 312,
    clicked: 89,
    recovered: 12,
    revenue: 1200,
    trend: [8, 7, 6, 5, 4, 3, 2, 2, 1, 1],
    lastRun: "3d ago",
  },
  {
    id: "j_4",
    name: "Browse Abandonment - Category",
    status: "ACTIVE",
    trigger: "browse_abandoned",
    channel: "Email",
    sent: 3240,
    delivered: 3220,
    opened: 1850,
    clicked: 680,
    recovered: 145,
    revenue: 18500,
    trend: [15, 18, 16, 20, 22, 25, 23, 28, 30, 32],
    lastRun: "1h ago",
  },
];

// Mini sparkline component
function Sparkline({ data, color = "blue" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-20 h-8" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color === "blue" ? "#3b82f6" : "#22c55e"}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// Dropdown menu component
function DropdownMenu({ journey, onAction }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-slate-100 border border-transparent hover:border-slate-300 transition-colors"
      >
        <MoreVertical className="h-4 w-4 text-slate-600" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-300 shadow-lg z-20">
            <button
              onClick={() => {
                onAction("edit", journey);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 flex items-center gap-2 text-slate-700 border-b border-slate-200"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit Journey
            </button>
            <button
              onClick={() => {
                onAction("duplicate", journey);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 flex items-center gap-2 text-slate-700 border-b border-slate-200"
            >
              <Copy className="h-3.5 w-3.5" />
              Duplicate
            </button>
            <button
              onClick={() => {
                onAction(
                  journey.status === "ACTIVE" ? "pause" : "resume",
                  journey,
                );
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 flex items-center gap-2 text-slate-700 border-b border-slate-200"
            >
              {journey.status === "ACTIVE" ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  Pause Journey
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  Resume Journey
                </>
              )}
            </button>
            <button
              onClick={() => {
                onAction("delete", journey);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedJourney, setSelectedJourney] = useState(null);

  const filteredJourneys = DUMMY_JOURNEYS.filter((j) => {
    const matchesFilter = filter === "ALL" || j.status === filter;
    const matchesSearch = j.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = (action, journey) => {
    console.log(`${action} action on journey:`, journey.id);
    // Handle actions (edit, duplicate, pause, resume, delete)
  };

  // Calculate aggregate metrics
  const totalSent = filteredJourneys.reduce((sum, j) => sum + j.sent, 0);
  const totalRecovered = filteredJourneys.reduce(
    (sum, j) => sum + j.recovered,
    0,
  );
  const totalRevenue = filteredJourneys.reduce((sum, j) => sum + j.revenue, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* ENHANCED INSIGHTS MODAL */}
      {selectedJourney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-300 shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-slate-100 border-b border-slate-300 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {selectedJourney.name}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {selectedJourney.id}
                  </span>
                  <span className="text-[10px] text-slate-500">•</span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last run: {selectedJourney.lastRun}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedJourney(null)}
                className="text-slate-500 hover:text-slate-900 bg-white border border-slate-300 p-1.5 hover:bg-slate-50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto">
              {/* Primary Metrics Grid */}
              <div className="p-5 bg-slate-50 grid grid-cols-4 gap-4">
                <div className="bg-white p-4 border border-slate-300">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">
                    Total Sent
                  </p>
                  <p className="text-2xl font-mono text-slate-900">
                    {selectedJourney.sent.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-4 border border-slate-300">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">
                    Delivered
                  </p>
                  <p className="text-2xl font-mono text-blue-600">
                    {selectedJourney.delivered.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {(
                      (selectedJourney.delivered / selectedJourney.sent) *
                      100
                    ).toFixed(1)}
                    % rate
                  </p>
                </div>
                <div className="bg-white p-4 border border-slate-300">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">
                    Opened
                  </p>
                  <p className="text-2xl font-mono text-purple-600">
                    {selectedJourney.opened.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {(
                      (selectedJourney.opened / selectedJourney.delivered) *
                      100
                    ).toFixed(1)}
                    % rate
                  </p>
                </div>
                <div className="bg-white p-4 border border-slate-300">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">
                    Clicked
                  </p>
                  <p className="text-2xl font-mono text-orange-600">
                    {selectedJourney.clicked.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {(
                      (selectedJourney.clicked / selectedJourney.opened) *
                      100
                    ).toFixed(1)}
                    % CTR
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="p-5 border-t border-slate-300 grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 border border-green-200">
                  <p className="text-[10px] text-green-700 uppercase font-bold tracking-wider mb-2">
                    Recovered Users
                  </p>
                  <p className="text-3xl font-mono text-green-700">
                    {selectedJourney.recovered.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-green-600 mt-2">
                    {(
                      (selectedJourney.recovered / selectedJourney.sent) *
                      100
                    ).toFixed(2)}
                    % conversion rate
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 border border-blue-200">
                  <p className="text-[10px] text-blue-700 uppercase font-bold tracking-wider mb-2">
                    Revenue Generated
                  </p>
                  <p className="text-3xl font-mono text-blue-700">
                    ₹{selectedJourney.revenue.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-blue-600 mt-2">
                    ₹
                    {selectedJourney.recovered > 0
                      ? (
                          selectedJourney.revenue / selectedJourney.recovered
                        ).toFixed(0)
                      : 0}{" "}
                    per conversion
                  </p>
                </div>
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 border border-violet-200">
                  <p className="text-[10px] text-violet-700 uppercase font-bold tracking-wider mb-2">
                    ROI Estimate
                  </p>
                  <p className="text-3xl font-mono text-violet-700">
                    {selectedJourney.revenue > 0
                      ? (
                          (selectedJourney.revenue /
                            (selectedJourney.sent * 2)) *
                          100
                        ).toFixed(0)
                      : 0}
                    %
                  </p>
                  <p className="text-[10px] text-violet-600 mt-2">
                    Based on ₹2/message cost
                  </p>
                </div>
              </div>

              {/* Journey Details */}
              <div className="p-5 border-t border-slate-300 bg-slate-50">
                <h3 className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-3">
                  Journey Configuration
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 border border-slate-300">
                    <p className="text-[10px] text-slate-500 mb-1">
                      Trigger Event
                    </p>
                    <p className="text-sm font-mono text-slate-900">
                      {selectedJourney.trigger}
                    </p>
                  </div>
                  <div className="bg-white p-3 border border-slate-300">
                    <p className="text-[10px] text-slate-500 mb-1">Channel</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {selectedJourney.channel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOP METRICS OVERVIEW */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-300 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Total Sent
            </p>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-semibold font-mono text-slate-900">
            {totalSent.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            Across {filteredJourneys.length} active journeys
          </p>
        </div>

        <div className="bg-white border border-slate-300 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Conversions
            </p>
            <Target className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-semibold font-mono text-green-600">
            {totalRecovered.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            {((totalRecovered / totalSent) * 100).toFixed(2)}% conversion rate
          </p>
        </div>

        <div className="bg-white border border-slate-300 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Total Revenue
            </p>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-semibold font-mono text-blue-600">
            ₹{totalRevenue.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            ₹{(totalRevenue / totalSent).toFixed(2)} per message
          </p>
        </div>
      </div>

      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Journeys
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Event-based retargeting across channels
          </p>
        </div>

        <Link
          href="/dashboard/create"
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-3 py-1 text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-md"
        >
          <Plus className="h-4 w-4" /> Create Journey
        </Link>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border border-slate-300 p-3 flex justify-between items-center">
        <div className="flex gap-0">
          {["ALL", "ACTIVE", "PAUSED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[11px] font-bold tracking-wider uppercase border transition-all ${
                filter === f
                  ? "bg-slate-900 text-white border-slate-900 z-10"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50 hover:border-slate-400 -ml-px first:ml-0"
              }`}
            >
              {f}
              {f !== "ALL" && (
                <span className="ml-2 text-[10px] opacity-70">
                  ({DUMMY_JOURNEYS.filter((j) => j.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search journeys..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-64"
          />
        </div>
      </div>

      {/* ENHANCED DATA TABLE */}
      <div className="bg-white border border-slate-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 border-b border-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider">
                  Journey
                </th>
                <th className="px-4 py-3 border-b border-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider w-28">
                  Status
                </th>
                <th className="px-4 py-3 border-b border-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider">
                  Channel
                </th>
                <th className="px-4 py-3 border-b border-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider text-right">
                  Sent
                </th>
                <th className="px-4 py-3 border-b border-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider text-right">
                  Conversions
                </th>
                <th className="px-4 py-3 border-b border-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider text-right">
                  Revenue
                </th>
                <th className="px-4 py-3 border-b border-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider">
                  Trend
                </th>
                <th className="px-4 py-3 border-b border-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredJourneys.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 text-slate-300" />
                      <p className="text-sm text-slate-500">
                        No journeys found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredJourneys.map((journey) => {
                  const conversionRate =
                    (journey.recovered / journey.sent) * 100;
                  const isPerforming = conversionRate > 5;

                  return (
                    <tr
                      key={journey.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-4 py-3.5">
                        <div>
                          <a
                            href=""
                            className="font-medium hover:text-indigo-800 hover:underline cursor-pointer text-slate-900"
                          >
                            {journey.name}
                          </a>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {journey.trigger}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 ${
                              journey.status === "ACTIVE"
                                ? "bg-green-500"
                                : "bg-slate-400"
                            }`}
                          />
                          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-700">
                            {journey.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">
                          {journey.lastRun}
                        </p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-block px-2 py-0.5 bg-slate-100 border border-slate-300 text-[10px] font-semibold text-slate-700">
                          {journey.channel}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <p className="font-mono text-slate-900">
                          {journey.sent.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {journey.delivered.toLocaleString()} delivered
                        </p>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <p className="font-mono text-green-600 font-semibold">
                          {journey.recovered.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {conversionRate.toFixed(2)}% rate
                        </p>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <p className="font-mono text-blue-600 font-semibold">
                          ₹{journey.revenue.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-4 py-3.5">
                        <Sparkline
                          data={journey.trend}
                          color={isPerforming ? "green" : "blue"}
                        />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedJourney(journey)}
                            className="inline-flex items-center gap-1.5 bg-white border border-slate-300 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all"
                          >
                            <BarChart2 className="h-3.5 w-3.5" /> Insights
                          </button>
                          <DropdownMenu
                            journey={journey}
                            onAction={handleAction}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="text-[10px] text-slate-500 text-center pb-4">
        Showing {filteredJourneys.length} of {DUMMY_JOURNEYS.length} journeys •
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
