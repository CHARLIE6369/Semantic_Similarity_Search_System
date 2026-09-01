import { useState, useCallback, useEffect } from 'react';
import type { SearchResult, SearchResponse, ModelOption } from '../types/search';
import { api } from '../services/api';

export function useSearch() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [processingTimeMs, setProcessingTimeMs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [topK, setTopK] = useState<number>(5);
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  
  const [modelType, setModelType] = useState<string>('word2vec');
  const [models, setModels] = useState<ModelOption[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  // Fetch available categories and models on initialization
  useEffect(() => {
    let isMounted = true;
    
    api.getCategories()
      .then((cats) => {
        if (isMounted) setCategories(cats);
      })
      .catch(() => {});

    api.getModels()
      .then((mList) => {
        if (isMounted) setModels(mList);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const executeSearch = useCallback(async (
    searchQuery?: string,
    overrideTopK?: number,
    overrideCategory?: string | null,
    overrideModelType?: string
  ) => {
    const activeQuery = (searchQuery !== undefined ? searchQuery : query).trim();
    const activeTopK = overrideTopK !== undefined ? overrideTopK : topK;
    const activeCategory = overrideCategory !== undefined ? overrideCategory : category;
    const activeModelType = overrideModelType !== undefined ? overrideModelType : modelType;

    if (!activeQuery || activeQuery.length < 2) {
      setError('Search query must be at least 2 characters.');
      return;
    }

    setLoading(true);
    setError(null);
    setIsSearched(true);
    setQuery(activeQuery);

    try {
      const response: SearchResponse = await api.searchDocuments({
        query: activeQuery,
        top_k: activeTopK,
        category: activeCategory || null,
        model_type: activeModelType
      });

      setResults(response.results);
      setTotalResults(response.total_results);
      setProcessingTimeMs(response.processing_time_ms);
      if (response.model_type) {
        setModelType(response.model_type);
      }
    } catch (err: any) {
      setError(err.message || 'Unable to complete search. Please try again.');
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [query, topK, category, modelType]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setTotalResults(0);
    setError(null);
    setIsSearched(false);
  }, []);

  return {
    query,
    setQuery,
    results,
    totalResults,
    processingTimeMs,
    loading,
    error,
    topK,
    setTopK,
    category,
    setCategory,
    categories,
    modelType,
    setModelType,
    models,
    isSearched,
    executeSearch,
    clearSearch
  };
}
