import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Gamepad2, 
  Award, 
  Calendar, 
  LineChart, 
  Settings, 
  Radar,
  LogOut
} from 'lucide-react';

const MotionNavLink = motion(NavLink);

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/roster', label: 'Roster', icon: Users },
    { to: '/matches', label: 'Matches', icon: Gamepad2 },
    { to: '/rankings', label: 'Rankings', icon: Award },
    { to: '/schedule', label: 'Schedule', icon: Calendar },
    { to: '/insights', label: 'Insights', icon: LineChart },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-low border-r border-outline-variant flex flex-col p-6 gap-8 z-50">
      {/* Brand Info */}
      <div className="flex flex-col gap-1 select-none">
        <div className="flex items-center gap-2 hover-scale cursor-default">
          <Radar className="text-primary w-8 h-8 animate-pulse shrink-0" />
          <h1 className="font-headline text-2xl font-extrabold text-primary tracking-tighter">
            CLUTCHBOARD
          </h1>
        </div>
        <p className="text-xs font-medium text-on-surface-variant">Elite Esports Analytics</p>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <MotionNavLink
            key={item.to}
            to={item.to}
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-lg px-4 py-3 border-l-4 border-primary scale-95 transition-all font-mono text-[12px] font-bold uppercase tracking-wider'
                : 'flex items-center gap-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant px-4 py-3 rounded-lg transition-colors duration-200 font-mono text-[12px] font-bold uppercase tracking-wider'
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span>{item.label}</span>
          </MotionNavLink>
        ))}
      </nav>

      {/* Bottom sidebar section */}
      <div className="mt-auto flex flex-col gap-3 border-t border-outline-variant pt-6">
        <MotionNavLink
          to="/settings"
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={({ isActive }) =>
            isActive
              ? 'flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-lg px-4 py-3 border-l-4 border-primary scale-95 transition-all font-mono text-[12px] font-bold uppercase tracking-wider'
              : 'flex items-center gap-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant px-4 py-3 rounded-lg transition-colors duration-200 font-mono text-[12px] font-bold uppercase tracking-wider'
          }
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span>Settings</span>
        </MotionNavLink>
        
        <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg border border-outline-variant transition-colors hover:border-primary/50 group">
          <div className="flex items-center gap-3 truncate">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center font-mono text-primary text-[14px] font-bold shrink-0">
              CR
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-on-surface">Coach Red</span>
              <span className="font-mono text-[10px] text-on-surface-variant">Team Liquid Analyst</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            title="Log Out"
            className="text-on-surface-variant hover:text-error transition-colors p-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
