import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  User, 
  Users, 
  Bell, 
  Upload, 
  Edit2, 
  ArrowRightLeft, 
  Trash2, 
  Download, 
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  FileCode
} from 'lucide-react';
import Badge from '../components/ui/Badge';

const Settings = () => {
  const { roster, setRoster, notifications, setNotifications } = useOutletContext();

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Saving team profile changes to system command registry...');
  };

  const handleToggleNotification = (id) => {
    setNotifications(prev =>
      prev.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item)
    );
  };

  const handleAddPlayer = () => {
    const name = prompt("Enter player tag/alias:");
    if (!name) return;
    const role = prompt("Enter player team role (e.g. Initiator, Controller, Duelist):", "Duelist");
    if (!role) return;

    const newId = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const count = roster.length + 1;
    const posStr = String(count).padStart(2, '0');

    const newPlayer = {
      id: newId,
      name: name,
      role: role,
      type: 'Starting 5',
      kda: '1.25',
      acs: '210',
      hs: '20%',
      win: '60%',
      agents: ['Jett', 'Sova'],
      position: posStr
    };

    setRoster(prev => [...prev, newPlayer]);
    alert(`Player ${name} added to ClutchBoard roster registry.`);
  };

  const handleRemovePlayer = (id) => {
    const player = roster.find(p => p.id === id);
    if (!player) return;
    
    if (confirm(`Are you sure you want to retire ${player.name} from active ClutchBoard roster databases?`)) {
      setRoster(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-outline-variant pb-6 select-none">
        <h2 className="font-headline text-2xl font-bold text-primary uppercase">Settings & Management</h2>
        <p className="text-xs text-on-surface-variant">Configure your team profile and application preferences</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side (Forms taking 2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Team Profile */}
          <form onSubmit={handleProfileSubmit} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2 select-none">
              <h3 className="font-headline text-sm text-on-surface font-bold flex items-center gap-2 uppercase">
                <User className="text-primary w-4.5 h-4.5" />
                <span>Team Profile</span>
              </h3>
              <button 
                type="submit" 
                className="text-primary font-mono text-[10px] tracking-wider font-bold hover:underline uppercase"
              >
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start mt-2">
              {/* Upload Logo area */}
              <div 
                onClick={() => alert('Opening image file selector for profile upload...')}
                className="md:col-span-1 border-2 border-dashed border-outline-variant rounded-xl bg-surface/50 hover:border-primary flex flex-col items-center justify-center p-4 cursor-pointer text-center text-on-surface-variant hover:text-on-surface transition-all select-none h-32"
              >
                <Upload className="w-6 h-6 mb-1.5" />
                <span className="font-mono text-[8px] uppercase font-bold">Upload Team Logo</span>
              </div>
              {/* Inputs */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold select-none">Team Name</label>
                  <input 
                    type="text" 
                    defaultValue="Team Liquid" 
                    className="bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary text-xs text-on-surface outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold select-none">Selected Game</label>
                    <select className="bg-surface border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-0 outline-none">
                      <option value="Valorant">Valorant</option>
                      <option value="CS2">CS2</option>
                      <option value="LoL">League of Legends</option>
                      <option value="DOTA2">DOTA 2</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] text-on-surface-variant uppercase font-bold select-none">Region</label>
                    <select className="bg-surface border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface focus:border-primary focus:ring-0 outline-none">
                      <option value="EMEA">EMEA</option>
                      <option value="Americas">Americas</option>
                      <option value="Pacific">Pacific</option>
                      <option value="Global">Global</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Section 2: Roster Management */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
              <h3 className="font-headline text-sm text-on-surface font-bold flex items-center gap-2 uppercase select-none">
                <Users className="text-primary w-4.5 h-4.5" />
                <span>Roster Management</span>
              </h3>
              <button 
                onClick={handleAddPlayer}
                className="bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] font-bold py-1 px-4 rounded hover:bg-primary/20 transition-all uppercase"
              >
                Add Player
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {roster.map(p => (
                <div 
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-surface/40 border border-outline-variant rounded-lg hover:bg-surface transition-all gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 font-bold text-primary font-mono text-xs flex items-center justify-center select-none shrink-0">
                      {p.position}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-on-surface">{p.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shrink-0 animate-pulse"></span>
                        <Badge type={p.role}>{p.role}</Badge>
                      </div>
                      <span className="font-mono text-[9px] text-on-surface-variant uppercase mt-0.5">{p.type}</span>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-1 shrink-0">
                    <button 
                      onClick={() => alert(`Editing metadata fields for ${p.name}...`)}
                      className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                      title="Edit Player"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => alert(`Toggling bench status for ${p.name}...`)}
                      className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                      title="Toggle Active/Bench"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleRemovePlayer(p.id)}
                      className="w-8 h-8 rounded hover:bg-error/10 flex items-center justify-center text-error transition-colors"
                      title="Delete Player"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Notification Preferences */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2 select-none">
              <h3 className="font-headline text-sm text-on-surface font-bold flex items-center gap-2 uppercase">
                <Bell className="text-primary w-4.5 h-4.5" />
                <span>Notifications</span>
              </h3>
              <span className="text-[9px] font-mono text-on-surface-variant uppercase">Configure</span>
            </div>
            
            <div className="flex flex-col gap-1">
              {notifications.map(n => (
                <div 
                  key={n.id}
                  className="flex items-center justify-between py-2 border-b border-outline-variant/30 select-none"
                >
                  <span className="text-xs font-bold text-on-surface">{n.label}</span>
                  <button 
                    onClick={() => handleToggleNotification(n.id)}
                    className={`w-11 h-6 rounded-full relative cursor-pointer outline-none transition-colors duration-200 ${
                      n.enabled ? 'bg-primary' : 'bg-surface-variant'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-on-background rounded-full absolute top-0.5 transition-transform duration-200 ${
                      n.enabled ? 'left-5.5' : 'left-0.5'
                    }`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side (Status & Exports taking 1/3 width) */}
        <div className="space-y-6">
          
          {/* User Profile Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 text-center flex flex-col items-center gap-3 relative overflow-hidden select-none">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary/30 to-primary border-2 border-primary-container flex items-center justify-center font-bold text-on-primary font-mono text-2xl">
              CR
            </div>
            <div className="mt-1">
              <h4 class="font-headline text-sm text-on-surface font-bold">Coach Red</h4>
              <p className="text-xs text-on-surface-variant">Team Liquid Analyst</p>
            </div>
            
            <div className="flex gap-4 border-t border-outline-variant/30 pt-4 w-full text-center text-xs font-mono text-on-surface-variant justify-around">
              <div>
                <strong className="text-primary block text-sm font-bold">124</strong>
                <span>Reviewed</span>
              </div>
              <div className="w-px h-6 bg-outline-variant/30"></div>
              <div>
                <strong className="text-primary block text-sm font-bold">47</strong>
                <span>Reports</span>
              </div>
            </div>
          </div>

          {/* System Status Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4 select-none">
            <h4 className="font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">System Status</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant">Data Pipeline</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                  <span className="text-primary font-bold">OPERATIONAL</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant">Live Match Feed</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                  <span className="text-primary font-bold">ACTIVE</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant">AI Analysis Engine</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E5B50F] shrink-0 animate-pulse"></span>
                  <span className="text-[#E5B50F] font-bold">PROCESSING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export Data Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-wider select-none">Export Data</h4>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => alert('Exporting system telemetry dataset as CSV...')} 
                className="w-full py-2.5 border border-outline-variant rounded-lg flex items-center justify-center gap-2 font-mono text-[10px] text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all font-bold uppercase bg-surface-container/30"
              >
                <FileSpreadsheet className="w-4.5 h-4.5" />
                <span>Export CSV</span>
              </button>
              <button 
                onClick={() => alert('Compiling analytical dossier PDF report...')} 
                className="w-full py-2.5 border border-outline-variant rounded-lg flex items-center justify-center gap-2 font-mono text-[10px] text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all font-bold uppercase bg-surface-container/30"
              >
                <FileText className="w-4.5 h-4.5" />
                <span>Export PDF Report</span>
              </button>
              <button 
                onClick={() => alert('Serializing data model state as JSON object...')} 
                className="w-full py-2.5 border border-outline-variant rounded-lg flex items-center justify-center gap-2 font-mono text-[10px] text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all font-bold uppercase bg-surface-container/30"
              >
                <FileCode className="w-4.5 h-4.5" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
