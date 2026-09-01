export interface SearchRequest {
  query: string;
  top_k?: number;
  category?: string | null;
  model_type?: string;
}

export interface SearchResult {
  document_id: string;
  title: string;
  category: string;
  similarity_score: number;
}

export interface SearchResponse {
  query: string;
  model_type: string;
  total_results: number;
  results: SearchResult[];
  processing_time_ms: number;
}

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  available: boolean;
}

export interface ModelsResponse {
  models: ModelOption[];
}

export interface Document {
  document_id: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
}

export interface HealthStatus {
  status: string;
  model_loaded: boolean;
  missing_artifacts?: string[] | null;
  available_models?: string[];
}

export interface CategoriesResponse {
  categories: string[];
}

export interface APIError {
  detail: string;
}
