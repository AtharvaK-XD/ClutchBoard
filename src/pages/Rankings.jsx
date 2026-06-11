import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ChevronRight, 
  Award,
  Zap
} from 'lucide-react';
import Badge from '../components/ui/Badge';

const Rankings = () => {
  const { rankings } = useOutletContext();
  const [regionFilter, setRegionFilter] = useState('EMEA');

  // Filter rankings by region
  const filteredRankings = rankings.filter(team => {
    return regionFilter === 'Global' || team.region === regionFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-6">
        <div>
          <h2 className="font-headline text-2xl font-extrabold text-primary uppercase select-none">Global Power Rankings</h2>
          <p className="text-xs text-on-surface-variant">Unified leaderboard of all competing professional teams</p>
        </div>
        
        {/* Region Filter Tabs */}
        <div className="flex gap-1 bg-surface-container border border-outline-variant p-[3px] rounded-lg">
          {['Global', 'EMEA', 'Americas', 'Pacific'].map(region => {
            const isActive = regionFilter === region;
            return (
              <button 
                key={region}
                onClick={() => setRegionFilter(region)}
                className={`px-4 py-1.5 font-mono text-[9px] font-bold uppercase rounded transition-all ${
                  isActive 
                    ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(57,255,20,0.25)]' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Leaderboard Table */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="p-6 border-b border-outline-variant bg-surface-container/30 flex justify-between items-center select-none">
            <h3 className="font-headline text-md text-primary font-bold">{regionFilter} Elite Division</h3>
            <span className="text-[9px] font-mono text-on-surface-variant uppercase">Live Seed System</span>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant">
                  <th className="px-6 py-3 font-mono text-[9px] text-on-surface-variant uppercase font-bold">Rank</th>
                  <th className="px-6 py-3 font-mono text-[9px] text-on-surface-variant uppercase font-bold">Team</th>
                  <th className="px-6 py-3 font-mono text-[9px] text-on-surface-variant uppercase font-bold">Win Rate</th>
                  <th className="px-6 py-3 font-mono text-[9px] text-on-surface-variant uppercase font-bold">Points</th>
                  <th className="px-6 py-3 font-mono text-[9px] text-on-surface-variant uppercase font-bold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredRankings.map((t) => {
                  const isLiquid = t.team === 'Team Liquid';
                  
                  return (
                    <tr 
                      key={t.team}
                      className={
                        isLiquid
                          ? 'bg-primary/5 border-l-4 border-primary transition-all duration-150'
                          : 'border-b border-outline-variant hover:bg-surface-container transition-colors'
                      }
                    >
                      <td className="font-mono text-primary px-6 py-4 font-bold text-sm select-none">
                        {t.rank}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center font-mono text-[10px] text-on-surface-variant font-bold border border-outline-variant/30 select-none">
                          {t.team.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-sm text-on-surface truncate">{t.team}</span>
                      </td>
                      <td className="font-mono text-primary px-6 py-4 font-bold text-xs">
                        {t.winRate}
                      </td>
                      <td className="font-mono text-on-surface px-6 py-4 font-bold text-xs">
                        {t.points}
                      </td>
                      <td className="px-6 py-4">
                        {t.trend === 'up' && <TrendingUp className="text-primary w-4 h-4" />}
                        {t.trend === 'down' && <TrendingDown className="text-error w-4 h-4" />}
                        {t.trend === 'stable' && <Minus className="text-on-surface-variant w-4 h-4" />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar panels */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Liquid Spotlight */}
          <div className="bg-surface-container-lowest border-2 border-primary rounded-xl p-6 glow-cyan flex flex-col gap-3 relative overflow-hidden select-none">
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              <Award className="w-[100px] h-[100px] text-primary" />
            </div>
            
            <div className="flex justify-between items-start">
              <h4 className="font-headline text-md text-on-surface font-extrabold uppercase">Liquid In Focus</h4>
              <Badge type="STRENGTH">#1 EMEA</Badge>
            </div>
            
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-xs text-on-surface-variant">Active stats index:</span>
              <div className="grid grid-cols-3 gap-2 text-center mt-1.5">
                <div className="bg-surface-container p-2 rounded border border-outline-variant/30">
                  <span className="text-[8px] font-mono text-on-surface-variant block uppercase">Win Rate</span>
                  <span className="font-mono text-xs text-primary font-bold">76.0%</span>
                </div>
                <div className="bg-surface-container p-2 rounded border border-outline-variant/30">
                  <span className="text-[8px] font-mono text-on-surface-variant block uppercase">Points</span>
                  <span className="font-mono text-xs text-on-surface font-bold">2,890</span>
                </div>
                <div className="bg-surface-container p-2 rounded border border-outline-variant/30">
                  <span className="text-[8px] font-mono text-on-surface-variant block uppercase">Streak</span>
                  <span className="font-mono text-xs text-primary font-bold">4W</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rank Movements */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <h4 className="font-headline text-sm text-on-surface font-bold flex items-center gap-2 uppercase select-none">
              <Zap className="text-primary w-4 h-4" />
              <span>Rank Movements</span>
            </h4>
            
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center p-2.5 bg-surface-container/50 border border-outline-variant/30 rounded text-xs select-none">
                <span className="font-bold text-on-surface">Fnatic</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-primary font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+2 positions</span>
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-surface-container/50 border border-outline-variant/30 rounded text-xs select-none">
                <span className="font-bold text-on-surface">NAVI</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-error font-bold">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>-1 position</span>
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-surface-container/50 border border-outline-variant/30 rounded text-xs select-none">
                <span className="font-bold text-on-surface">Team Vitality</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-primary font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+1 position</span>
                </span>
              </div>
            </div>
          </div>

          {/* Tournament Division */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-wider select-none">Tournament Division</h4>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => alert('Filtering system for VCT Champions division...')} 
                className="w-full py-2.5 bg-surface-container border border-outline-variant hover:border-primary/50 text-left px-4 rounded font-mono text-xs text-on-surface hover:text-primary transition-all flex justify-between items-center"
              >
                <span>VCT CHAMPIONS</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => alert('Filtering system for Masters Tokyo...')} 
                className="w-full py-2.5 bg-surface-container border border-outline-variant hover:border-primary/50 text-left px-4 rounded font-mono text-xs text-on-surface hover:text-primary transition-all flex justify-between items-center"
              >
                <span>MASTERS TOKYO</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => alert('Filtering system for VCT EMEA...')} 
                className="w-full py-2.5 bg-surface-container border border-outline-variant hover:border-primary/50 text-left px-4 rounded font-mono text-xs text-on-surface hover:text-primary transition-all flex justify-between items-center"
              >
                <span>VCT EMEA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Rankings;
