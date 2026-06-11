import React from 'react';

const AnimatedWeapon = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      {/* Container for floating animation */}
      <div className="relative w-full max-w-[200px] aspect-[2/1] animate-[pulse_4s_ease-in-out_infinite] transform transition-transform hover:scale-110 hover:rotate-2">
        
        {/* Glow effect behind */}
        <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full scale-150 animate-pulse"></div>
        <div className="absolute inset-0 bg-cyan-500/10 blur-[20px] rounded-full scale-125 animate-[pulse_3s_ease-in-out_infinite_reverse]"></div>

        {/* SVG Weapon Model (Abstract Vandal/Phantom styling) */}
        <svg viewBox="0 0 400 150" className="w-full h-full drop-shadow-[0_0_10px_rgba(57,255,20,0.5)] relative z-10">
          <defs>
            <linearGradient id="weaponGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E232A" />
              <stop offset="50%" stopColor="#2D333B" />
              <stop offset="100%" stopColor="#121417" />
            </linearGradient>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#39FF14" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Main Body */}
          <path d="M50 80 L300 80 L320 60 L120 60 Z" fill="url(#weaponGrad)" stroke="#4A5568" strokeWidth="2" />
          
          {/* Stock */}
          <path d="M50 80 L20 120 L50 120 L80 80 Z" fill="url(#weaponGrad)" stroke="#4A5568" strokeWidth="2" />
          
          {/* Grip and Trigger */}
          <path d="M120 80 L110 110 L130 110 L140 80 Z" fill="#121417" stroke="#39FF14" strokeWidth="1" />
          <path d="M140 80 L160 80 L160 100 Z" fill="none" stroke="#22D3EE" strokeWidth="2" />

          {/* Barrel */}
          <path d="M300 80 L380 80 L380 70 L310 70 Z" fill="#1E232A" stroke="#4A5568" strokeWidth="2" />
          <path d="M380 75 L395 75" stroke="#39FF14" strokeWidth="4" strokeLinecap="round" className="animate-[pulse_1s_ease-in-out_infinite]" />

          {/* Glowing Accents */}
          <path d="M150 65 L280 65" stroke="url(#glowGrad)" strokeWidth="4" strokeLinecap="round" className="animate-[pulse_2s_ease-in-out_infinite]" />
          <circle cx="280" cy="65" r="4" fill="#39FF14" className="animate-[ping_2s_ease-in-out_infinite]" />
          
          {/* Magazine */}
          <path d="M180 80 L170 120 L200 125 L210 80 Z" fill="url(#weaponGrad)" stroke="#22D3EE" strokeWidth="1.5" />
          
          {/* Holographic Sight */}
          <path d="M200 60 L200 40 L220 40 L230 60 Z" fill="none" stroke="#39FF14" strokeWidth="2" />
          <circle cx="215" cy="50" r="3" fill="#22D3EE" className="animate-pulse" />
        </svg>

        {/* Floating particles around weapon */}
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-primary rounded-full animate-[ping_3s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[30%] right-[20%] w-1 h-1 bg-cyan-400 rounded-full animate-[ping_2s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-[40%] right-[5%] w-1 h-1 bg-primary rounded-full animate-[ping_4s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

export default AnimatedWeapon;
