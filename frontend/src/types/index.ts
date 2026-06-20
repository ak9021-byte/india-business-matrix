export interface Business {
  id: number;
  sr_no?: number;
  category?: string;
  business_idea?: string;
  type?: string;
  business_sub_type?: string;
  investment_scale?: string;
  min_capital_required?: string;
  min_people_required?: string;
  govt_documents_required?: string;
  govt_schemes_applicable?: string;
  business_model?: string;
  tech_knowledge_required?: string;
  degree_qualification?: string;
  difficulty_level?: string;
  market_potential?: string;
  profitability_potential?: string;
  scalability?: string;
}

export interface BusinessListResponse {
  total: number;
  page: number;
  limit: number;
  data: Business[];
}

export interface FilterState {
  search: string;
  category: string;
  difficulty_level: string;
  investment_scale: string;
  market_potential: string;
}

export interface CategoryStat {
  category: string;
  total_ideas: number;
}

export interface Stats {
  total_businesses: number;
  total_categories: number;
  easy_count: number;
  hard_count: number;
  micro_investment_count: number;
}