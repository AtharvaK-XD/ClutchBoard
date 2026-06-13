import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Search, X, ShieldAlert, Cpu } from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer 
} from 'recharts';
import Badge from '../components/ui/Badge';

const compData = [
  { subject: 'ATTACK', A: 85, fullMark: 100 },
  { subject: 'DEFENSE', A: 90, fullMark: 100 },
  { subject: 'UTILITY', A: 75, fullMark: 100 },
  { subject: 'FRAGGING', A: 82, fullMark: 100 },
  { subject: 'IGL', A: 70, fullMark: 100 }
];

const Roster = () => {
  const { roster, searchVal, onSearchChange } = useOutletContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  // Filter roster by tab and search
  const filteredRoster = roster.filter(player => {
    const matchesTab = activeTab === 'All' || player.type === activeTab;
    const matchesSearch = 
      player.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      player.role.toLowerCase().includes(searchVal.toLowerCase()) ||
      player.agents.some(a => a.toLowerCase().includes(searchVal.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-6">
        <div>
          <h2 className="font-headline text-2xl font-extrabold text-primary uppercase select-none">TEAM LIQUID</h2>
          <p className="text-xs text-on-surface-variant">Active roster analysis and technical ratings</p>
        </div>
        
        {/* Stats Summary */}
        <div className="flex gap-4">
          <div className="bg-surface-container py-2 px-4 rounded-lg border border-outline-variant text-center">
            <span className="text-[9px] font-mono text-on-surface-variant block uppercase">ACTIVE PLAYERS</span>
            <span className="font-mono text-lg text-primary font-bold">{roster.length}</span>
          </div>
          <div className="bg-surface-container py-2 px-4 rounded-lg border border-outline-variant text-center">
            <span className="text-[9px] font-mono text-on-surface-variant block uppercase">AVG KDA</span>
            <span className="font-mono text-lg text-on-surface font-bold">1.49</span>
          </div>
          <div className="bg-surface-container py-2 px-4 rounded-lg border border-outline-variant text-center">
            <span className="text-[9px] font-mono text-on-surface-variant block uppercase">RANK</span>
            <span className="font-mono text-lg text-primary font-bold">Immortal 3</span>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-surface-container border border-outline-variant p-[3px] rounded-lg w-fit">
          {['All', 'Starting 5', 'Substitute', 'Coach'].map(tab => {
            const isActive = activeTab === tab;
            return (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 font-mono text-[9px] font-bold uppercase rounded transition-all ${
                  isActive 
                    ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(57,255,20,0.25)]' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-64 flex items-center">
          <Search className="absolute left-3 text-on-surface-variant w-[18px] h-[18px]" />
          <input
            type="text"
            placeholder="Search player, role, agent..."
            value={searchVal}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant rounded pl-10 pr-8 py-1.5 text-xs text-on-background focus:border-primary focus:ring-0 outline-none"
          />
          {searchVal && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-on-surface-variant hover:text-on-surface"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Player Cards */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoster.map(p => (
            <div 
              key={p.id}
              className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col justify-between gap-4 transition-all hover:border-primary/50"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {/* Position number */}
                  <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-primary text-xs font-bold shrink-0">
                    {p.position}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-sm text-on-surface leading-tight">{p.name}</span>
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase mt-0.5">{p.role}</span>
                  </div>
                </div>
                <Badge type={p.type}>{p.type === 'Starting 5' ? 'Active' : p.type}</Badge>
              </div>

              {/* Agent Badge Icons */}
              <div className="flex flex-wrap gap-1">
                {p.agents.map(agent => (
                  <span key={agent} className="px-2 py-0.5 bg-surface rounded text-[9px] font-mono border border-outline-variant/30 text-on-surface-variant">
                    {agent}
                  </span>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 bg-surface-container/30 border border-outline-variant/30 rounded p-2">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-on-surface-variant uppercase select-none">KDA</span>
                  <span className="font-mono text-xs text-primary font-bold">{p.kda}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-on-surface-variant uppercase select-none">ACS</span>
                  <span className="font-mono text-xs text-on-surface font-bold">{p.acs}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-on-surface-variant uppercase select-none">HS%</span>
                  <span className="font-mono text-xs text-on-surface font-bold">{p.hs}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-on-surface-variant uppercase select-none">WIN RATE</span>
                  <span className="font-mono text-xs text-primary font-bold">{p.win}</span>
                </div>
              </div>

              {/* Form indicators */}
              <div className="flex gap-1 items-center h-4 py-1">
                <div className="w-full h-1 bg-primary rounded-full"></div>
                <div className="w-full h-1 bg-primary rounded-full"></div>
                <div className="w-full h-1 bg-error rounded-full"></div>
                <div className="w-full h-1 bg-primary rounded-full"></div>
                <div className="w-full h-1 bg-primary rounded-full"></div>
              </div>

              <button 
                onClick={() => navigate(`/player/${p.id.toLowerCase()}`)}
                className="w-full py-2 bg-primary/10 border border-primary/30 text-primary font-mono text-[9px] tracking-wider uppercase rounded-lg hover:bg-primary/20 transition-all font-bold"
              >
                VIEW PROFILE
              </button>
            </div>
          ))}

          {filteredRoster.length === 0 && (
            <div className="col-span-12 p-12 text-center border border-dashed border-outline-variant rounded-xl bg-surface/50">
              <ShieldAlert className="w-12 h-12 text-on-surface-variant mx-auto mb-2" />
              <p className="font-bold text-sm text-on-surface">No players found matching current filter</p>
            </div>
          )}
        </div>

        {/* Composition analysis */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <div>
              <h4 className="font-headline text-md text-primary font-bold uppercase">Team Composition</h4>
              <p className="text-xs text-on-surface-variant">Stat balance across roster dimensions</p>
            </div>

            {/* Radar Comp chart */}
            <div className="w-full h-56 flex items-center justify-center bg-surface/40 border border-outline-variant/30 rounded-lg overflow-hidden py-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={compData}>
                  <PolarGrid stroke="#2D333B" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    stroke="#98A2AD" 
                    fontSize={9}
                    tickLine={false}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    stroke="#2D333B" 
                    tick={false}
                  />
                  <Radar 
                    name="Team Liquid" 
                    dataKey="A" 
                    stroke="#39FF14" 
                    fill="#39FF14" 
                    fillOpacity={0.25} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Telemetry widget */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-3">
            <h4 className="font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">LIVE SYSTEM TELEMETRY</h4>
            <div className="flex items-start gap-3 mt-1">
              <span className="relative flex h-3 w-3 mt-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <p className="font-mono text-xs text-on-surface leading-normal select-none">
                System monitoring Liquid vs Fnatic. Precision 99.8%. Tactical overlays synced with active VCT streams.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Roster;
