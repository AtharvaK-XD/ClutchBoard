import React from 'react';

const AnimatedMap = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden perspective-[1000px] ${className}`}>
      {/* Container to rotate in 3D */}
      <div className="relative w-[200px] h-[200px] transform-style-3d animate-[spin_20s_linear_infinite] rotate-x-[60deg] rotate-z-[45deg]">
        
        {/* Base Layer - Floor */}
        <div className="absolute inset-0 bg-surface-container-lowest border-2 border-primary/40 rounded-lg shadow-[0_0_20px_rgba(57,255,20,0.2)]">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>

        {/* 3D Walls and Structures */}
        {/* Site A */}
        <div className="absolute top-[20px] left-[20px] w-[60px] h-[60px] bg-primary/20 border border-primary/50 translate-z-[10px] transform-style-3d">
          <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-primary text-xl translate-z-[15px] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-pulse">A</div>
        </div>

        {/* Site B */}
        <div className="absolute bottom-[20px] right-[20px] w-[60px] h-[60px] bg-cyan-500/20 border border-cyan-500/50 translate-z-[10px] transform-style-3d">
          <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-cyan-400 text-xl translate-z-[15px] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" style={{ animationDelay: '1s' }}>B</div>
        </div>

        {/* Mid Structure */}
        <div className="absolute top-[80px] left-[80px] w-[40px] h-[40px] bg-surface-container border border-outline-variant translate-z-[20px] transform-style-3d shadow-[-5px_5px_15px_rgba(0,0,0,0.5)]"></div>

        {/* Connector Walls */}
        <div className="absolute top-[95px] left-[20px] w-[40px] h-[10px] bg-outline-variant/30 translate-z-[10px]"></div>
        <div className="absolute top-[20px] left-[95px] w-[10px] h-[40px] bg-outline-variant/30 translate-z-[10px]"></div>

        {/* Glowing Player Dots */}
        <div className="absolute top-[50px] left-[40px] w-2 h-2 rounded-full bg-red-500 translate-z-[5px] drop-shadow-[0_0_4px_red] animate-[ping_2s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[40px] left-[100px] w-2 h-2 rounded-full bg-primary translate-z-[5px] drop-shadow-[0_0_4px_#39FF14] animate-[ping_2s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-[50px] right-[50px] w-2 h-2 rounded-full bg-primary translate-z-[5px] drop-shadow-[0_0_4px_#39FF14] animate-[ping_2s_ease-in-out_infinite]" style={{ animationDelay: '1.2s' }}></div>

        {/* Hovering Hologram Rings */}
        <div className="absolute inset-[-20px] rounded-full border border-primary/20 translate-z-[30px] animate-[spin_10s_linear_infinite_reverse]"></div>
        <div className="absolute inset-[-40px] rounded-full border border-cyan-500/20 translate-z-[40px] animate-[spin_15s_linear_infinite]"></div>
      </div>
      
      {/* Inline styles for custom 3D utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .translate-z-\\[10px\\] {
          transform: translateZ(10px);
        }
        .translate-z-\\[15px\\] {
          transform: translateZ(15px);
        }
        .translate-z-\\[20px\\] {
          transform: translateZ(20px);
        }
        .translate-z-\\[30px\\] {
          transform: translateZ(30px);
        }
        .translate-z-\\[40px\\] {
          transform: translateZ(40px);
        }
        .translate-z-\\[5px\\] {
          transform: translateZ(5px);
        }
        .rotate-x-\\[60deg\\] {
          transform: rotateX(60deg) rotateZ(45deg);
        }
      `}} />
    </div>
  );
};

export default AnimatedMap;
