import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ArrowRightLeft, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ searchVal, onSearchChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showTeamSwitcher, setShowTeamSwitcher] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchInput = (e) => {
    const val = e.target.value;
    onSearchChange(val);
    if (location.pathname !== '/roster' && val.trim() !== '') {
      navigate('/roster');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const popoverVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
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
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowTeamSwitcher(false); setShowProfileMenu(false); }}
            className="relative w-8 h-8 rounded-full hover:bg-surface-variant flex items-center justify-center text-on-surface transition-colors hover-scale"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                variants={popoverVariants} initial="hidden" animate="visible" exit="exit"
                className="absolute top-12 right-0 w-64 bg-surface-container-high border border-outline-variant rounded-lg shadow-xl overflow-hidden z-50"
              >
                <div className="p-3 border-b border-outline-variant bg-surface-container-highest">
                  <h3 className="font-mono text-xs font-bold uppercase">Notifications</h3>
                </div>
                <div className="flex flex-col max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-surface-variant cursor-pointer border-b border-outline-variant/50">
                    <p className="text-sm text-on-surface">Scrim vs NAVI starts in 15m</p>
                    <p className="text-[10px] text-primary font-mono mt-1">NEW ALERT</p>
                  </div>
                  <div className="p-3 hover:bg-surface-variant cursor-pointer">
                    <p className="text-sm text-on-surface">Jamppi uploaded a new VOD</p>
                    <p className="text-[10px] text-on-surface-variant font-mono mt-1">2 HOURS AGO</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-px bg-outline-variant mx-1"></div>
        
        <div className="relative">
          <button 
            onClick={() => { setShowTeamSwitcher(!showTeamSwitcher); setShowNotifications(false); setShowProfileMenu(false); }} 
            className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all btn-animated"
          >
            <span>TEAM SWITCHER</span>
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>

          <AnimatePresence>
            {showTeamSwitcher && (
              <motion.div 
                variants={popoverVariants} initial="hidden" animate="visible" exit="exit"
                className="absolute top-10 right-0 w-48 bg-surface-container-high border border-outline-variant rounded-lg shadow-xl overflow-hidden z-50"
              >
                <div className="flex flex-col">
                  <button className="flex items-center gap-3 p-3 hover:bg-surface-variant transition-colors text-left text-sm text-primary font-bold border-l-2 border-primary bg-surface-variant/50">
                    Team Liquid
                  </button>
                  <button className="flex items-center gap-3 p-3 hover:bg-surface-variant transition-colors text-left text-sm text-on-surface">
                    Fnatic
                  </button>
                  <button className="flex items-center gap-3 p-3 hover:bg-surface-variant transition-colors text-left text-sm text-on-surface">
                    NAVI
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <div 
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); setShowTeamSwitcher(false); }}
            className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden select-none cursor-pointer hover:border-primary transition-colors hover-scale"
          >
            <div className="w-full h-full bg-gradient-to-tr from-primary/30 to-primary flex items-center justify-center text-on-primary font-bold text-[13px] font-mono">
              CR
            </div>
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                variants={popoverVariants} initial="hidden" animate="visible" exit="exit"
                className="absolute top-12 right-0 w-48 bg-surface-container-high border border-outline-variant rounded-lg shadow-xl overflow-hidden z-50"
              >
                <div className="p-3 border-b border-outline-variant bg-surface-container-highest flex flex-col">
                  <span className="font-bold text-sm text-on-surface">Coach Red</span>
                  <span className="text-[10px] text-on-surface-variant font-mono">Team Liquid Analyst</span>
                </div>
                <div className="flex flex-col py-1">
                  <button onClick={() => navigate('/settings')} className="flex items-center gap-2 px-4 py-2 hover:bg-surface-variant text-sm text-on-surface text-left">
                    <Settings className="w-4 h-4" /> Account Settings
                  </button>
                  <button onClick={() => navigate('/roster')} className="flex items-center gap-2 px-4 py-2 hover:bg-surface-variant text-sm text-on-surface text-left">
                    <User className="w-4 h-4" /> My Roster
                  </button>
                  <div className="h-px bg-outline-variant my-1"></div>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 hover:bg-error/10 text-sm text-error text-left">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
