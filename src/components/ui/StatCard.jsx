import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, subtext, glow = false, children }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between h-32 transition-colors hover:border-primary/50 cursor-pointer ${glow ? 'glow-cyan' : ''}`}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-[12px] font-bold text-on-surface-variant tracking-wider uppercase">{label}</span>
        {Icon && (
          <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
            <Icon className={`w-[18px] h-[18px] transition-colors ${glow ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`} />
          </motion.div>
        )}
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
    </motion.div>
  );
};

export default StatCard;
