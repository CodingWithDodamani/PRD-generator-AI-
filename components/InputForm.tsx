
import React, { useState, useEffect } from 'react';
import type { PrdInput, Platform, TechStack, CustomTechStack, PrdScope, VanillaStructure } from '../types';
import { CustomTechStackForm } from './CustomTechStackForm';

interface InputFormProps {
  onSubmit: (data: PrdInput) => void;
  isLoading: boolean;
}

const platformOptions: { value: Platform; label: string; icon: React.ReactNode }[] = [
    { 
      value: 'web', 
      label: 'Web Application', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> 
    },
    { 
      value: 'mobile', 
      label: 'Mobile Application', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> 
    },
    { 
      value: 'both', 
      label: 'Web & Mobile', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><rect x="4" y="12" width="8" height="10" rx="1"></rect></svg> 
    },
];

const techStackOptions: { value: TechStack; label: string; description: string; color: string; icon: React.ReactNode }[] = [
    { 
        value: 'react', 
        label: 'React Ecosystem', 
        description: 'Next.js, Tailwind CSS, Node.js',
        color: 'text-cyan-500',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse>
                 <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(135 12 12)"></ellipse>
                 <circle cx="12" cy="12" r="2"></circle>
            </svg>
        )
    },
    { 
        value: 'vue', 
        label: 'Vue Ecosystem', 
        description: 'Vue 3, Nuxt, Tailwind CSS',
        color: 'text-emerald-500',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 19h20L12 2z"></path>
                <path d="M2 2l10 17 10-17"></path>
            </svg>
        )
    },
    { 
        value: 'classic', 
        label: 'Vanilla Web', 
        description: 'HTML5, CSS3, JavaScript',
        color: 'text-orange-500',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
        )
    },
    { 
        value: 'mobile', 
        label: 'React Native', 
        description: 'Cross-platform Mobile, Expo',
        color: 'text-purple-500',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <path d="M12 18h.01"></path>
                <path d="M8 21h8"></path>
            </svg>
        )
    },
];


