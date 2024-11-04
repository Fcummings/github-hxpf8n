import React from 'react';

interface StatsCardProps {
  number: string;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ number, label }) => {
  return (
    <div className="glass-card p-4 text-center">
      <div className="text-2xl font-bold text-accent">{number}</div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  );
};

export default StatsCard;