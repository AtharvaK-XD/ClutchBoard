import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Activity, 
  Gamepad2, 
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import { useToast } from '../contexts/ToastContext';

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// Mock chart data representing win/loss trends over 30 days
const chartData = [
  { day: 'Day 1', performance: 45 },
  { day: 'Day 5', performance: 50 },
  { day: 'Day 10', performance: 48 },
  { day: 'Day 15', performance: 68 },
  { day: 'Day 20', performance: 58 },
  { day: 'Day 25', performance: 78 },
  { day: 'Day 30', performance: 88 }
];

const Overview = () => {
  const navigate = useNavigate();
  const { matches, setSelectedMatchId } = useOutletContext();
  const { showToast } = useToast();
  
  // Live Match State Simulation
  const [liveScore, setLiveScore] = useState({ tl: 10, opp: 11 });
  const [killfeed, setKillfeed] = useState([]);
  const [roundTime, setRoundTime] = useState(45);

  useEffect(() => {
    // Round timer
    const timer = setInterval(() => {
      setRoundTime(prev => {
        if (prev <= 0) return 100; // Reset round
        return prev - 1;
      });
    }, 1000);

    // Random killfeed generator
    const playersTL = ['Nats', 'Sayf', 'TenZ', 'Jamppi', 'Redgar'];
    const playersFN = ['Boaster', 'Derke', 'Alfajer', 'Chronicle', 'Leo'];
    const weapons = ['Vandal', 'Phantom', 'Operator', 'Sheriff'];

    const killInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const isTLKiller = Math.random() > 0.5;
        const killer = isTLKiller ? playersTL[Math.floor(Math.random() * playersTL.length)] : playersFN[Math.floor(Math.random() * playersFN.length)];
        const victim = isTLKiller ? playersFN[Math.floor(Math.random() * playersFN.length)] : playersTL[Math.floor(Math.random() * playersTL.length)];
        const weapon = weapons[Math.floor(Math.random() * weapons.length)];
        const newKill = { id: Date.now(), killer, victim, weapon, team: isTLKiller ? 'TL' : 'FN' };
        
        setKillfeed(prev => [newKill, ...prev].slice(0, 4));
      }
    }, 3500);

    // Score updater
    const scoreInterval = setInterval(() => {
      setLiveScore(prev => {
        const t = Math.random() > 0.5 ? 'tl' : 'opp';
        return { ...prev, [t]: prev[t] + 1 };
      });
    }, 25000);

    return () => {
      clearInterval(timer);
      clearInterval(killInterval);
      clearInterval(scoreInterval);
    };
  }, []);

  const handleMatchDetails = (id) => {
    setSelectedMatchId(id);
    navigate('/matches');
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* KPI Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Win Rate */}
        <StatCard 
          label="WIN RATE" 
          value="68%" 
          icon={TrendingUp} 
          subtext="vs EMEA average (+8%)"
          glow={true}
        >
          <div className="flex items-end gap-[3px] h-10 pb-1">
            <div className="w-[5px] h-[15px] bg-primary/20 rounded-full"></div>
            <div className="w-[5px] h-[25px] bg-primary/45 rounded-full"></div>
            <div className="w-[5px] h-[32px] bg-primary/70 rounded-full"></div>
            <div className="w-[5px] h-[40px] bg-primary rounded-full"></div>
          </div>
        </StatCard>

        {/* Current Rank */}
        <StatCard 
          label="CURRENT RANK" 
          value="Immortal 3" 
          icon={Award} 
          subtext="Top 0.5% Regional"
        />

        {/* Streak */}
        <StatCard 
          label="STREAK" 
          value="4W" 
          icon={TrendingUp} 
          subtext="vs EMEA Elite Tier"
        />

        {/* Avg KDA */}
        <StatCard 
          label="AVG KDA" 
          value="1.42" 
          icon={Activity} 
          subtext="+0.12 vs last split"
        />

        {/* Team Form */}
        <StatCard 
          label="TEAM FORM" 
          value="4 - 1" 
          icon={Clock} 
          subtext="LAST 5 MATCHES"
        >
          <div className="flex gap-1 mt-2">
            <div className="w-6 h-6 rounded bg-primary/20 text-primary border border-primary/30 font-mono font-bold text-xs flex items-center justify-center select-none">W</div>
            <div className="w-6 h-6 rounded bg-primary/20 text-primary border border-primary/30 font-mono font-bold text-xs flex items-center justify-center select-none">W</div>
            <div className="w-6 h-6 rounded bg-error/20 text-error border border-error/30 font-mono font-bold text-xs flex items-center justify-center select-none">L</div>
            <div className="w-6 h-6 rounded bg-primary/20 text-primary border border-primary/30 font-mono font-bold text-xs flex items-center justify-center select-none">W</div>
            <div className="w-6 h-6 rounded bg-primary/20 text-primary border border-primary/30 font-mono font-bold text-xs flex items-center justify-center select-none">W</div>
          </div>
        </StatCard>
      </motion.div>

      {/* Bento Grid Layout */}
      <motion.div variants={itemVariants} className="grid grid-cols-12 gap-4">
        {/* Performance Index Card */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col justify-between card-hover-fx">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
            <div>
              <h3 className="font-headline text-lg text-primary font-bold">Performance Index</h3>
              <p className="text-xs text-on-surface-variant">Win/Loss trends - Last 30 Days</p>
            </div>
            <div className="flex bg-surface-container rounded border border-outline-variant/30">
              <button onClick={() => showToast('Filtering performance dataset: 7D', 'info')} className="px-3 py-1 text-on-surface-variant hover:text-on-surface font-mono text-[9px] font-bold uppercase rounded">7D</button>
              <button className="px-3 py-1 bg-surface-variant text-on-surface font-mono text-[9px] font-bold uppercase rounded shadow">30D</button>
              <button className="px-3 py-1 text-on-surface-variant hover:text-on-surface font-mono text-[9px] font-bold uppercase rounded">All</button>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="w-full h-64 border border-outline-variant bg-surface/50 rounded-lg p-2 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#39FF14" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="#98A2AD" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#98A2AD" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  domain={[30, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#121417', 
                    borderColor: '#2D333B', 
                    borderRadius: '8px',
                    color: '#E8ECEF',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="#39FF14" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#chartGlow)" 
                  className="drop-shadow-[0_0_6px_rgba(57,255,20,0.4)]"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Match Spotlight Card */}
        <motion.div 
          whileHover={{ scale: 1.01, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="col-span-12 lg:col-span-4 bg-surface-container-lowest border-2 border-primary rounded-lg p-6 relative flex flex-col justify-between overflow-hidden glow-cyan hover-glow"
        >
          {/* Badge top-right */}
          <div className="absolute top-0 right-0 bg-error text-white font-mono text-[9px] font-bold px-3 py-1 rounded-bl-lg tracking-wider uppercase select-none animate-pulse">
            LIVE MATCH
          </div>

          <div className="mt-2">
            <span className="text-secondary font-mono text-[10px] tracking-wider block mb-1 uppercase select-none">MATCH SPOTLIGHT</span>
            <h3 className="font-headline text-xl text-on-background font-extrabold uppercase">Upcoming vs Fnatic</h3>
          </div>

          {/* Team Logos & VS Area */}
          <div className="flex items-center justify-around my-6">
            <div className="flex flex-col items-center gap-1 select-none">
              <div className="w-12 h-12 bg-surface rounded-lg border border-outline-variant flex items-center justify-center font-bold text-primary font-mono text-lg">TL</div>
              <span className="font-mono text-[11px] text-on-surface">LIQUID</span>
            </div>
            <div className="font-mono text-on-surface-variant italic text-xs select-none">VS</div>
            <div className="flex flex-col items-center gap-1 select-none">
              <div className="w-12 h-12 bg-surface rounded-lg border border-outline-variant flex items-center justify-center font-bold text-error font-mono text-lg">FN</div>
              <span className="font-mono text-[11px] text-on-surface">FNATIC</span>
            </div>
          </div>

          {/* Live Match Telemetry Nesting */}
          <div className="bg-surface-container border border-outline-variant rounded-lg p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="text-[10px] font-mono text-on-surface-variant tracking-wider uppercase">Live Score</div>
              <div className="text-[10px] font-mono text-error uppercase font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping absolute"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-error relative"></span> Live
              </div>
            </div>
            
            <div className="flex justify-between items-center bg-surface-container-highest rounded px-4 py-2 border border-outline-variant/30">
              <span className="font-mono text-3xl text-primary font-extrabold">{liveScore.tl}</span>
              <span className="font-mono text-xs text-on-surface-variant uppercase">{roundTime}s</span>
              <span className="font-mono text-3xl text-error font-extrabold">{liveScore.opp}</span>
            </div>

            <div className="flex flex-col gap-1 mt-1 h-[88px] overflow-hidden relative">
              <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-surface-container to-transparent z-10 pointer-events-none"></div>
              <AnimatePresence>
                {killfeed.map(k => (
                  <motion.div 
                    key={k.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-between items-center text-[10px] font-mono bg-surface-container-highest/50 px-2 py-1.5 rounded border border-outline-variant/20"
                  >
                    <span className={`font-bold ${k.team === 'TL' ? 'text-primary' : 'text-error'}`}>{k.killer}</span>
                    <span className="text-on-surface-variant text-[8px] uppercase">[{k.weapon}]</span>
                    <span className={`font-bold ${k.team === 'TL' ? 'text-error' : 'text-primary'}`}>{k.victim}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Recent Matches Table */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col gap-4 card-hover-fx">
          <div className="flex justify-between items-center">
            <h3 class="font-headline text-lg text-on-surface font-bold">Recent Matches</h3>
            <button 
              onClick={() => navigate('/matches')} 
              className="text-primary font-mono text-[10px] hover:underline uppercase tracking-wider font-bold"
            >
              View All History
            </button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-3">
            {matches.slice(0, 3).map((m) => (
              <motion.div 
                key={m.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01, x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="grid grid-cols-12 items-center p-4 bg-surface-container border border-outline-variant rounded hover:bg-surface-container-high transition-colors gap-2"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <Gamepad2 className={`w-[18px] h-[18px] ${m.type === 'WIN' ? 'text-primary' : 'text-error'}`} />
                  <span className="font-bold text-sm text-on-surface select-none">vs {m.opponent}</span>
                </div>
                <div className={`col-span-3 font-mono text-sm font-bold ${m.type === 'WIN' ? 'text-primary' : 'text-error'}`}>
                  {m.score}
                </div>
                <div className="col-span-2 font-mono text-xs text-on-surface-variant uppercase select-none">
                  {m.map}
                </div>
                <div className="col-span-1">
                  <Badge type={m.type}>{m.type}</Badge>
                </div>
                <div className="col-span-2 text-right">
                  <button 
                    onClick={() => handleMatchDetails(m.id)}
                    className="text-primary font-mono text-xs border border-primary/30 px-3 py-1 rounded hover:bg-primary/10 transition-all font-bold"
                  >
                    DETAILS
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Player Spotlight Panels */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          {/* MVP Card */}
          <motion.div 
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex-1 relative overflow-hidden group flex flex-col justify-between gap-4 transition-all hover:border-primary/50 hover-glow"
          >
            <div className="absolute -right-4 -bottom-4 select-none opacity-5 transition-transform group-hover:scale-110">
              <Award className="w-[120px] h-[120px] text-primary" />
            </div>
            
            <div>
              <span className="text-secondary font-mono text-[10px] tracking-wider block mb-1 uppercase select-none">PLAYER OF THE WEEK</span>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-16 h-16 rounded-full border-2 border-primary bg-surface flex items-center justify-center font-bold text-primary text-xl font-mono">Na</div>
                <div>
                  <h4 className="font-headline text-lg text-primary font-extrabold leading-tight">Nats</h4>
                  <Badge type="SENTINEL">Sentinel</Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-outline-variant/30 pt-3">
              <div className="flex-1 bg-surface-container/50 border border-outline-variant/30 rounded p-2">
                <div className="text-[9px] font-mono text-on-surface-variant uppercase select-none">KDA RATIO</div>
                <div className="font-mono text-sm font-bold text-primary mt-1">1.85</div>
              </div>
              <div className="flex-1 bg-surface-container/50 border border-outline-variant/30 rounded p-2">
                <div className="text-[9px] font-mono text-on-surface-variant uppercase select-none">TOP AGENT</div>
                <div className="font-mono text-sm font-bold text-on-surface mt-1">Cypher</div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/roster')} 
              className="w-full py-2.5 bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] tracking-wider uppercase rounded-lg hover:bg-primary/20 transition-all font-bold mt-2"
            >
              VIEW PROFILE
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
