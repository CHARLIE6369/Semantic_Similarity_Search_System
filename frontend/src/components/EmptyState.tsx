import React from 'react';
import { SearchX, Sparkles, HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  onSelectQuery: (query: string) => void;
}

const SUGGESTED_QUERIES = [
  "How to reset two-factor authentication recovery code",
  "Where can I find my monthly billing receipt",
  "Troubleshoot login issues on mobile application",
  "How to update account profile email address"
];

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectQuery }) => {
  return (
    <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto border border-slate-200/80 dark:border-slate-800 space-y-6 my-8">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto shadow-inner border border-amber-200/60 dark:border-amber-900/60">
        <SearchX className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          No matching documents
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Try describing your problem differently, using general keywords, or selecting a broader category filter.
        </p>
      </div>

      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-left space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
          <span>Recommended searches to try:</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {SUGGESTED_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSelectQuery(q)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-300 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 transition-all text-left group"
            >
              <span>"{q}"</span>
              <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
