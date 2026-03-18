import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme, vibeThemes } from '../context/ThemeContext';
import CalorieGauge from './CalorieGauge';
import WaterTracker from './WaterTracker';
import ExerciseLog from './ExerciseLog';
import FoodLog from './FoodLog';
import Analysis from './Analysis';

export default function Dashboard() {
  const { userData, logout } = useUser();
  const { vibe, setVibe } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto min-h-[85vh] animate-in fade-in duration-700">
      
      {/* Sidebar Navigation & Vibe Selector - Hides on Print */}
      <aside className="w-full md:w-64 glass rounded-3xl p-6 flex flex-col gap-8 flex-shrink-0 print:hidden shadow-xl">
        
        {/* User Profile Info */}
        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl shadow-sm border border-white/20">
          <div className="w-10 h-10 rounded-full bg-accent-color text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
            {userData.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs opacity-70 uppercase tracking-wider">Welcome</p>
            <h3 className="font-bold truncate text-lg">{userData.name}</h3>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight">VitalVibe</h2>
          <p className="text-sm opacity-70 mt-1">SDG 3 Dashboard</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60">Vibe Check</h3>
          <div className="flex justify-between md:grid md:grid-cols-5 gap-2">
            {Object.keys(vibeThemes).map(emoji => (
              <button 
                key={emoji}
                onClick={() => setVibe(emoji)}
                className={`text-2xl p-2 rounded-xl transition-all duration-300 ${vibe === emoji ? 'bg-white/40 scale-125 shadow-md z-10' : 'hover:bg-white/20 opacity-70 hover:opacity-100 hover:scale-110'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <nav className="flex flex-col gap-3 mt-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`text-left px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-accent-color text-white shadow-lg translate-x-1' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 opacity-80'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`text-left px-5 py-3 rounded-xl font-medium transition-all ${activeTab === 'analysis' ? 'bg-accent-color text-white shadow-lg translate-x-1' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 opacity-80'}`}
          >
            Analysis & SDG
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col gap-6 w-full">
        {activeTab === 'dashboard' ? (
          <>
            <header className="glass rounded-3xl p-6 flex justify-between items-center shadow-md print:hidden">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {userData.name}!</h1>
                <p className="opacity-80">Here is your daily wellness snapshot.</p>
              </div>
              <button 
                onClick={logout} 
                className="text-sm font-semibold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl transition duration-300"
              >
                Log Out
              </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CalorieGauge />
              <WaterTracker />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExerciseLog />
              <FoodLog />
            </div>
          </>
        ) : (
          <Analysis />
        )}
      </main>

    </div>
  );
}
