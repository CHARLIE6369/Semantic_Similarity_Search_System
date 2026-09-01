import React, { useState } from 'react';
import { Search, X, Sparkles, CornerDownLeft, Cpu, Zap, Activity } from 'lucide-react';
import type { ModelOption } from '../types/search';

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string, top_k?: number, category?: string | null, model_type?: string) => void;
  loading?: boolean;
  onClear?: () => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  models?: ModelOption[];
}

const EXAMPLE_QUERIES = [
  "I forgot my password",
  "How can I change my login email?",
  "My verification code is not working",
  "How do I fix an order problem?"
];

const MODEL_ICONS: Record<string, React.ReactNode> = {
  word2vec: <Cpu className="w-3.5 h-3.5" />,
  fasttext: <Zap className="w-3.5 h-3.5" />,
  tfidf: <Activity className="w-3.5 h-3.5" />
};

const DEFAULT_MODELS: ModelOption[] = [
  { id: 'word2vec', name: 'Word2Vec', description: 'Skip-gram 100D mean vector pooling', available: true },
  { id: 'fasttext', name: 'FastText', description: 'Subword 100D n-grams for unseen words', available: true },
  { id: 'tfidf', name: 'TF-IDF', description: 'Sparse term frequency baseline matrix', available: true }
];

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  onSearch,
  loading = false,
  onClear,
  selectedModel,
  onSelectModel,
  models = []
}) => {
  const [inputValue, setInputValue] = useState<string>(initialQuery);

  const activeModels = models.length > 0 ? models : DEFAULT_MODELS;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim().length >= 2) {
      onSearch(inputValue, undefined, undefined, selectedModel);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSelectExample = (example: string) => {
    setInputValue(example);
    onSearch(example, undefined, undefined, selectedModel);
  };

  const handleModelChange = (modelId: string) => {
    onSelectModel(modelId);
    if (inputValue.trim().length >= 2) {
      onSearch(inputValue, undefined, undefined, modelId);
    }
  };

  const handleClearInput = () => {
    setInputValue('');
    if (onClear) onClear();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">
      
      {/* Model Selection Pills Bar */}
      <div className="flex items-center justify-center gap-2.5 flex-wrap">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Model Engine:
        </span>
        {activeModels.map((m) => {
          const isSelected = selectedModel === m.id;
          const icon = MODEL_ICONS[m.id] || <Cpu className="w-3.5 h-3.5" />;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => handleModelChange(m.id)}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 text-slate-950 shadow-lg shadow-cyan-500/30 scale-105 border border-cyan-300 font-extrabold'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-700/80 hover:border-cyan-500/60 hover:text-white hover:shadow-md'
              }`}
              title={m.description}
            >
              <span className={isSelected ? 'text-slate-950 font-extrabold' : 'text-cyan-400'}>
                {icon}
              </span>
              <span>{m.name}</span>
              {isSelected && (
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse shadow-xs" />
              )}
            </button>
          );
        })}
      </div>

      {/* Hero Search Input Form */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center rounded-2xl glass-card border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/20 transition-all duration-300 p-2 bg-slate-900/80">
          
          <div className="pl-3.5 pr-2 text-cyan-400">
            <Search className="w-6 h-6 group-focus-within:scale-110 transition-transform" />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you're looking for in plain language..."
            disabled={loading}
            className="w-full py-3.5 px-2 text-base text-slate-100 placeholder-slate-500 bg-transparent focus:outline-none disabled:opacity-50 font-medium"
          />

          {inputValue && (
            <button
              type="button"
              onClick={handleClearInput}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors mr-1 cursor-pointer"
              title="Clear text"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          )}

          <button
            type="submit"
            disabled={loading || inputValue.trim().length < 2}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
            ) : (
              <>
                <span>Search</span>
                <CornerDownLeft className="w-4 h-4 font-bold" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Suggestion Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs justify-center">
        <span className="text-cyan-400 font-semibold flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Try searching:
        </span>
        {EXAMPLE_QUERIES.map((example, i) => (
          <button
            key={i}
            onClick={() => handleSelectExample(example)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/60 transition-all cursor-pointer text-left shadow-xs"
          >
            "{example}"
          </button>
        ))}
      </div>

    </div>
  );
};
