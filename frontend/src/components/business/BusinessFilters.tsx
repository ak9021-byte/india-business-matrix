"use client";
import { FilterState } from "@/types";
import { SlidersHorizontal, X } from "lucide-react";

const DIFFICULTIES = ["Easy", "Moderate", "Moderate–Hard", "Hard"];
const SCALES = ["Micro / Low", "Medium", "Medium–High", "High"];
const MARKETS = ["Hyperlocal / Village", "Local / City", "National / Global", "National / Export", "National / Online"];

const diffChip: Record<string, string> = {
  "Easy": "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  "Moderate": "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  "Moderate–Hard": "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  "Hard": "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
};

interface Props {
  filters: FilterState;
  onChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
}

export default function BusinessFilters({ filters, onChange, onReset }: Props) {
  const activeCount = [filters.category, filters.difficulty_level, filters.investment_scale, filters.market_potential].filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-gray-400" />
          <span className="font-bold text-gray-800 text-sm">Filters</span>
          {activeCount > 0 && (
            <span className="bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={onReset}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium">
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Difficulty chips */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <button key={d}
              onClick={() => onChange("difficulty_level", filters.difficulty_level === d ? "" : d)}
              className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all ${
                filters.difficulty_level === d
                  ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                  : diffChip[d]
              }`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Investment Scale chips */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Investment Scale</p>
        <div className="flex flex-wrap gap-2">
          {SCALES.map((s) => (
            <button key={s}
              onClick={() => onChange("investment_scale", filters.investment_scale === s ? "" : s)}
              className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all ${
                filters.investment_scale === s
                  ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Market + Category row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Market Potential</p>
          <select
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700 font-medium"
            value={filters.market_potential}
            onChange={(e) => onChange("market_potential", e.target.value)}>
            <option value="">All Markets</option>
            {MARKETS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Category</p>
          <input
            type="text"
            placeholder="e.g. Agri, IT, Health..."
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 font-medium placeholder:text-gray-300"
            value={filters.category}
            onChange={(e) => onChange("category", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}