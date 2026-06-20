import { Business } from "@/types";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Users, Wallet, BookOpen, Cpu, BarChart3, Layers } from "lucide-react";

const difficultyConfig: Record<string, { color: string; dot: string }> = {
  "Easy":          { color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  "Moderate":      { color: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-400" },
  "Moderate–Hard": { color: "bg-orange-50 text-orange-700 border-orange-200",    dot: "bg-orange-500" },
  "Hard":          { color: "bg-red-50 text-red-700 border-red-200",             dot: "bg-red-500" },
};

const scaleIcon: Record<string, string> = {
  "Micro / Low": "🌱", "Medium": "🔥", "Medium–High": "⚡", "High": "🚀",
};

export default function BusinessDetail({ business }: { business: Business }) {
  const diff = difficultyConfig[business.difficulty_level || ""] ?? { color: "bg-gray-50 text-gray-600 border-gray-200", dot: "bg-gray-400" };

  const highlights = [
    { icon: <Wallet size={18} className="text-orange-500" />, label: "Min Capital", value: business.min_capital_required, bg: "bg-orange-50 border-orange-100" },
    { icon: <Users size={18} className="text-blue-500" />, label: "Min People", value: business.min_people_required, bg: "bg-blue-50 border-blue-100" },
    { icon: <TrendingUp size={18} className="text-emerald-500" />, label: "Profitability", value: business.profitability_potential, bg: "bg-emerald-50 border-emerald-100" },
    { icon: <BarChart3 size={18} className="text-purple-500" />, label: "Scalability", value: business.scalability, bg: "bg-purple-50 border-purple-100" },
  ];

  const details = [
    { icon: <Layers size={15} className="text-gray-400" />, label: "Type", value: business.type },
    { icon: <Layers size={15} className="text-gray-400" />, label: "Sub-Type", value: business.business_sub_type },
    { icon: <BarChart3 size={15} className="text-gray-400" />, label: "Investment Scale", value: `${scaleIcon[business.investment_scale || ""] ?? "💰"} ${business.investment_scale}` },
    { icon: <TrendingUp size={15} className="text-gray-400" />, label: "Market Potential", value: business.market_potential },
    { icon: <Cpu size={15} className="text-gray-400" />, label: "Tech Knowledge", value: business.tech_knowledge_required },
    { icon: <BookOpen size={15} className="text-gray-400" />, label: "Qualification", value: business.degree_qualification },
    { icon: <Layers size={15} className="text-gray-400" />, label: "Business Model", value: business.business_model },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/businesses"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-600 transition-colors text-sm font-medium group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to all ideas
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-5">

        {/* ── Hero Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 px-8 py-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {business.category}
              </span>
              {business.difficulty_level && (
                <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold border ${diff.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                  {business.difficulty_level}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {business.business_idea}
            </h1>
          </div>

          {/* Highlight metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
            {highlights.map((h) => h.value && (
              <div key={h.label} className={`p-5 ${h.bg} border-b border-gray-100 last:border-b-0`}>
                <div className="flex items-center gap-2 mb-1">
                  {h.icon}
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{h.label}</span>
                </div>
                <p className="text-sm font-bold text-gray-800 leading-snug">{h.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Details Grid ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 rounded-full inline-block" />
            Business Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {details.map((d) => d.value && (
              <div key={d.label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="mt-0.5">{d.icon}</div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{d.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Govt Docs ── */}
        {business.govt_documents_required && (
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
            <h2 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full inline-block" />
              📋 Govt Documents Required
            </h2>
            <p className="text-sm text-gray-600 bg-blue-50 rounded-xl p-5 leading-relaxed border border-blue-100">
              {business.govt_documents_required}
            </p>
          </div>
        )}

        {/* ── Govt Schemes ── */}
        {business.govt_schemes_applicable && (
          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6">
            <h2 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block" />
              🏛️ Govt Schemes Applicable
            </h2>
            <p className="text-sm text-gray-600 bg-emerald-50 rounded-xl p-5 leading-relaxed border border-emerald-100">
              {business.govt_schemes_applicable}
            </p>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="bg-gray-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold">Explore more ideas like this</p>
            <p className="text-gray-400 text-sm mt-0.5">Browse 3,320+ business ideas across all categories</p>
          </div>
          <Link href="/businesses"
            className="shrink-0 bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg">
            Browse All Ideas →
          </Link>
        </div>

      </div>
    </div>
  );
}