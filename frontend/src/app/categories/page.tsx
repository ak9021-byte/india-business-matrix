"use client";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api";
import { CategoryStat } from "@/types";
import Link from "next/link";
import { Search, X, Grid3X3, ArrowRight } from "lucide-react";

const categoryEmoji: Record<string, string> = {
  "Agriculture": "🌾", "Food": "🍽️", "Technology": "💻", "Health": "🏥",
  "Education": "📚", "Manufacturing": "🏭", "Retail": "🛍️", "Finance": "💰",
  "Transport": "🚗", "Construction": "🏗️", "Fashion": "👗", "Beauty": "💄",
  "Entertainment": "🎬", "Travel": "✈️", "Real Estate": "🏠", "Energy": "⚡",
  "Environment": "🌱", "Sports": "⚽", "Media": "📱", "Consulting": "🤝",
};

function getCategoryEmoji(name: string | null | undefined): string {
  if (!name) return "💡";
  for (const [key, emoji] of Object.entries(categoryEmoji)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return emoji;
  }
  return "💡";
}

function getBarColor(index: number): string {
  const colors = ["bg-orange-500", "bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-pink-500"];
  return colors[index % colors.length];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryStat[]>([]);
  const [filtered, setFiltered] = useState<CategoryStat[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!search) return setFiltered(categories);
    setFiltered(categories.filter((c) =>
      c.category.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, categories]);

  const totalIdeas = categories.reduce((sum, c) => sum + c.total_ideas, 0);

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-1">All Categories</h1>
              <p className="text-gray-400 font-medium">
                {categories.length} categories · {totalIdeas.toLocaleString()} total ideas
              </p>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5">
              <Grid3X3 size={15} className="text-orange-500" />
              <span className="text-orange-700 text-sm font-bold">{filtered.length} showing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* ── Search ── */}
        <div className="relative max-w-lg mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={17} />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm placeholder:text-gray-300 font-medium text-gray-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
              <X size={16} />
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-24 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                    <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold text-gray-800 mb-1">No categories found</p>
            <p className="text-gray-400 text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((cat, i) => (
              <Link key={cat.category}
                href={`/businesses?category=${encodeURIComponent(cat.category)}`}
                className="group block">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm
                  hover:shadow-lg hover:border-orange-200 hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-orange-100 transition-colors">
                      {getCategoryEmoji(cat.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-orange-600 transition-colors truncate">
                        {cat.category}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${getBarColor(i)} transition-all duration-500`}
                            style={{ width: `${(cat.total_ideas / (categories[0]?.total_ideas || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-orange-600 whitespace-nowrap">
                          {cat.total_ideas} ideas
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-gray-300 group-hover:text-orange-400 transition-colors font-semibold">
                    Browse ideas <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}