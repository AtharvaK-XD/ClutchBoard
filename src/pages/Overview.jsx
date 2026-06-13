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
import { motion } from 'framer-motion';
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
  
  // Countdown state: 2 hours, 15 minutes, 0 seconds
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 15, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else {
          if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            if (prev.hours > 0) {
              return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
            } else {
              // Reset loop for simulation persistence
              return { hours: 2, minutes: 15, seconds: 0 };
            }
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
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
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col justify-between">
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
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border-2 border-primary rounded-lg p-6 relative flex flex-col justify-between overflow-hidden glow-cyan">
          {/* Badge top-right */}
          <div className="absolute top-0 right-0 bg-primary text-black font-mono text-[9px] font-bold px-3 py-1 rounded-bl-lg tracking-wider uppercase select-none">
            LIVE IN {countdown.hours}H {countdown.minutes}M
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

          {/* Countdown card nesting */}
          <div className="bg-surface-container border border-outline-variant rounded-lg p-4">
            <div className="text-[10px] font-mono text-on-surface-variant tracking-wider uppercase mb-2">VCT EMEA: Stage 2</div>
            <div className="flex gap-2">
              <div className="w-full flex-1 flex flex-col items-center p-2 bg-surface-container-highest rounded border border-outline-variant/30">
                <span className="font-mono text-xl text-primary font-extrabold">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="text-[8px] font-mono text-on-surface-variant uppercase">HOURS</span>
              </div>
              <div className="w-full flex-1 flex flex-col items-center p-2 bg-surface-container-highest rounded border border-outline-variant/30">
                <span className="font-mono text-xl text-primary font-extrabold">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="text-[8px] font-mono text-on-surface-variant uppercase">MIN</span>
              </div>
              <div className="w-full flex-1 flex flex-col items-center p-2 bg-surface-container-highest rounded border border-outline-variant/30 animate-pulse">
                <span className="font-mono text-xl text-primary font-extrabold">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="text-[8px] font-mono text-on-surface-variant uppercase">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Matches Table */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 class="font-headline text-lg text-on-surface font-bold">Recent Matches</h3>
            <button 
              onClick={() => navigate('/matches')} 
              className="text-primary font-mono text-[10px] hover:underline uppercase tracking-wider font-bold"
            >
              View All History
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {matches.slice(0, 3).map((m) => (
              <div 
                key={m.id}
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
              </div>
            ))}
          </div>
        </div>

        {/* Player Spotlight Panels */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          {/* MVP Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex-1 relative overflow-hidden group flex flex-col justify-between gap-4 transition-all hover:border-primary/50">
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
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
