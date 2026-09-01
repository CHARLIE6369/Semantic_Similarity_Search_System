import React from 'react';
import { Filter, Layers, Database, Cpu, Zap, SlidersHorizontal, Sparkles } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { SearchResultCard } from '../components/SearchResultCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import type { ModelOption } from '../types/search';

interface HomeProps {
  query: string;
  results: any[];
  totalResults: number;
  processingTimeMs: number;
  loading: boolean;
  error: string | null;
  topK: number;
  setTopK: (val: number) => void;
  category: string | null;
  setCategory: (cat: string | null) => void;
  categories: string[];
  modelType: string;
  setModelType: (m: string) => void;
  models: ModelOption[];
  isSearched: boolean;
  onSearch: (query?: string, top_k?: number, cat?: string | null, model_type?: string) => void;
  onClearSearch: () => void;
  onSelectDocument: (docId: string, score: number) => void;
}

export const Home: React.FC<HomeProps> = ({
  query,
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
  onSearch,
  onClearSearch,
  onSelectDocument
}) => {

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value === 'ALL' ? null : e.target.value;
    setCategory(val);
    if (query) {
      onSearch(query, topK, val, modelType);
    }
  };

  const handleTopKChange = (newTopK: number) => {
    setTopK(newTopK);
    if (query) {
      onSearch(query, newTopK, category, modelType);
    }
  };

  const activeModelObj = models.find((m) => m.id === modelType);

  return (
    <div className="space-y-10 pb-20 relative">
      
      {/* Ambient Background Light Flares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-cyan-500/20 blur-[100px] animate-float-1" />
        <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-teal-500/20 blur-[120px] animate-float-2" />
        <div className="absolute top-40 left-1/3 w-64 h-64 rounded-full bg-indigo-500/15 blur-[90px] animate-pulse-glow" />
      </div>

      {/* Hero Section */}
      <section className="text-center pt-8 sm:pt-14 pb-2 space-y-6">
        
        {/* Shimmering Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-bold text-cyan-300 shadow-md shadow-cyan-950/40 backdrop-blur-md">
          <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400 animate-bounce" />
          <span>Multi-Vector Engine Search System</span>
        </div>

        {/* Hero Title */}
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-mono">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              Semantic_Similarity_Search_System
            </span>
          </h1>
        </div>

        {/* Search Bar with Model Selector */}
        <div className="px-4 pt-2">
          <SearchBar
            initialQuery={query}
            onSearch={(q, tk, cat, mt) => onSearch(q, tk || topK, cat !== undefined ? cat : category, mt || modelType)}
            loading={loading}
            onClear={onClearSearch}
            selectedModel={modelType}
            onSelectModel={(mId) => setModelType(mId)}
            models={models}
          />
        </div>
      </section>

      {/* Feature & Stat Cards */}
      {!isSearched && (
        <section className="max-w-4xl mx-auto px-4 pt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="glass-card rounded-2xl p-5 text-center border-t-2 border-t-cyan-400 relative overflow-hidden group bg-slate-900/90 border border-cyan-500/20">
              <Database className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-extrabold text-white">50,000+</div>
              <div className="text-xs text-white font-bold mt-1">Documents Indexed</div>
            </div>

            <div className="glass-card rounded-2xl p-5 text-center border-t-2 border-t-teal-400 relative overflow-hidden group bg-slate-900/90 border border-teal-500/20">
              <Cpu className="w-6 h-6 text-teal-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-extrabold text-white">3 Engines</div>
              <div className="text-xs text-white font-bold mt-1">Word2Vec / FastText / TF-IDF</div>
            </div>

            <div className="glass-card rounded-2xl p-5 text-center border-t-2 border-t-indigo-400 relative overflow-hidden group bg-slate-900/90 border border-indigo-500/20">
              <Layers className="w-6 h-6 text-indigo-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-extrabold text-white">100 Dimensions</div>
              <div className="text-xs text-white font-bold mt-1">Continuous Embeddings</div>
            </div>

            <div className="glass-card rounded-2xl p-5 text-center border-t-2 border-t-amber-400 relative overflow-hidden group bg-slate-900/90 border border-amber-500/20">
              <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-extrabold text-white">Cosine</div>
              <div className="text-xs text-white font-bold mt-1">Matrix Similarity</div>
            </div>

          </div>
        </section>
      )}

      {/* Main Results & Filters Section */}
      {isSearched && (
        <section className="max-w-5xl mx-auto px-4 space-y-6">
          
          {/* Controls Bar: Results Count + Category & Top-K Filters */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl bg-slate-900/80">
            
            {/* Query & Latency summary */}
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Results for</span>
                  <span className="text-cyan-400 italic font-mono bg-slate-950 px-2.5 py-0.5 rounded-lg border border-cyan-500/30">
                    "{query}"
                  </span>
                </h2>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 text-slate-950 shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-950 font-bold" />
                  {activeModelObj ? activeModelObj.name : modelType.toUpperCase()}
                </span>
              </div>

              {!loading && !error && (
                <p className="text-xs text-slate-300 mt-1.5 font-semibold">
                  Found <span className="font-extrabold text-white">{totalResults}</span> documents in{' '}
                  <span className="font-mono text-cyan-400 font-extrabold">{processingTimeMs.toFixed(1)} ms</span>
                </p>
              )}
            </div>

            {/* Backend Filters */}
            <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap justify-between sm:justify-end">
              
              {/* Category Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <select
                  value={category || 'ALL'}
                  onChange={handleCategoryChange}
                  className="bg-slate-950 text-white text-xs font-bold rounded-xl px-3 py-2 border border-slate-700 focus:outline-none shadow-xs cursor-pointer"
                >
                  <option value="ALL">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Top K Selector */}
              <div className="flex items-center gap-1 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400 mr-1" />
                <span className="text-white font-bold">Top:</span>
                {[5, 10, 20].map((k) => (
                  <button
                    key={k}
                    onClick={() => handleTopKChange(k)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      topK === k
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Results List / Loading / Empty / Error */}
          {loading ? (
            <LoadingState count={topK} />
          ) : error ? (
            <ErrorState message={error} onRetry={() => onSearch(query, topK, category, modelType)} />
          ) : results.length === 0 ? (
            <EmptyState onSelectQuery={(q) => onSearch(q, topK, category, modelType)} />
          ) : (
            <div className="space-y-4">
              {results.map((res, index) => (
                <SearchResultCard
                  key={res.document_id || index}
                  result={res}
                  index={index}
                  onSelectDocument={onSelectDocument}
                />
              ))}
            </div>
          )}

        </section>
      )}

    </div>
  );
};
