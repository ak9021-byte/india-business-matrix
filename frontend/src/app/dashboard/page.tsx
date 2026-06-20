"use client";
import { useEffect, useState } from "react";
import { fetchStats, fetchCategories } from "@/lib/api";
import { Stats, CategoryStat } from "@/types";
import Link from "next/link";
import { TrendingUp, Layers, Zap, AlertTriangle, Wallet, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [topCategories, setTopCategories] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchStats(), fetchCategories()]).then(([s, cats]) => {
      setStats(s);
      setTopCategories(cats.slice(0, 10));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf8]">
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="h-8 bg-gray-100 rounded-full w-40 animate-pulse mb-2" />
            <div className="h-4 bg-gray-100 rounded-full w-56 animate-pulse" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-28 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Ideas",
      value: stats?.total_businesses?.toLocaleString(),
      icon: <Layers size={20} className="text-orange-500" />,
      bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-600",
      sub: "Across all categories",
    },
    {
      label: "Categories",
      value: stats?.total_categories,
      icon: <TrendingUp size={20} className="text-blue-500" />,
      bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600",
      sub: "Business sectors",
    },
    {
      label: "Easy to Start",
      value: stats?.easy_count?.toLocaleString(),
      icon: <Zap size={20} className="text-emerald-500" />,
      bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600",
      sub: "Low barrier entry",
    },
    {
      label: "Hard / Advanced",
      value: stats?.hard_count?.toLocaleString(),
      icon: <AlertTriangle size={20} className="text-red-500" />,
      bg: "bg-red-50", border: "border-red-100", text: "text-red-600",
      sub: "Expert level ideas",
    },
    {
      label: "Micro Investment",
      value: stats?.micro_investment_count?.toLocaleString(),
      icon: <Wallet size={20} className="text-purple-500" />,
      bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-600",
      sub: "Low capital needed",
    },
  ];

  const maxIdeas = topCategories[0]?.total_ideas || 1;

  const barColors = [
    "bg-orange-500", "bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-pink-500",
    "bg-amber-500", "bg-cyan-500", "bg-rose-500", "bg-indigo-500", "bg-teal-500",
  ];

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-400 font-medium">Overview of all business data across India</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((s) => (
            <div key={s.label}
              className={`${s.bg} border ${s.border} rounded-2xl p-5 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  {s.icon}
                </div>
              </div>
              <p className={`text-2xl font-extrabold ${s.text} mb-0.5`}>{s.value}</p>
              <p className="text-xs font-bold text-gray-600 leading-tight">{s.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Chart + Quick Links row ── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-orange-500 rounded-full" />
                Top 10 Categories
              </h2>
              <Link href="/categories"
                className="text-xs text-orange-500 hover:text-orange-600 font-bold flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {topCategories.map((cat, i) => (
                <Link key={cat.category}
                  href={`/businesses?category=${encodeURIComponent(cat.category)}`}
                  className="group block">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-gray-700 font-semibold truncate pr-4 group-hover:text-orange-600 transition-colors">
                      {cat.category}
                    </span>
                    <span className="text-gray-400 font-bold whitespace-nowrap text-xs">{cat.total_ideas}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`${barColors[i]} h-2 rounded-full transition-all duration-700 group-hover:opacity-80`}
                      style={{ width: `${(cat.total_ideas / maxIdeas) * 100}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
              <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-2">Quick Start</p>
              <h3 className="font-extrabold text-xl mb-1">Find your idea</h3>
              <p className="text-orange-100 text-sm mb-5 leading-relaxed">Browse 3,320+ ideas filtered by your budget and skills.</p>
              <Link href="/businesses"
                className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors shadow-sm">
                Browse Ideas <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Difficulty Breakdown</p>
              <div className="space-y-3">
                {[
                  { label: "Easy", value: stats?.easy_count || 0, total: stats?.total_businesses || 1, color: "bg-emerald-500" },
                  { label: "Hard", value: stats?.hard_count || 0, total: stats?.total_businesses || 1, color: "bg-red-500" },
                  { label: "Micro Investment", value: stats?.micro_investment_count || 0, total: stats?.total_businesses || 1, color: "bg-purple-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="text-gray-400">{Math.round((item.value / item.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className={`${item.color} h-1.5 rounded-full`}
                        style={{ width: `${(item.value / item.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}