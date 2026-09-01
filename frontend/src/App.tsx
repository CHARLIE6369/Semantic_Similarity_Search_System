import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { DocumentDetails } from './pages/DocumentDetails';
import { About } from './pages/About';
import { useSearch } from './hooks/useSearch';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [activeTab, setActiveTab] = useState<'search' | 'about'>('search');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const searchState = useSearch();

  // Handle dark mode DOM class toggling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectDocument = (docId: string, score: number) => {
    setSelectedDocId(docId);
    setSelectedScore(score);
  };

  const handleBackToSearch = () => {
    setSelectedDocId(null);
    setSelectedScore(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 relative selection:bg-cyan-500 selection:text-slate-950 font-sans overflow-x-hidden">
      
      {/* Background Search Image Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-30 dark:opacity-20 pointer-events-none z-0 mix-blend-luminosity filter saturate-150 contrast-125"
        style={{ backgroundImage: "url('/search_bg.jpg')" }}
      />

      {/* Cybernetic Dark Gradient Radial Mask */}
      <div className="fixed inset-0 bg-radial-gradient-cyan pointer-events-none z-0" />

      {/* Header Navbar */}
      <div className="relative z-10">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedDocId(null);
          }}
          onClearSearch={() => {
            searchState.clearSearch();
            setSelectedDocId(null);
          }}
        />

        {/* Main Content Router View */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
          {selectedDocId ? (
            <DocumentDetails
              documentId={selectedDocId}
              similarityScore={selectedScore}
              searchQuery={searchState.query}
              onBack={handleBackToSearch}
            />
          ) : activeTab === 'about' ? (
            <About />
          ) : (
            <Home
              query={searchState.query}
              results={searchState.results}
              totalResults={searchState.totalResults}
              processingTimeMs={searchState.processingTimeMs}
              loading={searchState.loading}
              error={searchState.error}
              topK={searchState.topK}
              setTopK={searchState.setTopK}
              category={searchState.category}
              setCategory={searchState.setCategory}
              categories={searchState.categories}
              modelType={searchState.modelType}
              setModelType={searchState.setModelType}
              models={searchState.models}
              isSearched={searchState.isSearched}
              onSearch={searchState.executeSearch}
              onClearSearch={searchState.clearSearch}
              onSelectDocument={handleSelectDocument}
            />
          )}
        </main>
      </div>

    </div>
  );
}

export default App;
