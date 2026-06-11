import React from 'react';

const StatCard = ({ label, value, icon: Icon, subtext, glow = false, children }) => {
  return (
    <div className={`bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-primary/50 ${glow ? 'glow-cyan' : ''}`}>
      <div className="flex justify-between items-start">
        <span className="font-mono text-[12px] font-bold text-on-surface-variant tracking-wider uppercase">{label}</span>
        {Icon && <Icon className={`w-[18px] h-[18px] ${glow ? 'text-primary' : 'text-on-surface-variant'}`} />}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="font-headline text-2xl text-on-background font-extrabold leading-none">{value}</span>
          {subtext && (
            <span className={`text-[10px] font-mono uppercase mt-1 ${subtext.startsWith('+') || subtext.includes('4W') ? 'text-primary' : 'text-on-surface-variant'}`}>
              {subtext}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default StatCard;
