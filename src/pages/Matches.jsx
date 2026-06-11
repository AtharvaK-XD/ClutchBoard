import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Download, 
  ListFilter, 
  Award, 
  User, 
  CheckCircle2, 
  Crosshair,
  MapPin,
  TrendingUp
} from 'lucide-react';
import Badge from '../components/ui/Badge';

const Matches = () => {
  const { matches, selectedMatchId, setSelectedMatchId } = useOutletContext();
  
  // Filter states
  const [tournamentFilter, setTournamentFilter] = useState('All Tournaments');
  const [opponentFilter, setOpponentFilter] = useState('All Opponents');
  const [mapFilter, setMapFilter] = useState('All Maps');
  const [resultFilter, setResultFilter] = useState('All Results');

  // Extract unique items for dropdowns
  const tournaments = ['All Tournaments', ...new Set(matches.map(m => m.tournament))];
  const opponents = ['All Opponents', ...new Set(matches.map(m => m.opponent))];
  const maps = ['All Maps', ...new Set(matches.map(m => m.map))];
  const results = ['All Results', 'Win', 'Loss'];

  // Filter matches
  const filteredMatches = matches.filter(m => {
    const tourneyMatch = tournamentFilter === 'All Tournaments' || m.tournament === tournamentFilter;
    const oppMatch = opponentFilter === 'All Opponents' || m.opponent === opponentFilter;
    const mapMatch = mapFilter === 'All Maps' || m.map === mapFilter;
    const resultMatch = resultFilter === 'All Results' || 
                        (resultFilter === 'Win' && m.type === 'WIN') ||
                        (resultFilter === 'Loss' && m.type === 'LOSS');
    return tourneyMatch && oppMatch && mapMatch && resultMatch;
  });

  // Find active selected match
  const activeMatch = matches.find(m => m.id === selectedMatchId) || filteredMatches[0] || matches[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-6">
        <div>
          <h2 className="font-headline text-2xl font-extrabold text-primary uppercase select-none">Match History</h2>
          <p className="text-xs text-on-surface-variant">Analyze performance trends and tactical breakdowns for Team Liquid</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert('Opening dashboard settings filter dialog...')} 
            className="bg-surface-container-low border border-outline-variant px-4 py-2 rounded-md flex items-center gap-1.5 font-mono text-[10px] font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase"
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => alert('Downloading match dossier as PDF...')} 
            className="bg-surface-container-low border border-outline-variant px-4 py-2 rounded-md flex items-center gap-1.5 font-mono text-[10px] font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Dossier</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold">Tournament</label>
          <select 
            value={tournamentFilter}
            onChange={(e) => setTournamentFilter(e.target.value)}
            className="bg-surface border border-outline-variant rounded py-1.5 px-2 text-xs text-on-surface outline-none focus:border-primary focus:ring-0"
          >
            {tournaments.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold">Opponent</label>
          <select 
            value={opponentFilter}
            onChange={(e) => setOpponentFilter(e.target.value)}
            className="bg-surface border border-outline-variant rounded py-1.5 px-2 text-xs text-on-surface outline-none focus:border-primary focus:ring-0"
          >
            {opponents.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold">Map</label>
          <select 
            value={mapFilter}
            onChange={(e) => setMapFilter(e.target.value)}
            className="bg-surface border border-outline-variant rounded py-1.5 px-2 text-xs text-on-surface outline-none focus:border-primary focus:ring-0"
          >
            {maps.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold">Result</label>
          <select 
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value)}
            className="bg-surface border border-outline-variant rounded py-1.5 px-2 text-xs text-on-surface outline-none focus:border-primary focus:ring-0"
          >
            {results.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left scrollable match listing */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 max-h-[920px] overflow-y-auto custom-scrollbar pr-1">
          {filteredMatches.map(m => {
            const isSelected = m.id === activeMatch?.id;
            return (
              <div 
                key={m.id}
                onClick={() => setSelectedMatchId(m.id)}
                className={`rounded-xl p-4 flex flex-col justify-between gap-3 cursor-pointer select-none transition-all relative ${
                  isSelected 
                    ? 'border-2 border-primary glow-cyan bg-surface-container-lowest' 
                    : 'border border-outline-variant bg-surface-container-lowest hover:border-primary/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-primary text-black font-mono text-[9px] px-2 py-0.5 rounded-bl-md font-bold tracking-wider uppercase">
                    ANALYZING
                  </div>
                )}
                <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant">
                  <span>{m.date}</span>
                  <span>{m.tournament}</span>
                </div>
                <div>
                  <h4 className="font-headline text-md font-extrabold text-on-surface uppercase leading-tight">vs {m.opponent}</h4>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="font-mono text-md font-bold text-on-surface">{m.score}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase">{m.map}</span>
                  </div>
                </div>
                <div>
                  <Badge type={m.type}>{m.type}</Badge>
                </div>
              </div>
            );
          })}
          
          {filteredMatches.length === 0 && (
            <div className="p-8 text-center border border-dashed border-outline-variant rounded-xl bg-surface/50">
              <Crosshair className="w-10 h-10 text-on-surface-variant mx-auto mb-2" />
              <p className="font-mono text-xs text-on-surface-variant uppercase">No matches match filters</p>
            </div>
          )}
        </div>

        {/* Right Match Analysis Details Viewport */}
        {activeMatch && (
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Score Header */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col justify-between gap-4 relative">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-outline-variant/30 pb-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3 select-none">
                    <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center font-bold text-primary text-md border border-outline-variant shrink-0">TL</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">Team Liquid</span>
                      <span className="text-[9px] font-mono text-on-surface-variant uppercase">VCT EMEA</span>
                    </div>
                  </div>
                  <span className="font-mono text-3xl text-primary font-extrabold">{activeMatch.score}</span>
                  <div className="flex items-center gap-3 select-none">
                    <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center font-bold text-error text-md border border-outline-variant shrink-0">
                      {activeMatch.opponent.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">{activeMatch.opponent}</span>
                      <span className="text-[9px] font-mono text-on-surface-variant uppercase">OPPONENT</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-primary font-mono text-[10px] tracking-wider block uppercase font-bold">{activeMatch.map}</span>
                  <span className="text-[10px] font-mono text-on-surface-variant block mt-0.5">{activeMatch.date}</span>
                </div>
              </div>

              {/* KPI Chips */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-surface-container/60 border border-outline-variant rounded p-3 flex items-center gap-3">
                  <Award className="text-primary w-6 h-6 shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-on-surface-variant block uppercase font-bold select-none">MATCH MVP</span>
                    <span className="font-mono text-xs font-bold text-primary block mt-0.5">{activeMatch.mvp}</span>
                  </div>
                </div>
                <div className="bg-surface-container/60 border border-outline-variant rounded p-3 flex items-center gap-3">
                  <User className="text-secondary w-6 h-6 shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-on-surface-variant block uppercase font-bold select-none">TOP AGENT</span>
                    <span className="font-mono text-xs font-bold text-on-surface block mt-0.5">{activeMatch.topAgent}</span>
                  </div>
                </div>
                <div className="bg-surface-container/60 border border-outline-variant rounded p-3 flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-on-surface-variant block uppercase font-bold select-none">ROUNDS WON</span>
                    <span className="font-mono text-xs font-bold text-primary block mt-0.5">{activeMatch.roundsWon} / {activeMatch.roundsWon + activeMatch.roundsLost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Table */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
              <h4 className="font-headline text-md text-primary font-bold uppercase">Player Performance Stats</h4>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-outline-variant">
                      <th className="px-4 py-2 font-mono text-[9px] text-on-surface-variant uppercase font-bold">PLAYER</th>
                      <th className="px-4 py-2 font-mono text-[9px] text-on-surface-variant uppercase font-bold">AGENT</th>
                      <th className="px-4 py-2 font-mono text-[9px] text-on-surface-variant uppercase font-bold">ACS</th>
                      <th className="px-4 py-2 font-mono text-[9px] text-on-surface-variant uppercase font-bold">KILLS</th>
                      <th className="px-4 py-2 font-mono text-[9px] text-on-surface-variant uppercase font-bold">DEATHS</th>
                      <th className="px-4 py-2 font-mono text-[9px] text-on-surface-variant uppercase font-bold">ASSISTS</th>
                      <th className="px-4 py-2 font-mono text-[9px] text-on-surface-variant uppercase font-bold">HS%</th>
                      <th className="px-4 py-2 font-mono text-[9px] text-on-surface-variant uppercase font-bold">ADR</th>
                      <th className="px-4 py-2 font-mono text-[9px] text-on-surface-variant uppercase font-bold">KDA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeMatch.rosterPerformance.map((p, idx) => (
                      <tr 
                        key={p.name}
                        className={`border-b border-outline-variant hover:bg-surface-container/60 transition-colors ${
                          idx % 2 === 0 ? 'bg-surface/10' : ''
                        }`}
                      >
                        <td className="px-4 py-2.5 font-bold text-sm text-primary">{p.name}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-on-surface-variant">{p.agent}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-on-surface">{p.acs}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-on-surface font-bold">{p.k}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-on-surface-variant">{p.d}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-on-surface-variant">{p.a}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-on-surface">{p.hs}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-on-surface">{p.adr}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-primary font-bold">{p.kda}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Round Win/Loss Sequence */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
              <h4 className="font-headline text-md text-primary font-bold uppercase">Round Win/Loss Sequence</h4>
              <div className="flex flex-wrap gap-1">
                {activeMatch.roundsTimeline.map((r, idx) => {
                  const boxBg = r === 'W' 
                    ? 'bg-primary/20 text-primary border-primary/30' 
                    : 'bg-error/20 text-error border-error/30';
                  return (
                    <div 
                      key={idx}
                      className={`w-7 h-7 rounded border font-mono text-xs font-bold flex items-center justify-center select-none ${boxBg}`}
                      title={`Round ${idx + 1}`}
                    >
                      {r}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Heatmap */}
            <div className="bg-surface-container rounded-xl p-6 border border-outline-variant flex flex-col gap-3">
              <div className="flex justify-between items-center select-none">
                <h4 className="font-headline text-md text-on-surface font-bold">Kill Heatmap: {activeMatch.map}</h4>
                <span className="font-mono text-xs text-on-surface-variant uppercase">TACTICAL ANALYSIS OVERLAY</span>
              </div>
              
              <div className="w-full h-80 bg-surface-container-lowest border border-outline-variant/60 rounded-xl relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 grid-pattern opacity-40"></div>
                
                {/* Mock Map corridors SVG */}
                <svg className="w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M10 20 H40 V40 H10 Z M50 10 H90 V30 H50 Z M20 50 H50 V90 H20 Z M60 40 H85 V85 H60 Z M40 40 H60 V50 H40 Z" fill="none" stroke="#E8ECEF" strokeWidth="1.5" />
                  <circle cx="25" cy="30" r="10" fill="none" stroke="#E8ECEF" strokeWidth="1" />
                  <circle cx="70" cy="20" r="8" fill="none" stroke="#E8ECEF" strokeWidth="1" />
                  <circle cx="72" cy="62" r="12" fill="none" stroke="#E8ECEF" strokeWidth="1" />
                </svg>

                {/* Callout labels */}
                <div className="absolute top-1/4 left-1/4 bg-surface border border-outline-variant text-[9px] font-mono text-on-surface-variant px-1 rounded font-bold uppercase select-none">A SITE</div>
                <div className="absolute top-1/4 right-1/4 bg-surface border border-outline-variant text-[9px] font-mono text-on-surface-variant px-1 rounded font-bold uppercase select-none">C SITE</div>
                <div className="absolute bottom-1/4 right-1/3 bg-surface border border-outline-variant text-[9px] font-mono text-on-surface-variant px-1 rounded font-bold uppercase select-none">B SITE</div>

                {/* Plotted heatmap dots */}
                {activeMatch.kills.map((k, idx) => {
                  const dotColor = k.team === 'TL' 
                    ? 'bg-primary shadow-[0_0_8px_#39FF14]' 
                    : 'bg-error shadow-[0_0_8px_#FF4D67]';
                  return (
                    <div 
                      key={idx}
                      className={`absolute w-2 h-2 rounded-full ${dotColor} transform -translate-x-1/2 -translate-y-1/2 cursor-crosshair`}
                      style={{ left: `${k.x}%`, top: `${k.y}%` }}
                      title={`Kill by ${k.team}`}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
