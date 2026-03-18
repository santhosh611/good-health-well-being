import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useUser } from '../context/UserContext';
import { Download, Award } from 'lucide-react';

export default function Analysis() {
  const { userData } = useUser();

  const hydrationScore = Math.min((userData.waterDrank / (userData.targetWater || 1)) * 100, 100);
  const activityScore = Math.min(((userData.exercises?.reduce((sum, ex) => sum + ex.calories, 0) || 0) / 400) * 100, 100); // assume 400 is goal
  const nutritionScore = 80; // abstract concept
  const mindfulnessScore = userData.mood === 'zen' ? 100 : 60;

  const data = [
    { subject: 'Hydration', A: hydrationScore, fullMark: 100 },
    { subject: 'Activity', A: activityScore, fullMark: 100 },
    { subject: 'Nutrition', A: nutritionScore, fullMark: 100 },
    { subject: 'Mindfulness', A: mindfulnessScore, fullMark: 100 },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full">
      <div className="glass rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
        <div>
          <h2 className="text-2xl font-bold mb-2">Weekly Balance Report</h2>
          <p className="opacity-80">Here's your sustainable health trajectory across core pillars.</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-accent-color text-white px-5 py-3 rounded-xl hover:opacity-90 transition shadow-lg"
        >
          <Download size={20} /> Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="glass rounded-3xl p-6 min-h-[400px] flex flex-col">
          <h3 className="font-semibold text-lg mb-4 text-center">Wellness Radar</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="rgba(255,255,255,0.3)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <Radar name="User" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-green-400/20 to-teal-500/20">
          <Award size={64} className="text-green-500 mb-6 drop-shadow-lg" />
          <h3 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-300">SDG 3.4 Contributor</h3>
          <p className="opacity-80 leading-relaxed">
            By actively pursuing your wellness goals across hydration, activity, and mindfulness, 
            you are directly contributing to the UN's Sustainable Development Goal 3 (Target 3.4): 
            <br/><br/>
            <strong>"Reduce by one third premature mortality from non-communicable diseases through prevention and treatment and promote mental health and well-being."</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
