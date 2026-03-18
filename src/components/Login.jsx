import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, LogIn } from 'lucide-react';

export default function Login({ onBack }) {
  const { login } = useUser();
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(formData.name, formData.password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="glass rounded-3xl p-8 w-full max-w-md animate-in slide-in-from-right-8 fade-in duration-500 shadow-2xl relative">
        <button onClick={onBack} className="absolute top-6 left-6 opacity-60 hover:opacity-100 transition p-2 bg-black/5 dark:bg-white/5 rounded-full">
          <ArrowLeft size={20} />
        </button>
        
        <div className="text-center mb-8 mt-6">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="opacity-70 text-sm">Log in to resume your wellness journey.</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl mb-6 text-center text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1 ml-1 text-gray-800 dark:text-gray-200">Username</label>
            <input 
              required 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent-color focus:border-transparent transition text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
              placeholder="e.g. Alex"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 ml-1 text-gray-800 dark:text-gray-200">Password</label>
            <input 
              required 
              type="password" 
              value={formData.password} 
              onChange={e => setFormData({ ...formData, password: e.target.value })} 
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-3 outline-none focus:ring-2 focus:ring-accent-color focus:border-transparent transition text-gray-900 dark:text-white placeholder:text-gray-400 shadow-sm"
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="w-full flex justify-center items-center gap-2 bg-accent-color hover:brightness-110 text-white font-bold py-4 rounded-xl shadow-lg transition mt-8 text-lg">
            <LogIn size={20} /> Log In
          </button>
        </form>
      </div>
    </div>
  );
}
