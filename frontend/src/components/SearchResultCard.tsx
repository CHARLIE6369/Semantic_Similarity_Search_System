import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Hash, Trophy } from 'lucide-react';
import type { SearchResult } from '../types/search';
import { CategoryBadge } from './CategoryBadge';
import { SimilarityScore } from './SimilarityScore';

interface SearchResultCardProps {
  result: SearchResult;
  index: number;
  onSelectDocument: (docId: string, score: number) => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  result,
  index,
  onSelectDocument
}) => {
  const isTopMatch = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`glass-card rounded-2xl p-5 sm:p-6 border transition-all duration-300 relative group overflow-hidden bg-slate-900/90 ${
        isTopMatch
          ? 'border-cyan-400/60 ring-1 ring-cyan-500/30 shadow-xl shadow-cyan-950/50'
          : 'border-slate-800 hover:border-cyan-500/40'
      }`}
    >
      {/* Top match glow bar for #1 result */}
      {isTopMatch && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500" />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Document Icon Box */}
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105 ${
            isTopMatch
              ? 'bg-gradient-to-tr from-cyan-400 to-teal-400 text-slate-950 shadow-md shadow-cyan-500/30 font-bold'
              : 'bg-slate-950 text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-950/60'
          }`}>
            <FileText className="w-5.5 h-5.5" />
          </div>

          {/* Title & Metadata */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {isTopMatch && (
                <span className="inline-flex items-center gap-1 font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-xs">
                  <Trophy className="w-3 h-3 text-slate-950" />
                  Top Match
                </span>
              )}
              <span className="font-mono text-xs font-bold text-white flex items-center gap-0.5 bg-slate-950 px-2.5 py-1 rounded-md border border-cyan-500/30">
                <Hash className="w-3 h-3 text-cyan-400" />
                {result.document_id}
              </span>
              <CategoryBadge category={result.category} />
            </div>

            <h3 
              onClick={() => onSelectDocument(result.document_id, result.similarity_score)}
              className="text-base sm:text-lg font-extrabold text-white hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
            >
              {result.title}
            </h3>
          </div>
        </div>

        {/* Score & View Action */}
        <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800 shrink-0">
          <SimilarityScore score={result.similarity_score} />
          
          <button
            onClick={() => onSelectDocument(result.document_id, result.similarity_score)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 transition-all duration-300 group/btn shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
