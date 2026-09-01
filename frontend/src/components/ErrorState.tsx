import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string | null;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="glass-panel rounded-3xl p-8 sm:p-10 text-center max-w-lg mx-auto border border-rose-200/80 dark:border-rose-950/80 bg-rose-50/30 dark:bg-rose-950/10 space-y-5 my-8">
      <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-xs border border-rose-200 dark:border-rose-800">
        <AlertTriangle className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Something went wrong
        </h3>
        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
          {message || "Unable to complete the search. Please try again."}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
