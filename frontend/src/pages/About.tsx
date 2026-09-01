import React from 'react';
import { Cpu, Layers, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>System Architecture & Machine Learning</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          About Semantic Search
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Productionizing an existing Gensim Word2Vec ML system trained on 50,000 knowledge-base documents.
        </p>
      </div>

      {/* Overview Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <span>Project Purpose</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Traditional search engines rely on exact keyword matches. If a user searches for <em className="text-slate-900 dark:text-white font-semibold font-normal">"I forgot my password"</em>, traditional search fails to match documents containing <em className="text-slate-900 dark:text-white font-semibold font-normal">"Account credential recovery"</em> or <em className="text-slate-900 dark:text-white font-semibold font-normal">"Reset sign-in credentials"</em>.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Our system converts natural-language queries into 100-dimensional continuous vector embeddings using Gensim Word2Vec, enabling cosine similarity matching against pre-computed document vector spaces in real-time.
        </p>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-500" />
          <span>ML & Data Pipeline Architecture</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs font-semibold">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-indigo-600 dark:text-indigo-400">1. User Query</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Natural Language</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-purple-600 dark:text-purple-400">2. NLTK Preprocess</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Clean & Tokenize</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-pink-600 dark:text-pink-400">3. Word2Vec</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Mean Pooling</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-emerald-600 dark:text-emerald-400">4. Cosine Matrix</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">50K Doc Vectors</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-amber-600 dark:text-amber-400">5. Top-K Results</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Ranked Descent</p>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>Model Parameters:</strong> vector_size=100, window=5, min_count=2, sg=1 (Skip-gram), epochs=20</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>Document Fields:</strong> Combined text representation of title + content + keywords</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>Preprocessing Rules:</strong> Lowercase, regex non-alphanumeric strip, whitespace normalization, NLTK tokenization, English stopword removal</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Specs */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-500" />
          <span>Technology Stack</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">Backend Engine</h3>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300">
              <li>• Python 3.10 + FastAPI</li>
              <li>• Uvicorn ASGI Server</li>
              <li>• Gensim (Word2Vec)</li>
              <li>• NumPy & Pandas</li>
              <li>• scikit-learn (Cosine Similarity)</li>
              <li>• NLTK (Natural Language Toolkit)</li>
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="font-bold text-purple-600 dark:text-purple-400 text-sm">Frontend User Interface</h3>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300">
              <li>• React 19 + TypeScript</li>
              <li>• Vite Build System</li>
              <li>• Tailwind CSS</li>
              <li>• Framer Motion Animations</li>
              <li>• Lucide React Icons</li>
              <li>• Responsive Dark & Light Mode</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
