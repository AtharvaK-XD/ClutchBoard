import React from 'react';

const GlassPanel = ({ children, className = '', glow = false, glowColor = 'cyan' }) => {
  const glowClass = glow 
    ? (glowColor === 'purple' ? 'glow-purple' : 'glow-cyan')
    : '';

  return (
    <div className={`glass-panel rounded-xl p-6 ${glowClass} ${className}`}>
      {children}
    </div>
  );
};

export default GlassPanel;
