import Link from "next/link";
import { Business } from "@/types";

const difficultyConfig: Record<string, { color: string; dot: string }> = {
  "Easy":          { color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  "Moderate":      { color: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-400" },
  "Moderate–Hard": { color: "bg-orange-50 text-orange-700 border-orange-200",    dot: "bg-orange-500" },
  "Hard":          { color: "bg-red-50 text-red-700 border-red-200",             dot: "bg-red-500" },
};

const scaleIcon: Record<string, string> = {
  "Micro / Low":  "🌱",
  "Medium":       "🔥",
  "Medium–High":  "⚡",
  "High":         "🚀",
};

export default function BusinessCard({ business }: { business: Business }) {
  const diff = difficultyConfig[business.difficulty_level || ""] ?? { color: "bg-gray-50 text-gray-600 border-gray-200", dot: "bg-gray-400" };

  return (
    <Link href={`/businesses/${business.id}`} className="group block h-full">
      <div className="relative bg-white rounded-2xl border border-gray-100 p-5 h-full flex flex-col gap-3
        shadow-sm hover:shadow-lg hover:border-orange-200 hover:-translate-y-1 transition-all duration-200">

        {/* Top row: title + difficulty */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-orange-600 transition-colors flex-1">
            {business.business_idea}
          </h3>
          <span className={`shrink-0 inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-semibold border ${diff.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
            {business.difficulty_level}
          </span>
        </div>

        {/* Category */}
        <p className="text-[11px] font-bold text-orange-500 uppercase tracking-wider leading-none">
          {business.category}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 bg-gray-50 border border-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full font-medium">
            {scaleIcon[business.investment_scale || ""] ?? "💰"} {business.investment_scale}
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-50 border border-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full font-medium">
            📍 {business.market_potential}
          </span>
        </div>

        {/* Profitability */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <span className="text-[11px] text-gray-400 font-medium">{business.profitability_potential}</span>
          <span className="text-orange-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}