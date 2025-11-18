
import React from 'react';
import { LandingScene } from './LandingScene';

interface LandingPageProps {
  onStart: () => void;
  isExiting?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, isExiting = false }) => {
  return (
    <div className={`min-h-screen bg-[#0a0a0e] text-white font-sans overflow-x-hidden transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-600/20 rounded-full blur-[128px] animate-pulse-slow"></div>
         <div className="absolute top-[20%] -right-[20%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[128px] animate-pulse-slower"></div>
         <div className="absolute bottom-0 left-[20%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[128px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* --- Navigation --- */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M4 12.1_8-.8a2.5 2.5 0 0 1 3.536 0L12 6.5"></path></svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">PRD Generator AI</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
           <a href="#features" className="hover:text-white transition-colors">Features</a>
           <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
           <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button 
          onClick={onStart}
          className="hidden md:block px-5 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all backdrop-blur-md"
        >
          Login
        </button>
      </nav>

      {/* --- Main Hero --- */}
      <section className="relative z-10 pt-16 pb-32 lg:pt-24 lg:pb-40 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-8 relative z-20">
            <div className="inline-flex items-center px-3 py-1 space-x-2 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                <span>Powered by Google Gemini 2.5</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Build Software <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Faster Than Ever.
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform a single sentence into a comprehensive Product Requirements Document. 
              Generate architecture diagrams, database schemas, and API specs instantly with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <button 
                onClick={onStart}
                className="relative group px-8 py-4 bg-white text-indigo-950 rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Building Free
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
              </button>
              
              <button onClick={onStart} className="px-8 py-4 rounded-full font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center backdrop-blur-sm">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Watch Demo
              </button>
            </div>
            
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-gray-500 text-sm font-medium">
               <span>Trusted by builders at</span>
               <div className="flex gap-4 opacity-50 grayscale">
                  {/* Mock Logos */}
                  <div className="h-5 w-16 bg-current rounded"></div>
                  <div className="h-5 w-16 bg-current rounded"></div>
                  <div className="h-5 w-16 bg-current rounded"></div>
               </div>
            </div>
          </div>

          {/* Interactive 3D Visual */}
          <div className="lg:w-1/2 relative h-[500px] w-full flex items-center justify-center perspective-container">
             
             {/* THE THREE.JS SCENE */}
             <LandingScene />

             {/* --- Floating Elements (HTML Overlays with Parallax Effect via 3D scene is simpler, here we just float them) --- */}
             {/* Note: In a full production app, we might map these to 3D coordinates, but CSS overlay is performant and accessible */}
             
             {/* Badge 1: Status */}
             <div 
               className="absolute top-[25%] right-0 md:right-12 bg-[#1a1a24]/80 backdrop-blur-md border border-green-500/30 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 animate-float-delayed z-10"
             >
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                   <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                   <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Status</div>
                   <div className="text-sm font-bold text-white">Production Ready</div>
                </div>
             </div>

              {/* Badge 2: Output */}
             <div 
               className="absolute bottom-[25%] left-0 md:left-8 bg-[#1a1a24]/80 backdrop-blur-md border border-indigo-500/30 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 animate-float z-10"
             >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                   <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <div>
                   <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Output</div>
                   <div className="text-sm font-bold text-white">AI Optimized</div>
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="relative z-10 py-24 bg-black/20 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to build.</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Stop wasting weeks on documentation. Our AI generates every technical detail you need to hand off to developers.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "System Architecture",
                  desc: "Detailed breakdown of microservices, frontend/backend interactions, and deployment strategy.",
                  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                  color: "text-blue-400",
                  bg: "bg-blue-500/10"
                },
                {
                  title: "Database Schema",
                  desc: "Complete SQL/NoSQL schema definitions including relationships (1:1, 1:N) and data types.",
                  icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
                  color: "text-purple-400",
                  bg: "bg-purple-500/10"
                },
                {
                  title: "Security First",
                  desc: "Automatic threat modeling identifying XSS, CSRF, and auth vulnerabilities with mitigation steps.",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  color: "text-green-400",
                  bg: "bg-green-500/10"
                }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2">
                   <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <svg className={`w-8 h-8 ${feature.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={feature.icon}></path></svg>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                   <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
      
      {/* --- How it Works --- */}
      <section id="how-it-works" className="relative z-10 py-24">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">From Idea to Spec in Seconds</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
               {/* Connector Line (Desktop) */}
               <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
               
               {[
                 { step: "01", title: "Describe Idea", desc: "Type a simple sentence about your app concept." },
                 { step: "02", title: "AI Analysis", desc: "Gemini 2.5 expands it into technical requirements." },
                 { step: "03", title: "Get PRD", desc: "Copy the Markdown and start coding instantly." }
               ].map((step, i) => (
                 <div key={i} className="relative flex flex-col items-center text-center z-10">
                    <div className="w-24 h-24 rounded-full bg-[#0a0a0e] border-4 border-indigo-500/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                       <span className="text-3xl font-black text-indigo-500">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm max-w-xs">{step.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 PRD Generator AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <a href="#" className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
               <a href="#" className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg></a>
            </div>
         </div>
      </footer>

      <style>{`
        .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slower { animation: pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
