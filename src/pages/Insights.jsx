import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Info,
  Shield,
  Activity,
  Zap,
  Calculator
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import AnimatedMap from '../components/ui/AnimatedMap';
import AnimatedWeapon from '../components/ui/AnimatedWeapon';
import { initialAgents } from '../data/state';

const Insights = () => {
  // Economy Sim Local State
  const [credits, setCredits] = useState(3900);
  const [lossStreak, setLossStreak] = useState(2);
  const [weapon, setWeapon] = useState('Rifle');
  const [utility, setUtility] = useState(400);
  const [simResult, setSimResult] = useState(null);

  const runSimulation = () => {
    const weaponCost = weapon === 'Rifle' ? 2900 : weapon === 'SMG' ? 1600 : 900;
    const totalCost = weaponCost + Number(utility);
    const leftOver = Number(credits) - totalCost;
    
    let text = '';
    let style = '';

    if (leftOver >= 2000) {
      text = `FULL BUY ADVISED. Buy ${weapon} + Utility. You will have ${leftOver} credits remaining, maintaining a secure compound floor for the next round.`;
      style = 'border-primary text-primary bg-primary/5';
    } else if (Number(credits) >= 2500) {
      text = `FORCE BUY / HALF BUY. Buy SMG/Pistol + minimal Utility. Conserve resources to guarantee a Full Rifle Buy in the subsequent round (loss bonus streak is +${1400 + lossStreak * 500} credits).`;
      style = 'border-primary text-primary bg-surface-container-high/40';
    } else {
      text = `FULL ECO SAVE. Do not buy weapons. Restrict purchases entirely. Rely on default weapons to rebuild credit cache (+${1400 + lossStreak * 500} credits guaranteed loss bonus).`;
      style = 'border-error text-error bg-error/5';
    }

    setSimResult({ text, style });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-outline-variant pb-6 select-none">
        <h2 className="font-headline text-2xl font-extrabold text-primary uppercase">Tactical Insights</h2>
        <p className="text-xs text-on-surface-variant">
          Real-time algorithmic analysis of Team Liquid's performance architecture and opponent vulnerabilities
        </p>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl overflow-hidden relative group flex flex-col justify-between h-48 hover:border-primary/50 transition-all glow-cyan">
          <div className="absolute right-[-20px] top-[-20px] w-[180px] h-[180px] select-none opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
            <AnimatedMap />
          </div>
          <div>
            <Badge type="STRENGTH">STRENGTH</Badge>
            <h3 className="font-headline text-sm font-extrabold text-on-surface uppercase mt-2">Map Strength: 85% Win</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Dominance established on <strong className="text-on-surface">Haven</strong> over the last 30 days. Defensive rotations are 12% faster than regional average.
          </p>
          <button 
            onClick={() => alert('Opening Haven map analytics drilldown...')} 
            className="text-primary font-mono text-[9px] tracking-wider font-bold text-left hover:underline uppercase"
          >
            EXPLORE MAP DATA
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl overflow-hidden relative group flex flex-col justify-between h-48 hover:border-primary/50 transition-all glow-purple">
          <div className="absolute right-[-20px] bottom-[-20px] w-[180px] h-[180px] select-none opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
            <AnimatedWeapon />
          </div>
          <div>
            <Badge type="WARNING">WARNING</Badge>
            <h3 className="font-headline text-sm font-extrabold text-on-surface uppercase mt-2">Sayf ADR decreased by 15%</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Primary performance drop detected in <strong className="text-on-surface">pistol rounds</strong>. Headshot percentage remains stable, suggesting positioning issues.
          </p>
          <button 
            onClick={() => alert('Opening Sayf player dashboard...')} 
            className="text-primary font-mono text-[9px] tracking-wider font-bold text-left hover:underline uppercase"
          >
            VIEW PLAYER REPORT
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest border-l-4 border-primary p-6 rounded-xl overflow-hidden relative group flex flex-col justify-between h-48 hover:border-primary/50 border-y border-r border-outline-variant transition-all">
          <div className="absolute -right-4 -bottom-4 select-none opacity-5 group-hover:opacity-10 transition-transform">
            <Activity className="w-[100px] h-[100px] text-primary" />
          </div>
          <div>
            <Badge type="INTELLIGENCE">INTELLIGENCE</Badge>
            <h3 className="font-headline text-sm font-extrabold text-on-surface uppercase mt-2">Opponent Fnatic: 70% B-Loss</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Fnatic loses B site 70% of rounds when playing against aggressive initiators. Recommend Breach/Fade composition.
          </p>
          <button 
            onClick={() => alert('Opening Fnatic counter tactics checklist...')} 
            className="text-primary font-mono text-[9px] tracking-wider font-bold text-left hover:underline uppercase"
          >
            STRATEGIC COUNTER
          </button>
        </div>
      </div>

      {/* Grid Comparisons */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Agent Table */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2 select-none">
            <h3 className="font-headline text-sm text-primary font-bold uppercase">Agent Pick Rate Meta — EMEA</h3>
            <span className="text-[9px] font-mono text-on-surface-variant uppercase">Global Seeds</span>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="border-b border-outline-variant text-[9px] font-mono text-on-surface-variant">
                  <th className="px-4 py-2 font-bold uppercase">AGENT</th>
                  <th className="px-4 py-2 font-bold uppercase">ROLE</th>
                  <th className="px-4 py-2 font-bold uppercase">PICK RATE</th>
                  <th className="px-4 py-2 font-bold uppercase">WIN RATE</th>
                  <th className="px-4 py-2 font-bold uppercase text-center">TREND</th>
                </tr>
              </thead>
              <tbody>
                {initialAgents.map(a => (
                  <tr key={a.name} className="border-b border-outline-variant hover:bg-surface-container/40 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-sm text-on-surface">{a.name}</td>
                    <td className="px-4 py-2.5 font-mono text-[10px] text-on-surface-variant uppercase">{a.role}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-on-surface">
                      <div className="flex items-center gap-3">
                        <span className="w-10 block font-bold">{a.pick}</span>
                        <div className="flex-grow h-1.5 bg-primary/10 rounded-full w-24">
                          <div className="bg-primary h-full rounded-full" style={{ width: a.pick }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-primary font-bold">{a.win}</td>
                    <td className="px-4 py-2.5 flex justify-center mt-1">
                      {a.trend === 'up' && <TrendingUp className="text-primary w-4 h-4" />}
                      {a.trend === 'down' && <TrendingDown className="text-error w-4 h-4" />}
                      {a.trend === 'stable' && <Minus className="text-on-surface-variant w-4 h-4" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Head-to-Head */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <h3 className="font-headline text-sm text-on-surface font-bold uppercase select-none">Head to Head: Liquid vs Fnatic</h3>
            <div className="flex flex-col gap-4">
              {/* Compare Items */}
              {[
                { label: 'Pistol Win Rate', valL: 74, valF: 68 },
                { label: 'Map Control', valL: 71, valF: 65 },
                { label: 'Eco Round Win', valL: 48, valF: 52 },
                { label: 'Late Round Win', valL: 65, valF: 61 },
                { label: 'Aggression Score', valL: 58, valF: 72 }
              ].map(item => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs text-on-surface-variant select-none">
                    <span>{item.label}</span>
                    <div>
                      <span className="text-primary font-bold">{item.valL}%</span> / <span className="text-on-surface-variant">{item.valF}%</span>
                    </div>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden w-full bg-surface-container-highest">
                    <div className="bg-primary" style={{ width: `${item.valL}%` }}></div>
                    <div className="bg-outline-variant" style={{ width: `${item.valF}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coach Quote Box */}
          <div className="bg-secondary-container text-on-secondary-container rounded-xl p-6 border-l-4 border-primary flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center font-bold text-primary font-mono text-sm border border-outline-variant select-none shrink-0">
              CR
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 select-none">
                <span className="text-xs font-bold text-on-secondary">Coach Red</span>
                <span className="text-[9px] font-mono text-on-surface-variant uppercase">Team Liquid Analyst</span>
              </div>
              <p className="text-xs text-on-surface/90 italic leading-relaxed">
                "Our Haven setup is near-perfect. The focus this week must be pistol round discipline. We're gifting too many free rounds in eco situations."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Economy Simulation Widget */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2 select-none">
          <Calculator className="text-primary w-5 h-5" />
          <h3 className="font-headline text-md text-primary font-bold uppercase">Round Economy Simulator</h3>
        </div>
        <p className="text-xs text-on-surface-variant">Configure credit metrics to calculate tactical buying protocols</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold select-none">Current Credits</label>
            <input 
              type="number" 
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="bg-surface border border-outline-variant rounded p-1.5 text-xs text-on-surface outline-none focus:border-primary focus:ring-0"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold select-none">Loss Streak</label>
            <input 
              type="number" 
              value={lossStreak}
              onChange={(e) => setLossStreak(e.target.value)}
              className="bg-surface border border-outline-variant rounded p-1.5 text-xs text-on-surface outline-none focus:border-primary focus:ring-0"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold select-none">Weapons</label>
            <select 
              value={weapon}
              onChange={(e) => setWeapon(e.target.value)}
              className="bg-surface border border-outline-variant rounded p-1.5 text-xs text-on-surface outline-none focus:border-primary focus:ring-0"
            >
              <option value="Rifle">Rifle (2900 Creds)</option>
              <option value="SMG">SMG (1600 Creds)</option>
              <option value="Pistol">Heavy Pistol (900 Creds)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold select-none">Utility Budget</label>
            <input 
              type="number" 
              value={utility}
              onChange={(e) => setUtility(e.target.value)}
              className="bg-surface border border-outline-variant rounded p-1.5 text-xs text-on-surface outline-none focus:border-primary focus:ring-0"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-3 border-t border-outline-variant/30 pt-4">
          <button 
            onClick={runSimulation}
            className="bg-primary text-black font-mono text-xs font-bold py-2.5 px-8 rounded-lg hover:opacity-90 active:scale-95 transition-all uppercase"
          >
            SIMULATE
          </button>
          
          <div className="flex-grow w-full">
            {simResult ? (
              <div className={`border rounded-lg p-3 font-mono text-xs leading-normal ${simResult.style}`}>
                <strong>TACTICAL PROTOCOL:</strong> {simResult.text}
              </div>
            ) : (
              <div className="text-xs text-on-surface-variant italic select-none">Click Simulate to calculate buy protocols...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
