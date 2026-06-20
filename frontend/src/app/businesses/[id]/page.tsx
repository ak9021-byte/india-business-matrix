"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBusiness } from "@/lib/api";
import { Business } from "@/types";
import BusinessDetail from "@/components/business/BusinessDetail";

export default function BusinessDetailPage() {
  const params = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchBusiness(Number(params.id)).then((data) => {
        setBusiness(data);
        setLoading(false);
      });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600" />
      </div>
    );
  }

  if (!business) {
    return <div className="text-center py-20 text-gray-500">Business not found.</div>;
  }

  return <BusinessDetail business={business} />;
}