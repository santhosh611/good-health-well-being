import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import AuthHome from './components/AuthHome';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ZenModeOverlay from './components/ZenModeOverlay';
import { Wind } from 'lucide-react';

function AppContent() {
  const { userData } = useUser();
  const [authView, setAuthView] = useState('home'); // home | login | signup
  const [isZenMode, setIsZenMode] = useState(false);

  let currentView;
  if (userData) {
    currentView = <Dashboard />;
  } else {
    // Auth flow views mapping
    if (authView === 'home') currentView = <AuthHome onNavigate={setAuthView} />;
    else if (authView === 'login') currentView = <Login onBack={() => setAuthView('home')} />;
    else if (authView === 'signup') currentView = <Onboarding onBack={() => setAuthView('home')} />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-500 overflow-x-hidden relative">
      <div className="relative z-10 w-full max-w-7xl mx-auto h-full">
        {currentView}
      </div>

      {/* Zen Mode FAB */}
      {userData && (
        <button 
          onClick={() => setIsZenMode(true)}
          className="fixed bottom-8 right-8 bg-white/20 backdrop-blur-md border border-white/30 text-current p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-white/30 transition-all z-40 group print:hidden"
          title="Zen Mode"
        >
          <Wind size={28} className="group-hover:animate-pulse" />
        </button>
      )}

      {isZenMode && <ZenModeOverlay onClose={() => setIsZenMode(false)} />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
