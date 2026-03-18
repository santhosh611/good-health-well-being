import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Droplet, Plus, Minus, GlassWater } from 'lucide-react';

export default function WaterTracker() {
  const { userData, addWater } = useUser();
  const [qty, setQty] = useState(1);
  
  const goal = userData.targetWater || 8;
  const drank = userData.waterDrank || 0;
  
  // Calculate remaining, avoiding negative numbers visually 
  const remaining = Math.max(goal - drank, 0);
  const percent = Math.min(Math.round((drank / goal) * 100), 100);

  const handleAdd = (e) => {
    e?.preventDefault();
    if (qty > 0) {
      addWater(parseInt(qty));
      setQty(1); // Reset back to default 1 after adding
    }
  };

  const handleRemove = (e) => {
    e?.preventDefault();
    if (qty > 0 && drank > 0) {
      // Don't reduce below zero
      const reduction = Math.min(parseInt(qty), drank);
      addWater(-reduction);
      setQty(1); // Reset back to default 1 after removing
    }
  };

  return (
    <div className="glass rounded-3xl p-6 h-64 flex flex-col shadow-lg relative overflow-hidden">
      {/* Background progress fill visualization */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-blue-500/10 transition-all duration-1000 ease-in-out z-0" 
        style={{ height: `${percent}%` }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Droplet size={20} className="text-blue-500" fill="currentColor" /> Hydration
            </h3>
            <p className="opacity-70 text-sm mt-1">{drank} / {goal} glasses ({percent}%)</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-4xl font-bold text-blue-500 mb-1">{remaining}</p>
          <p className="text-sm opacity-70 mb-5">{remaining === 1 ? 'glass' : 'glasses'} remaining today</p>
          
          <div className="flex items-center gap-2 bg-white/20 p-2 rounded-2xl border border-white/30 shadow-sm backdrop-blur-md">
            <div className="bg-white/40 p-2 rounded-xl">
              <GlassWater size={20} className="text-blue-600 dark:text-blue-300" />
            </div>
            
            <input 
              type="number" 
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-12 md:w-16 bg-transparent text-center font-bold text-lg outline-none"
            />
            
            <div className="flex gap-1 ml-1">
              <button 
                type="button"
                onClick={handleRemove}
                disabled={drank === 0}
                className={`px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center font-bold ${drank > 0 ? 'bg-red-500/80 hover:bg-red-600 text-white' : 'bg-gray-400 opacity-50 cursor-not-allowed text-white'}`}
                title="Reduce water"
              >
                <Minus size={18} />
              </button>
              
              <button 
                type="button"
                onClick={handleAdd}
                className="bg-accent-color hover:brightness-110 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 font-semibold"
                title="Add water"
              >
                <Plus size={18} /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
