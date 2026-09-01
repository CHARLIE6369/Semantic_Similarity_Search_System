import React from 'react';

interface LoadingStateProps {
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ count = 3 }) => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pb-1">
        <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
      </div>

      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4"
        >
          <div className="flex items-start gap-3.5 flex-1">
            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
              </div>
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0">
            <div className="space-y-1.5 w-28">
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded-md ml-auto" />
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
};
