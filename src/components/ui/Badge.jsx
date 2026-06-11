import React from 'react';

const Badge = ({ children, type }) => {
  let badgeClass = 'bg-outline-variant text-on-surface-variant';

  const normalized = String(type || children || '').toUpperCase();

  if (normalized === 'WIN' || normalized === 'LIVE' || normalized === 'READY' || normalized === 'STRENGTH' || normalized === 'INTELLIGENCE' || normalized === 'OPERATIONAL' || normalized === 'ACTIVE') {
    badgeClass = 'bg-primary/20 text-primary border border-primary/30';
  } else if (normalized === 'LOSS' || normalized === 'WARNING' || normalized === 'ERROR') {
    badgeClass = 'bg-error/20 text-error border border-error/30';
  } else if (normalized === 'PROCESSING') {
    badgeClass = 'bg-[#E5B50F]/20 text-[#E5B50F] border border-[#E5B50F]/30';
  } else if (normalized === 'INITIATOR' || normalized === 'SENTINEL' || normalized === 'DUELIST' || normalized === 'CONTROLLER' || normalized === 'IGL/CONTROLLER') {
    badgeClass = 'bg-secondary-container text-on-secondary-container border border-outline-variant';
  }

  return (
    <span className={`px-2 py-[2px] rounded text-[10px] font-mono font-bold uppercase tracking-wider inline-block ${badgeClass}`}>
      {children}
    </span>
  );
};

export default Badge;
