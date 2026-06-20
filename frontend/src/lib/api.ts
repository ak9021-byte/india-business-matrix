import axios from "axios";
import { Business, BusinessListResponse, CategoryStat, FilterState, Stats } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const api = axios.create({ baseURL: BASE_URL });

export async function fetchBusinesses(
  filters: Partial<FilterState>,
  page = 1,
  limit = 20
): Promise<BusinessListResponse> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.difficulty_level) params.set("difficulty_level", filters.difficulty_level);
  if (filters.investment_scale) params.set("investment_scale", filters.investment_scale);
  if (filters.market_potential) params.set("market_potential", filters.market_potential);

  const res = await api.get(`/api/businesses?${params.toString()}`);
  return res.data;
}

export async function fetchBusiness(id: number): Promise<Business> {
  const res = await api.get(`/api/businesses/${id}`);
  return res.data;
}

export async function fetchCategories(): Promise<CategoryStat[]> {
  const res = await api.get("/api/categories");
  return res.data;
}

export async function fetchStats(): Promise<Stats> {
  const res = await api.get("/api/categories/stats");
  return res.data;
}