
import React from 'react';

export const Loader: React.FC = () => {
    const messages = [
        "Initializing Gemini 2.5 Neural Network...",
        "Consulting with virtual product managers...",
        "Drafting technical architecture...",
        "Optimizing database schema...",
        "Structuring API endpoints...",
        "Finalizing PRD masterpiece...",
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessage(messages[Math.floor(Math.random() * messages.length)]);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-500/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
            <div className="absolute inset-4 rounded-full bg-indigo-100 dark:bg-indigo-500/10 animate-pulse"></div>
        </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Generating Specifications</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">{message}</p>
    </div>
  );
};
