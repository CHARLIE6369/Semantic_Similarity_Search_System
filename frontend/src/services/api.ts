import type { SearchRequest, SearchResponse, Document, HealthStatus, CategoriesResponse, ModelsResponse, ModelOption } from '../types/search';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.detail) {
        errorMessage = typeof errorData.detail === 'string' 
          ? errorData.detail 
          : JSON.stringify(errorData.detail);
      }
    } catch {
      // Failed to parse JSON error
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

export const api = {
  async searchDocuments(request: SearchRequest): Promise<SearchResponse> {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    return handleResponse<SearchResponse>(response);
  },

  async getDocument(documentId: string): Promise<Document> {
    const response = await fetch(`${API_BASE_URL}/documents/${encodeURIComponent(documentId)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse<Document>(response);
  },

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await handleResponse<CategoriesResponse>(response);
    return data.categories || [];
  },

  async getModels(): Promise<ModelOption[]> {
    const response = await fetch(`${API_BASE_URL}/models`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await handleResponse<ModelsResponse>(response);
    return data.models || [];
  },

  async getHealth(): Promise<HealthStatus> {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse<HealthStatus>(response);
  }
};
