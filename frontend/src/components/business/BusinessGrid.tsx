import { Business } from "@/types";
import BusinessCard from "./BusinessCard";

interface Props {
  businesses: Business[];
  loading: boolean;
}

export default function BusinessGrid({ businesses, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-44 animate-pulse">
            <div className="flex justify-between mb-3">
              <div className="h-4 bg-gray-100 rounded-full w-3/4" />
              <div className="h-5 bg-gray-100 rounded-full w-14" />
            </div>
            <div className="h-3 bg-gray-100 rounded-full w-1/3 mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="h-5 bg-gray-100 rounded-full w-24" />
              <div className="h-5 bg-gray-100 rounded-full w-28" />
            </div>
            <div className="h-px bg-gray-100 mb-3" />
            <div className="h-3 bg-gray-100 rounded-full w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-gray-800 text-lg font-bold mb-1">No results found</p>
        <p className="text-gray-400 text-sm">Try adjusting your filters or search term</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {businesses.map((b) => (
        <BusinessCard key={b.id} business={b} />
      ))}
    </div>
  );
}