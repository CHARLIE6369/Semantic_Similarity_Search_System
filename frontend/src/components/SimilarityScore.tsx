import React from 'react';

interface SimilarityScoreProps {
  score: number;
  showBar?: boolean;
  compact?: boolean;
}

export const SimilarityScore: React.FC<SimilarityScoreProps> = ({
  score,
  showBar = true
}) => {
  const percentage = Math.min(Math.max(score * 100, 0), 100);

  // Dynamic score color indicator
  const getScoreColorClass = (pct: number) => {
    if (pct >= 75) return 'from-cyan-400 via-teal-400 to-emerald-400';
    if (pct >= 50) return 'from-teal-400 via-emerald-400 to-amber-400';
    return 'from-amber-400 to-rose-400';
  };

  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-bold text-white uppercase tracking-wider">Similarity</span>
        <span className="text-sm font-extrabold font-mono text-white bg-slate-950 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
          {percentage.toFixed(2)}%
        </span>
      </div>

      {showBar && (
        <div className="w-24 sm:w-28 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getScoreColorClass(percentage)} transition-all duration-500 shadow-xs`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};
