
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { PrdDisplay } from './components/PrdDisplay';
import { Loader } from './components/Loader';
import { LandingPage } from './components/LandingPage';
import { HistorySidebar } from './components/HistorySidebar';
import { generatePrdStream } from './services/geminiService';
import type { PrdInput, PrdHistoryItem } from './types';

interface AppError {
  title: string;
  message: string;
}

type Theme = 'dark' | 'light';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<'landing' | 'exiting' | 'app'>('landing');
  const [prdContent, setPrdContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AppError | null>(null);
  
  // Theme Management
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return (savedTheme as Theme) || 'dark';
    }
    return 'dark';
  });

  // History Management
  const [history, setHistory] = useState<PrdHistoryItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('prd_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('prd_history', JSON.stringify(history));
  }, [history]);

  const handleStart = () => {
    setViewState('exiting');
    setTimeout(() => {
      setViewState('app');
    }, 500); // Match CSS transition duration
  };

  const addToHistory = (idea: string, content: string) => {
    const newItem: PrdHistoryItem = {
      id: crypto.randomUUID(),
      title: idea.length > 40 ? idea.substring(0, 40) + '...' : idea,
      content,
      date: Date.now(),
      preview: content.substring(0, 100).replace(/[#*`]/g, '') + '...',
    };
    setHistory(prev => [newItem, ...prev]);
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleSelectHistoryItem = (item: PrdHistoryItem) => {
    setPrdContent(item.content);
    setIsSidebarOpen(false);
    setError(null);
  };

  const handleGeneratePrd = async (formData: PrdInput) => {
    setIsLoading(true);
    setError(null);
    setPrdContent('');
    setIsSidebarOpen(false);

    try {
      const stream = generatePrdStream(formData);
      let fullResponse = '';
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setPrdContent(fullResponse);
      }

      // Save to history after generation is complete
      if (fullResponse) {
        addToHistory(formData.idea, fullResponse);
      }

    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        const message = err.message.toLowerCase();
        if (message.includes('api key') || message.includes('permission denied')) {
          setError({
            title: 'Invalid API Key',
            message: 'Please ensure your API_KEY is configured correctly. You may need to generate a new key from Google AI Studio.',
          });
        } else if (message.includes('quota')) {
          setError({
            title: 'API Quota Exceeded',
            message: "You've reached your request limit. Please check your Google AI Studio account for quota details and billing.",
          });
        } else if (message.includes('safety') || message.includes('blocked')) {
          setError({
            title: 'Prompt Blocked',
            message: 'Your input may have violated the safety policy. Please revise your idea or features and try again.',
          });
        } else if (message.includes('fetch failed') || message.includes('network')) {
          setError({
            title: 'Network Error',
            message: 'Could not connect to the AI service. Please check your internet connection and try again.',
          });
        } else if (message.includes('server error') || message.includes('500') || message.includes('503')) {
          setError({
            title: 'Service Unavailable',
            message: 'The AI service is temporarily unavailable. This is likely a temporary issue. Please try again in a few moments.',
          });
        } else {
          setError({
            title: 'An Unexpected Error Occurred',
            message: err.message,
          });
        }
      } else {
        setError({
          title: 'An Unexpected Error Occurred',
          message: 'Something went wrong. Please check the console for details and try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showWelcomeScreen = !isLoading && !error && !prdContent;

  if (viewState === 'landing' || viewState === 'exiting') {
    return <LandingPage onStart={handleStart} isExiting={viewState === 'exiting'} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0e] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 animate-fade-in relative overflow-x-hidden">
      {/* --- Persistent Ambient Background (Shared with Landing) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-[128px] opacity-50 transition-colors duration-500"></div>
         <div className="absolute top-[20%] -right-[20%] w-[60vw] h-[60vw] bg-purple-300/30 dark:bg-purple-600/10 rounded-full blur-[128px] opacity-50 transition-colors duration-500"></div>
         <div className="absolute bottom-0 left-[20%] w-[50vw] h-[50vw] bg-blue-300/30 dark:bg-blue-600/10 rounded-full blur-[128px] opacity-50 transition-colors duration-500"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10">
        <Header onToggleHistory={() => setIsSidebarOpen(true)} theme={theme} onToggleTheme={toggleTheme} />
        
        <HistorySidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            history={history}
            onSelect={handleSelectHistoryItem}
            onDelete={handleDeleteHistoryItem}
        />

        <main className="container mx-auto p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3">
              <InputForm onSubmit={handleGeneratePrd} isLoading={isLoading} />
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-white/60 dark:bg-[#13131a]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl h-full min-h-[70vh] flex flex-col relative overflow-hidden transition-colors duration-300">
                {isLoading && !prdContent && <Loader />}
                {error && (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="text-red-600 dark:text-red-300 bg-red-100 dark:bg-red-900/30 p-6 rounded-lg max-w-lg w-full shadow-lg border border-red-200 dark:border-red-500/20 backdrop-blur-md">
                      <h3 className="font-bold text-lg mb-2">{error.title}</h3>
                      <p className="text-sm text-red-800 dark:text-red-200/80">{error.message}</p>
                    </div>
                  </div>
                )}
                {showWelcomeScreen && <WelcomeScreen />}
                {(prdContent || (isLoading && prdContent)) && <PrdDisplay content={prdContent} />}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

const WelcomeScreen: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500 dark:text-gray-400">
        <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-gray-200 dark:border-white/10 shadow-inner transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Ready to Build?</h2>
        <p className="max-w-md text-gray-600 dark:text-gray-500 transition-colors duration-300">Describe your app idea in the form on the left. Our AI will generate a complete architecture and requirements document in seconds.</p>
    </div>
);

export default App;
