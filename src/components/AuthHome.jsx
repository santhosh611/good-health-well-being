import React from 'react';
import { LayoutDashboard, UserPlus, LogIn } from 'lucide-react';

export default function AuthHome({ onNavigate }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-in fade-in zoom-in duration-500">
      <div className="glass rounded-3xl p-10 w-full max-w-lg text-center shadow-2xl relative overflow-hidden">
        
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-accent-color/20 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-green-500/20 rounded-full blur-2xl z-0" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/50 p-4 rounded-2xl mb-6 shadow-sm border border-white/50 backdrop-blur-md">
            <LayoutDashboard size={48} className="text-accent-color" />
          </div>

          <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-sm">VitalVibe</h1>
          <p className="opacity-80 mb-10 text-lg leading-relaxed px-4">Your personal SDG 3 Wellness Dashboard. Track calories, hydration, and find your zen.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <button 
              onClick={() => onNavigate('login')}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 py-4 rounded-2xl font-bold transition-all shadow-md group dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <LogIn size={20} className="group-hover:-translate-x-1 transition-transform" /> 
              Log In
            </button>
            
            <button 
              onClick={() => onNavigate('signup')}
              className="flex items-center justify-center gap-2 bg-accent-color hover:brightness-110 border border-transparent text-white py-4 rounded-2xl font-bold transition-all shadow-lg group"
            >
              <UserPlus size={20} className="group-hover:scale-110 transition-transform" /> 
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