export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState('');
  const [platform, setPlatform] = useState<Platform>('');
  const [scope, setScope] = useState<PrdScope>('fullstack');
  const [features, setFeatures] = useState('');
  const [audience, setAudience] = useState('');
  const [techStack, setTechStack] = useState<TechStack>('');
  const [customTechStack, setCustomTechStack] = useState<CustomTechStack>({
    frontend: '',
    backend: '',
    database: '',
    deployment: '',
  });
  const [vanillaStructure, setVanillaStructure] = useState<VanillaStructure>('single');
  const [monetization, setMonetization] = useState('');
  const [successMetrics, setSuccessMetrics] = useState('');
  const [showCustomStackForm, setShowCustomStackForm] = useState(false);

  // Reset vanilla structure when switching away from classic
  useEffect(() => {
      if (techStack !== 'classic') {
          setVanillaStructure('single');
      }
  }, [techStack]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit({ 
          idea, 
          platform, 
          scope, 
          features, 
          audience, 
          techStack, 
          customTechStack, 
          vanillaStructure,
          monetization,
          successMetrics
      });
    }
  };
  
  const handleSelectPresetStack = (value: TechStack) => {
    setTechStack(techStack === value ? '' : value);
    setShowCustomStackForm(false);
    setCustomTechStack({ frontend: '', backend: '', database: '', deployment: '' });
  };

  const handleShowCustomStackForm = () => {
    setShowCustomStackForm(true);
    setTechStack('');
  };


  return (
    <div className="bg-white/60 dark:bg-[#13131a]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-2xl sticky top-24 transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20">
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-white/5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Details</h2>
          <p className="text-xs text-gray-500 mt-1">Define the parameters for your product.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="idea" className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Core App Idea <span className="text-indigo-500 dark:text-indigo-400">*</span>
          </label>
          <textarea
            id="idea"
            rows={4}
            className="w-full px-4 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl shadow-inner focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-all resize-none"
            placeholder="e.g., A social network for amateur chefs to share recipes and host virtual dinner parties..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            required
          />
        </div>

        <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Target Platform</label>
            <div className="grid grid-cols-3 gap-2">
                {platformOptions.map(option => (
                     <button
                        key={option.value}
                        type="button"
                        onClick={() => setPlatform(platform === option.value ? '' : option.value)}
                        className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border transition-all duration-200 ${platform === option.value ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'}`}
                     >
                        <div className="mb-1.5 opacity-80">{option.icon}</div>
                        <span className="text-[10px] font-medium">{option.label}</span>
                    </button>
                ))}
            </div>
        </div>

        <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">PRD Scope</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => setScope('frontend')}
                    className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-200 ${scope === 'frontend' ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'}`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                    <div className="text-left">
                        <div className="text-xs font-bold">Frontend (Prototype)</div>
                        <div className="text-[9px] opacity-80 font-normal">UI/UX & Components Only</div>
                    </div>
                </button>

                <button
                    type="button"
                    onClick={() => setScope('fullstack')}
                    className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-200 ${scope === 'fullstack' ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'}`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                    <div className="text-left">
                        <div className="text-xs font-bold">Frontend + Backend</div>
                        <div className="text-[9px] opacity-80 font-normal">Production Ready Full Stack</div>
                    </div>
                </button>
            </div>
        </div>
        
        <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Preferred Tech Stack</label>
            {!showCustomStackForm ? (
                 <div className="space-y-2">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {techStackOptions.map(option => (
                             <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelectPresetStack(option.value)}
                                className={`group relative text-left p-3 rounded-xl border transition-all duration-300 flex items-start space-x-3 ${techStack === option.value ? 'bg-indigo-50/80 dark:bg-indigo-600/20 border-indigo-500/50 ring-1 ring-indigo-500/50' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20'}`}
                             >
                                <div className={`shrink-0 p-2 rounded-lg ${techStack === option.value ? 'bg-white dark:bg-white/10 shadow-sm' : 'bg-gray-100 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10'} ${option.color} transition-colors`}>
                                    {option.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className={`block font-bold text-xs mb-0.5 ${techStack === option.value ? 'text-indigo-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                                        {option.label}
                                    </span>
                                    <span className={`block text-[10px] ${techStack === option.value ? 'text-indigo-700/80 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {option.description}
                                    </span>
                                </div>
                                {techStack === option.value && (
                                    <div className="absolute top-3 right-3 text-indigo-600 dark:text-indigo-400 animate-in fade-in zoom-in duration-200">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    
                    {/* Vanilla Web Sub-options */}
                    {techStack === 'classic' && (
                        <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                            <label className="block text-[10px] font-bold text-orange-800 dark:text-orange-200 uppercase tracking-wider mb-2">
                                Vanilla Structure
                            </label>
                            <div className="relative">
                                <select
                                    value={vanillaStructure}
                                    onChange={(e) => setVanillaStructure(e.target.value as VanillaStructure)}
                                    className="w-full px-3 py-2 bg-white dark:bg-black/20 border border-orange-200 dark:border-orange-500/30 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-xs font-medium text-gray-900 dark:text-white transition-colors outline-none appearance-none cursor-pointer"
                                >
                                    <option value="single">Single File (All code in index.html)</option>
                                    <option value="separate">Separate Files (HTML, CSS, JS)</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-orange-500 dark:text-orange-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleShowCustomStackForm}
                        className="w-full flex items-center justify-center py-2 px-3 text-xs font-medium rounded-lg border border-dashed border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all mt-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Define Custom Stack
                    </button>
                 </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Custom Configuration</span>
                        <button 
                            type="button" 
                            onClick={() => setShowCustomStackForm(false)}
                            className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white underline decoration-dotted"
                        >
                            Cancel
                        </button>
                    </div>
                    <CustomTechStackForm stack={customTechStack} onChange={setCustomTechStack} />
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 gap-4">
            <div>
            <label htmlFor="features" className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Key Features
            </label>
            <input
                type="text"
                id="features"
                className="w-full px-4 py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-all"
                placeholder="e.g., User auth, Payment gateway, Real-time chat"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
            />
            </div>

            <div>
            <label htmlFor="audience" className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Target Audience
            </label>
            <input
                type="text"
                id="audience"
                className="w-full px-4 py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-all"
                placeholder="e.g., Small business owners, College students"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
            />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="monetization" className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Monetization Strategy
                    </label>
                    <input
                        type="text"
                        id="monetization"
                        className="w-full px-4 py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-all"
                        placeholder="e.g., Freemium, Subscription, Ads"
                        value={monetization}
                        onChange={(e) => setMonetization(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="successMetrics" className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Success Metrics
                    </label>
                    <input
                        type="text"
                        id="successMetrics"
                        className="w-full px-4 py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-all"
                        placeholder="e.g., 1000 DAU, 5% Conversion Rate"
                        value={successMetrics}
                        onChange={(e) => setSuccessMetrics(e.target.value)}
                    />
                </div>
            </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !idea.trim()}
          className="w-full group relative flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-[#13131a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-indigo-500/25 overflow-hidden transform active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
                <span className="relative z-10 flex items-center">
                    Generate PRD
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out"></div>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
