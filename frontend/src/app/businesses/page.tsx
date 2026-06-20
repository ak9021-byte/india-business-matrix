"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchBusinesses } from "@/lib/api";
import { Business, FilterState } from "@/types";
import BusinessGrid from "@/components/business/BusinessGrid";
import BusinessFilters from "@/components/business/BusinessFilters";
import { Search, SlidersHorizontal, X } from "lucide-react";

const defaultFilters: FilterState = {
  search: "", category: "", difficulty_level: "", investment_scale: "", market_potential: ""
};

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchBusinesses(filters, page);
      setBusinesses(res.data);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => { loadData(); }, [loadData]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  const totalPages = Math.ceil(total / 20);
  const activeFilterCount = [filters.category, filters.difficulty_level, filters.investment_scale, filters.market_potential].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Browse Business Ideas</h1>
          <p className="text-gray-400 font-medium">
            {loading ? "Loading..." : `${total.toLocaleString()} ideas across all categories`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* ── Search + Filter toggle ── */}
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={17} />
            <input
              type="text"
              placeholder="Search business ideas..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent shadow-sm placeholder:text-gray-300 font-medium text-gray-800"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
            />
            {filters.search && (
              <button onClick={() => updateFilter("search", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all shadow-sm ${
              showFilters || activeFilterCount > 0
                ? "bg-orange-500 text-white border-orange-500 shadow-orange-100"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}>
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-white text-orange-500 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Filters ── */}
        {showFilters && (
          <BusinessFilters filters={filters} onChange={updateFilter} onReset={resetFilters} />
        )}

        {/* ── Active filter pills ── */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.difficulty_level && (
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 text-xs px-3 py-1.5 rounded-full font-semibold">
                {filters.difficulty_level}
                <button onClick={() => updateFilter("difficulty_level", "")}><X size={11} /></button>
              </span>
            )}
            {filters.investment_scale && (
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 text-xs px-3 py-1.5 rounded-full font-semibold">
                {filters.investment_scale}
                <button onClick={() => updateFilter("investment_scale", "")}><X size={11} /></button>
              </span>
            )}
            {filters.market_potential && (
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 text-xs px-3 py-1.5 rounded-full font-semibold">
                {filters.market_potential}
                <button onClick={() => updateFilter("market_potential", "")}><X size={11} /></button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 text-xs px-3 py-1.5 rounded-full font-semibold">
                {filters.category}
                <button onClick={() => updateFilter("category", "")}><X size={11} /></button>
              </span>
            )}
            <button onClick={resetFilters} className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors px-2">
              Clear all
            </button>
          </div>
        )}

        {/* ── Grid ── */}
        <BusinessGrid businesses={businesses} loading={loading} />

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 disabled:opacity-30 hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm">
              ← Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = page <= 3 ? i + 1 : page - 2 + i;
                if (p < 1 || p > totalPages) return null;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                      p === page
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600"
                    }`}>
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 disabled:opacity-30 hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm">
              Next →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}