import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ArrowRightLeft } from 'lucide-react';

const Header = ({ searchVal, onSearchChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchInput = (e) => {
    const val = e.target.value;
    onSearchChange(val);
    if (location.pathname !== '/roster' && val.trim() !== '') {
      navigate('/roster');
    }
  };

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-surface/85 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-8 z-40">
      {/* Left side */}
      <div className="flex items-center gap-6">
        <div className="relative w-64 flex items-center">
          <Search className="absolute left-3 text-on-surface-variant w-[18px] h-[18px] pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search roster..."
            value={searchVal}
            onChange={handleSearchInput}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-full pl-10 pr-4 py-1 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-background transition-all"
          />
        </div>
        <div className="h-6 w-px bg-outline-variant"></div>
        <div className="flex items-center gap-2 select-none">
          <span className="font-mono text-xs text-primary font-bold border-b-2 border-primary pb-0.5">
            VALORANT
          </span>
          <span className="text-on-surface-variant text-[10px] font-mono">/</span>
          <span className="font-mono text-xs text-on-surface-variant">TEAM LIQUID</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => alert('Viewing system notifications...')}
          className="relative w-8 h-8 rounded-full hover:bg-surface-variant flex items-center justify-center text-on-surface transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
        </button>
        <div className="h-8 w-px bg-outline-variant mx-1"></div>
        
        <button 
          onClick={() => alert('Switching active esports teams...')} 
          className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all"
        >
          <span>TEAM SWITCHER</span>
          <ArrowRightLeft className="w-3.5 h-3.5" />
        </button>

        <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden select-none">
          <div className="w-full h-full bg-gradient-to-tr from-primary/30 to-primary flex items-center justify-center text-on-primary font-bold text-[13px] font-mono">
            TL
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
