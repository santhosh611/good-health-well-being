import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Wind } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function ZenModeOverlay({ onClose }) {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
  const [loop, setLoop] = useState(1);
  const { updateUserData } = useUser();

  useEffect(() => {
    let timeout;
    if (phase === 'inhale') {
      timeout = setTimeout(() => setPhase('hold'), 4000);
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('exhale'), 2000);
    } else if (phase === 'exhale') {
      timeout = setTimeout(() => {
        if (loop < 3) {
          setLoop(l => l + 1);
          setPhase('inhale');
        } else {
          // Increase mindfulness or update mood on completion
          updateUserData({ mood: 'zen' });
          onClose(); // Auto close after 3 rounds
        }
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [phase, loop, onClose, updateUserData]);

  const circleVariants = {
    inhale: { scale: 1.5, transition: { duration: 4, ease: "easeInOut" } },
    hold: { scale: 1.5, transition: { duration: 2 } },
    exhale: { scale: 1, transition: { duration: 4, ease: "easeInOut" } }
  };

  const textPhase = {
    inhale: "Inhale...",
    hold: "Hold...",
    exhale: "Exhale..."
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl animate-in fade-in duration-700">
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition">
        <X size={32} />
      </button>

      <div className="text-center relative z-10">
        <motion.div 
          className="w-48 h-48 rounded-full border-4 border-white/20 bg-white/5 mx-auto flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.15)] backdrop-blur-md"
          variants={circleVariants}
          initial="exhale"
          animate={phase}
        >
          <Wind size={48} className="text-white/30" />
        </motion.div>
        
        <div className="mt-16 text-white">
          <motion.h2 
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-light tracking-widest"
          >
            {textPhase[phase]}
          </motion.h2>
          <p className="mt-4 opacity-50 tracking-widest uppercase text-sm font-semibold">Cycle {loop} of 3</p>
        </div>
      </div>
    </div>
  );
}
