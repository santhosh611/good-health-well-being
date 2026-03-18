import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft } from 'lucide-react';

export default function Onboarding({ onBack }) {
  const { signup } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const age = parseInt(formData.age);
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);

    // BMR Calculation (Mifflin-St Jeor)
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (formData.gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const targetWaterClasses = Math.ceil((weight * 33) / 250);

    try {
      signup(formData.name, formData.password, {
        age,
        height,
        weight,
        dailyCalories: Math.round(bmr),
        targetWater: targetWaterClasses,
        waterDrank: 0,
        exercises: [],
        foods: [],
        mood: 'neutral'
      });
    } catch(err) {
      setError(err.message);
    }
  };

  const inputClass = "w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent-color focus:border-transparent transition text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm";
  const labelClass = "block text-sm font-bold mb-1 ml-1 text-gray-800 dark:text-gray-200";

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 my-8">
      <div className="glass rounded-3xl p-8 w-full max-w-md animate-in slide-in-from-right-8 fade-in duration-500 relative shadow-2xl">
        <button onClick={onBack} className="absolute top-6 left-6 opacity-60 hover:opacity-100 transition p-2 bg-black/5 dark:bg-white/5 rounded-full">
          <ArrowLeft size={20} />
        </button>

        <div className="text-center mb-6 mt-6">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="opacity-70 text-sm">Let's set up your personal wellness goals.</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl mb-6 text-center text-sm font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Username</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="e.g. Alex" />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input required type="password" name="password" value={formData.password} onChange={handleChange} className={inputClass} placeholder="••••••••" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Age</label>
              <input required type="number" name="age" value={formData.age} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Height (cm)</label>
              <input required type="number" step="0.1" name="height" value={formData.height} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Weight (kg)</label>
              <input required type="number" step="0.1" name="weight" value={formData.weight} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <button type="submit" className="w-full bg-accent-color hover:brightness-110 text-white font-bold py-4 rounded-xl shadow-lg transition mt-8 text-lg">
            Complete Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
