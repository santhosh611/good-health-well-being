import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useUser } from '../context/UserContext';
import { Flame } from 'lucide-react';

export default function CalorieGauge() {
  const { userData } = useUser();
  const burned = userData.exercises?.reduce((sum, ex) => sum + ex.calories, 0) || 0;
  const eaten = userData.foods?.reduce((sum, f) => sum + f.calories, 0) || 0;
  
  const remaining = userData.dailyCalories + burned - eaten;
  const target = userData.dailyCalories;

  const data = [
    { name: 'Remaining', value: remaining > 0 ? remaining : 0 },
    { name: 'Eaten', value: eaten > 0 ? eaten : 0.01 }, // avoid 0 height
  ];
  
  const COLORS = ['rgba(255,255,255,0.2)', '#ef4444']; // Red for eaten

  return (
    <div className="glass rounded-3xl p-6 h-64 flex flex-col items-center justify-center relative shadow-lg">
      <h3 className="font-semibold mb-2 flex items-center gap-2"><Flame size={20} className="text-orange-500" /> Calories Remaining</h3>
      
      <div className="absolute inset-0 top-10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl font-bold">{remaining}</p>
          <p className="text-xs opacity-70 mt-1 flex flex-col">
            <span>Base BMR: {target}kcal</span>
            {burned > 0 && <span className="text-orange-500 font-medium my-0.5">+{burned} burned</span>}
            {eaten > 0 && <span className="text-red-500 font-medium">-{eaten} eaten</span>}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={180}
            endAngle={0}
            dataKey="value"
            stroke="none"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
