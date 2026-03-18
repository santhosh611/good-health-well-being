import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Plus, Activity, Zap, Trash2 } from 'lucide-react';

export default function ExerciseLog() {
  const { userData, addExercise, removeExercise } = useUser();
  const [showInput, setShowInput] = useState(false);
  const [activity, setActivity] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activity || !calories) return;
    addExercise({ name: activity, calories: parseInt(calories) });
    setActivity('');
    setCalories('');
    setShowInput(false);
  };

  // Safe check if exercises is undefined
  const exercises = userData.exercises || [];

  return (
    <div className="glass rounded-3xl p-6 shadow-lg min-h-64 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg flex items-center gap-2"><Activity size={20} className="text-green-400"/> Activity Log</h3>
        <button 
          onClick={() => setShowInput(!showInput)}
          className="bg-accent-color hover:brightness-110 text-white p-2 rounded-xl hover:scale-105 transition shadow-lg"
        >
          <Plus size={20} />
        </button>
      </div>

      {showInput && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-black/10 dark:bg-white/10 rounded-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col md:flex-row gap-3">
            <input 
              type="text" 
              placeholder="Activity Name (e.g. Running)" 
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="flex-1 bg-white/20 border border-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent-color placeholder:text-current opacity-80"
              required
            />
            <input 
              type="number" 
              placeholder="Calories" 
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full md:w-32 bg-white/20 border border-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent-color placeholder:text-current opacity-80"
              required
            />
            <button type="submit" className="bg-accent-color text-white font-medium px-4 py-3 rounded-xl hover:brightness-110 transition shadow-md">
              Add
            </button>
          </div>
        </form>
      )}

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {exercises.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-50 py-8 text-center">
            <Zap size={40} className="mb-2 opacity-30" />
            <p>No activities logged yet.</p>
            <p className="text-sm">Click the + to add one.</p>
          </div>
        ) : (
          exercises.map((ex, idx) => (
            <div key={idx} className="bg-white/10 p-4 rounded-2xl flex justify-between items-center hover:bg-white/20 transition group">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-accent-color group-hover:text-white transition">
                  <Activity size={18} />
                </div>
                <span className="font-medium truncate max-w-[120px] md:max-w-[180px] lg:max-w-[200px]">{ex.name}</span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                <span className="font-bold text-orange-500 dark:text-orange-400">+{ex.calories} kcal</span>
                <button 
                  onClick={() => removeExercise(idx)}
                  className="text-red-500 opacity-60 hover:opacity-100 hover:scale-110 transition-all p-2 bg-red-500/10 rounded-lg hover:bg-red-500 hover:text-white"
                  title="Delete Activity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )).reverse()
        )}
      </div>
    </div>
  );
}
