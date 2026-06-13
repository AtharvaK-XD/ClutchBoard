import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Calendar,
  ListTodo,
  Play,
  Tv
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '../components/ui/Badge';
import GlassPanel from '../components/ui/GlassPanel';
import { useToast } from '../contexts/ToastContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
};

const Schedule = () => {
  const { scheduleEvents, checklist, setChecklist } = useOutletContext();
  const [activeDayId, setActiveDayId] = useState(3); // Default Wed Aug 23
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Handle checking/unchecking tasks
  const handleToggleChecklist = (id) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  // Find active event details
  const activeDay = scheduleEvents.find(d => d.id === activeDayId) || scheduleEvents[2];
  const primaryEvent = activeDay.events[0] || { title: 'Rest Day', time: 'All Day', type: 'rest' };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-6">
        <div>
          <h2 className="font-headline text-2xl font-extrabold text-primary uppercase select-none">Operational Schedule</h2>
          <p className="text-xs text-on-surface-variant">Strategic calendar and team training schedules</p>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveDayId(3)} 
            className="bg-surface-container border border-outline-variant px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold text-on-surface hover:text-primary hover:border-primary/50 transition-colors uppercase mr-1"
          >
            Today
          </button>
          <button 
            onClick={() => showToast('Loaded previous week calendar.', 'info')} 
            className="w-8 h-8 rounded-full border border-outline-variant hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center text-on-surface-variant"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-on-surface font-bold bg-surface-container border border-outline-variant px-3 py-1.5 rounded-lg select-none">
            Aug 21 – Aug 27, 2026
          </span>
          <button 
            onClick={() => showToast('Loaded next week calendar.', 'info')} 
            className="w-8 h-8 rounded-full border border-outline-variant hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center text-on-surface-variant"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Weekly Strip */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {scheduleEvents.map(day => {
          const isToday = day.id === activeDayId;
          
          return (
            <div 
              key={day.id}
              onClick={() => setActiveDayId(day.id)}
              className={`border rounded-xl p-3 flex flex-col gap-3 min-h-[220px] cursor-pointer select-none transition-all ${
                isToday 
                  ? 'border-primary bg-primary/10 glow-cyan' 
                  : 'border-outline-variant bg-surface/30 hover:border-outline'
              }`}
            >
              <div className="text-center border-b border-outline-variant/30 pb-1.5">
                <span className="font-mono text-[9px] text-on-surface-variant block uppercase font-bold">{day.dayName}</span>
                <span className="font-headline text-md text-on-surface font-extrabold block mt-0.5">{day.dateNum}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {day.events.map((ev, idx) => (
                  <div 
                    key={idx}
                    className="bg-surface-container-lowest border border-outline-variant rounded p-2 flex flex-col gap-1 shrink-0"
                  >
                    <span className="font-mono text-[8px] text-on-surface-variant font-bold leading-none">{ev.time}</span>
                    <span className="text-[10px] text-on-surface font-bold leading-tight truncate">{ev.title}</span>
                    <Badge type={ev.type}>{ev.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Detail Grid */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Event Detail panel */}
        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8">
          <GlassPanel className="space-y-5">
            <div className="flex justify-between items-start border-b border-outline-variant/30 pb-4">
              <div>
                <span className="font-mono text-[9px] font-bold text-primary tracking-wider uppercase block mb-1">
                  {primaryEvent.type} session
                </span>
                <h3 className="font-headline text-xl text-on-background font-extrabold">{primaryEvent.title}</h3>
                <span className="font-mono text-xs text-on-surface-variant block mt-1.5">
                  {primaryEvent.time} CET — Active server queue
                </span>
              </div>
              <Badge type={primaryEvent.type === 'rest' ? 'WARNING' : 'READY'}>
                {primaryEvent.type === 'rest' ? 'Inactive' : 'Ready'}
              </Badge>
            </div>

            {/* Objectives */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-wider block">
                Tactical Objectives
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-on-surface/90">
                <li className="flex items-start gap-2 p-2 bg-surface-container/30 rounded border border-outline-variant/20">
                  <CheckCircle2 className="text-primary w-4.5 h-4.5 shrink-0 mt-0.5" />
                  <span>Test new B-site entry strategy vs Fnatic default setup</span>
                </li>
                <li className="flex items-start gap-2 p-2 bg-surface-container/30 rounded border border-outline-variant/20">
                  <CheckCircle2 className="text-primary w-4.5 h-4.5 shrink-0 mt-0.5" />
                  <span>Evaluate player agent pools — swap Nats onto Killjoy</span>
                </li>
                <li className="flex items-start gap-2 p-2 bg-surface-container/30 rounded border border-outline-variant/20">
                  <CheckCircle2 className="text-primary w-4.5 h-4.5 shrink-0 mt-0.5" />
                  <span>Practice economy management guidelines in eco rounds</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-4 border-t border-outline-variant/30 pt-4">
              <button 
                onClick={() => showToast('Simulation Session Initialized.', 'success')} 
                className="bg-primary text-black font-mono text-[10px] font-bold py-2.5 px-6 rounded-lg hover:opacity-90 active:scale-95 transition-all uppercase flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Begin Session</span>
              </button>
              <button 
                onClick={() => navigate('/matches')} 
                className="border border-outline-variant hover:border-primary/50 text-on-surface hover:text-primary font-mono text-[10px] font-bold py-2.5 px-6 rounded-lg transition-all uppercase flex items-center gap-1.5"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>View VOD</span>
              </button>
            </div>
            
            {/* Map bans */}
            <div className="bg-surface-container/40 border border-outline-variant/40 rounded p-2.5 flex justify-between items-center font-mono text-[9px] text-on-surface-variant select-none">
              <span>Picks: Haven, Split | Bans: Breeze, Fracture</span>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Preparation Checklists */}
        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center select-none">
              <h4 className="font-headline text-sm text-on-surface font-bold uppercase flex items-center gap-1.5">
                <ListTodo className="text-primary w-4 h-4" />
                <span>Preparation List</span>
              </h4>
              <span className="text-[9px] font-mono text-on-surface-variant uppercase">Checklist</span>
            </div>
            
            <div className="flex flex-col gap-2.5">
              {checklist.map(item => (
                <label 
                  key={item.id}
                  className="flex items-center gap-3 p-2 bg-surface-container/50 border border-outline-variant/30 rounded-lg hover:border-primary/45 cursor-pointer transition-colors select-none"
                >
                  <input 
                    type="checkbox" 
                    checked={item.checked} 
                    onChange={() => handleToggleChecklist(item.id)}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${
                    item.checked 
                      ? 'bg-primary border-primary text-black' 
                      : 'border-outline-variant text-transparent'
                  }`}>
                    {item.checked && <CheckCircle2 className="w-4 h-4 stroke-[3px]" />}
                  </div>
                  <span className={`text-xs text-on-surface ${item.checked ? 'line-through text-on-surface-variant' : ''}`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Upcoming Schedule list */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-wider select-none">Upcoming Schedule</h4>
            <div className="flex flex-col gap-2.5">
              <div 
                onClick={() => navigate('/matches')}
                className="flex justify-between items-center p-3 bg-surface-container/50 border border-outline-variant/30 rounded text-xs select-none hover:border-primary/30 cursor-pointer transition-all"
              >
                <div>
                  <span className="font-mono text-[9px] text-primary block font-bold">Aug 26, 20:00</span>
                  <span className="font-bold text-on-surface block mt-0.5">vs NAVI</span>
                </div>
                <ChevronRight className="text-on-surface-variant w-4 h-4" />
              </div>
              <div 
                onClick={() => navigate('/matches')}
                className="flex justify-between items-center p-3 bg-surface-container/50 border border-outline-variant/30 rounded text-xs select-none hover:border-primary/30 cursor-pointer transition-all"
              >
                <div>
                  <span className="font-mono text-[9px] text-on-surface-variant block font-bold">Sep 02, 18:30</span>
                  <span className="font-bold text-on-surface block mt-0.5">vs Team Vitality</span>
                </div>
                <ChevronRight className="text-on-surface-variant w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Schedule;
