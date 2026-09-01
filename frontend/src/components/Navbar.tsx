import React from 'react';
import { Search, Sun, Moon, Info, Sparkles, Code2 } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeTab: 'search' | 'about';
  setActiveTab: (tab: 'search' | 'about') => void;
  onClearSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
  onClearSearch
}) => {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-cyan-500/20 shadow-xl shadow-cyan-950/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => {
            setActiveTab('search');
            if (onClearSearch) onClearSearch();
          }}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5 text-slate-950 animate-pulse font-bold" />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-40 blur-sm transition-all -z-10" />
          </div>
          
          <div>
            <span className="text-base sm:text-lg font-extrabold tracking-tight font-mono bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-xs">
              Semantic_Similarity_Search_System
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all"
            title="GitHub Repository"
          >
            <Code2 className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Theme Switcher */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition-all focus:outline-none cursor-pointer border border-transparent hover:border-slate-700"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-4.5 h-4.5 text-cyan-400 hover:rotate-90 transition-transform" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-cyan-400 hover:-rotate-45 transition-transform" />
            )}
          </button>
        </nav>

      </div>
    </header>
  );
};
