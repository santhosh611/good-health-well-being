import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext(null);

export const vibeThemes = {
  '😔': 'sad',
  '😐': 'neutral',
  '🙂': 'happy',
  '🤩': 'energetic',
  '🧘': 'zen'
};

export function ThemeProvider({ children }) {
  const [vibe, setVibe] = useLocalStorage('vitalvibe_theme', '😐');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', vibeThemes[vibe] || 'neutral');
  }, [vibe]);

  return (
    <ThemeContext.Provider value={{ vibe, setVibe }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
