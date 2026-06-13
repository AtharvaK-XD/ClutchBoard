import React, { useMemo } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Crosshair, Shield, Activity, TrendingUp, Gamepad2 } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const PlayerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { roster, matches } = useOutletContext();

  // Find player details
  const player = roster.find(p => p.id.toLowerCase() === id.toLowerCase());

  // Aggregate match performances for this player
  const playerMatches = useMemo(() => {
    if (!player) return [];
    const pm = [];
    matches.forEach(m => {
      const perf = m.rosterPerformance?.find(rp => rp.name.toLowerCase() === player.name.toLowerCase());
      if (perf) {
        pm.push({
          matchId: m.id,
          opponent: m.opponent,
          map: m.map,
          result: m.type,
          score: m.score,
          date: m.date,
          ...perf
        });
      }
    });
    return pm;
  }, [player, matches]);

  // Chart data formatting (ACS over time)
  const chartData = useMemo(() => {
    return playerMatches.slice().reverse().map((pm, i) => ({
      match: pm.opponent,
      acs: parseInt(pm.acs, 10),
      index: `M${i+1}`
    }));
  }, [playerMatches]);

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-on-surface-variant gap-4">
        <Shield className="w-12 h-12" />
        <h2 className="text-xl font-bold font-headline">Player Not Found</h2>
        <button onClick={() => navigate('/roster')} className="text-primary hover:underline font-mono text-sm">
          Return to Roster
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/roster')}
            className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center hover:bg-surface-variant transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-on-surface" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-primary bg-surface flex items-center justify-center font-bold text-primary text-2xl font-mono shadow-[0_0_15px_rgba(57,255,20,0.3)]">
              {player.position}
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline text-3xl font-extrabold text-on-background uppercase tracking-tight leading-none mb-1">
                {player.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-primary uppercase tracking-wider font-bold">{player.role}</span>
                <span className="text-on-surface-variant text-[10px]">•</span>
                <Badge type={player.type}>{player.type}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Top Agents</span>
          <div className="flex gap-2">
            {player.agents.map(agent => (
              <span key={agent} className="px-3 py-1 bg-surface-container border border-outline-variant rounded font-mono text-[11px] text-on-surface">
                {agent}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lifetime Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="LIFETIME KDA" value={player.kda} icon={Crosshair} glow={true} />
        <StatCard label="AVG COMBAT SCORE" value={player.acs} icon={Activity} />
        <StatCard label="HEADSHOT %" value={player.hs} icon={Crosshair} />
        <StatCard label="WIN RATE" value={player.win} icon={TrendingUp} />
      </motion.div>

      {/* Analytics Chart */}
      <motion.div variants={itemVariants} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 h-80 flex flex-col gap-4">
        <div>
          <h3 className="font-headline text-lg font-bold text-primary">Performance Trend (ACS)</h3>
          <p className="text-xs text-on-surface-variant font-mono">Combat score over recent official matches</p>
        </div>
        <div className="w-full flex-grow relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="index" stroke="#98A2AD" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#98A2AD" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 20', 'dataMax + 20']} />
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
              <Line 
                type="monotone" 
                dataKey="acs" 
                stroke="#39FF14" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#0A0A0A', stroke: '#39FF14', strokeWidth: 2 }} 
                activeDot={{ r: 6, fill: '#39FF14' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Match History Table */}
      <motion.div variants={itemVariants} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container/30">
          <div>
            <h3 className="font-headline text-lg font-bold text-on-surface">Recent Match History</h3>
            <p className="text-xs text-on-surface-variant font-mono">Detailed performance logs</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/50 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-outline-variant w-1/4">Opponent & Map</th>
                <th className="p-4 font-bold border-b border-outline-variant">Agent</th>
                <th className="p-4 font-bold border-b border-outline-variant text-center">ACS</th>
                <th className="p-4 font-bold border-b border-outline-variant text-center">K / D / A</th>
                <th className="p-4 font-bold border-b border-outline-variant text-center">KDA Ratio</th>
                <th className="p-4 font-bold border-b border-outline-variant text-center">HS%</th>
                <th className="p-4 font-bold border-b border-outline-variant text-right">Result</th>
              </tr>
            </thead>
            <tbody>
              {playerMatches.map((pm, idx) => (
                <tr key={pm.matchId} className="border-b border-outline-variant/30 hover:bg-surface-container/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Gamepad2 className={`w-4 h-4 ${pm.result === 'WIN' ? 'text-primary' : 'text-error'}`} />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-on-surface">vs {pm.opponent}</span>
                        <span className="font-mono text-[10px] text-on-surface-variant uppercase">{pm.map} • {pm.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-surface-variant rounded text-[10px] font-mono text-on-surface font-bold">
                      {pm.agent}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono text-sm font-bold text-primary">
                    {pm.acs}
                  </td>
                  <td className="p-4 text-center font-mono text-xs text-on-surface">
                    {pm.k} <span className="text-on-surface-variant">/</span> {pm.d} <span className="text-on-surface-variant">/</span> {pm.a}
                  </td>
                  <td className="p-4 text-center font-mono text-sm font-bold text-on-surface">
                    {pm.kda}
                  </td>
                  <td className="p-4 text-center font-mono text-sm text-on-surface-variant">
                    {pm.hs}
                  </td>
                  <td className="p-4 text-right">
                    <Badge type={pm.result}>{pm.score}</Badge>
                  </td>
                </tr>
              ))}
              {playerMatches.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-on-surface-variant font-mono text-sm">
                    No recent match data available for this player.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlayerProfile;
