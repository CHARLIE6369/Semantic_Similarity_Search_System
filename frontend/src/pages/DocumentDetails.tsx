import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Hash, Tag, Sparkles, AlertCircle } from 'lucide-react';
import type { Document } from '../types/search';
import { api } from '../services/api';
import { CategoryBadge } from '../components/CategoryBadge';
import { SimilarityScore } from '../components/SimilarityScore';

interface DocumentDetailsProps {
  documentId: string;
  similarityScore?: number | null;
  searchQuery?: string;
  onBack: () => void;
}

export const DocumentDetails: React.FC<DocumentDetailsProps> = ({
  documentId,
  similarityScore,
  searchQuery,
  onBack
}) => {
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    api.getDocument(documentId)
      .then((data) => {
        if (isMounted) {
          setDoc(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || `Unable to load document details for ID '${documentId}'.`);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [documentId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </button>

        <div className="glass-card rounded-2xl p-8 border border-cyan-500/20 bg-slate-900/90 animate-pulse space-y-6">
          <div className="h-6 bg-slate-800 rounded-lg w-1/4" />
          <div className="h-10 bg-slate-800 rounded-xl w-3/4" />
          <div className="space-y-3 pt-4">
            <div className="h-4 bg-slate-800 rounded-lg w-full" />
            <div className="h-4 bg-slate-800 rounded-lg w-5/6" />
            <div className="h-4 bg-slate-800 rounded-lg w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </button>

        <div className="glass-card rounded-2xl p-8 text-center border border-rose-500/30 bg-slate-900/90 space-y-4">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Document Not Found</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">{error}</p>
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs"
          >
            Return to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6 pb-16"
    >
      
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold text-cyan-400 hover:text-cyan-300 bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </button>

        {searchQuery && (
          <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <span>Query Context:</span>
            <span className="text-cyan-400 font-mono italic font-bold">"{searchQuery}"</span>
          </span>
        )}
      </div>

      {/* Main Document Details Card */}
      <article className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 bg-slate-900/95 shadow-2xl shadow-cyan-950/40 space-y-8">
        
        {/* Header Section */}
        <header className="space-y-4 border-b border-slate-800 pb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono text-xs font-extrabold text-white flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-cyan-500/40">
                <Hash className="w-3.5 h-3.5 text-cyan-400" />
                {doc.document_id}
              </span>
              <CategoryBadge category={doc.category} />
            </div>

            {similarityScore !== undefined && similarityScore !== null && (
              <SimilarityScore score={similarityScore} />
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-heading tracking-tight">
            {doc.title}
          </h1>
        </header>

        {/* Document Content Section */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4.5 h-4.5 text-cyan-400" />
            <span>Document Content</span>
          </h2>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/80 text-white font-medium text-base sm:text-lg leading-relaxed space-y-4">
            {doc.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-slate-100 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Keywords & Metadata Tags Section */}
        {doc.keywords && doc.keywords.length > 0 && (
          <footer className="space-y-4 border-t border-slate-800 pt-6">
            <h2 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4.5 h-4.5 text-cyan-400" />
              <span>Keywords & Metadata Tags</span>
            </h2>

            <div className="flex flex-wrap gap-2 pt-1">
              {doc.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-3.5 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/40 shadow-xs"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{kw}</span>
                </span>
              ))}
            </div>
          </footer>
        )}

      </article>

    </motion.div>
  );
};
