// Default static data for ClutchBoard

export const initialRoster = [
  { id: 'nats', name: 'Nats', role: 'Sentinel', type: 'Starting 5', kda: '1.85', acs: '241', hs: '28%', win: '74%', agents: ['Cypher', 'Killjoy', 'Viper', 'Sage'], position: '01' },
  { id: 'sayf', name: 'Sayf', role: 'Initiator', type: 'Starting 5', kda: '1.42', acs: '218', hs: '22%', win: '68%', agents: ['Sova', 'Fade', 'Breach', 'KAY/O'], position: '02' },
  { id: 'tenz', name: 'TenZ', role: 'Duelist', type: 'Starting 5', kda: '1.71', acs: '267', hs: '31%', win: '71%', agents: ['Jett', 'Reyna', 'Yoru', 'Neon'], position: '03' },
  { id: 'jamppi', name: 'Jamppi', role: 'Controller', type: 'Starting 5', kda: '1.29', acs: '196', hs: '19%', win: '65%', agents: ['Omen', 'Astra', 'Brimstone', 'Viper'], position: '04' },
  { id: 'redgar', name: 'Redgar', role: 'IGL/Controller', type: 'Starting 5', kda: '1.18', acs: '185', hs: '17%', win: '70%', agents: ['Omen', 'Astra', 'Viper', 'Harbor'], position: '05' }
];

export const initialMatches = [
  { 
    id: 1, 
    type: 'WIN', 
    opponent: 'Fnatic', 
    score: '13 - 11', 
    map: 'Haven', 
    tournament: 'VCT Champions', 
    date: 'Aug 24, 2026', 
    mvp: 'Nats', 
    topAgent: 'Cypher', 
    roundsWon: 13, 
    roundsLost: 11,
    roundsTimeline: ['W', 'W', 'L', 'W', 'L', 'L', 'W', 'W', 'W', 'L', 'L', 'W', 'L', 'W', 'L', 'W', 'W', 'L', 'L', 'W', 'L', 'L', 'W', 'W'],
    kills: [
      { x: 30, y: 40, team: 'TL' }, { x: 35, y: 45, team: 'TL' }, { x: 70, y: 80, team: 'FN' },
      { x: 20, y: 65, team: 'TL' }, { x: 80, y: 30, team: 'FN' }, { x: 50, y: 55, team: 'TL' },
      { x: 45, y: 50, team: 'TL' }, { x: 85, y: 25, team: 'FN' }, { x: 60, y: 70, team: 'TL' }
    ],
    rosterPerformance: [
      { name: 'Nats', agent: 'Cypher', acs: '256', k: '22', d: '12', a: '8', hs: '28%', adr: '162', kda: '2.50' },
      { name: 'Sayf', agent: 'Breach', acs: '210', k: '17', d: '14', a: '11', hs: '22%', adr: '141', kda: '2.00' },
      { name: 'TenZ', agent: 'Jett', acs: '240', k: '19', d: '16', a: '4', hs: '31%', adr: '155', kda: '1.43' },
      { name: 'Jamppi', agent: 'Omen', acs: '185', k: '13', d: '15', a: '9', hs: '19%', adr: '120', kda: '1.46' },
      { name: 'Redgar', agent: 'Astra', acs: '160', k: '10', d: '14', a: '14', hs: '17%', adr: '95', kda: '1.71' }
    ]
  },
  { 
    id: 2, 
    type: 'WIN', 
    opponent: 'G2 Esports', 
    score: '13 - 7', 
    map: 'Split', 
    tournament: 'VCT Champions', 
    date: 'Aug 22, 2026', 
    mvp: 'TenZ', 
    topAgent: 'Jett', 
    roundsWon: 13, 
    roundsLost: 7,
    roundsTimeline: ['W', 'W', 'W', 'L', 'W', 'L', 'W', 'W', 'L', 'W', 'W', 'L', 'L', 'W', 'L', 'W', 'W', 'W', 'L', 'W'],
    kills: [
      { x: 40, y: 30, team: 'TL' }, { x: 55, y: 35, team: 'TL' }, { x: 65, y: 75, team: 'G2' },
      { x: 30, y: 55, team: 'TL' }, { x: 75, y: 40, team: 'G2' }, { x: 45, y: 45, team: 'TL' }
    ],
    rosterPerformance: [
      { name: 'TenZ', agent: 'Jett', acs: '298', k: '24', d: '10', a: '3', hs: '34%', adr: '185', kda: '2.70' },
      { name: 'Nats', agent: 'Viper', acs: '215', k: '16', d: '11', a: '7', hs: '26%', adr: '135', kda: '2.09' },
      { name: 'Sayf', agent: 'Fade', acs: '202', k: '14', d: '12', a: '9', hs: '24%', adr: '130', kda: '1.91' },
      { name: 'Jamppi', agent: 'Omen', acs: '170', k: '11', d: '13', a: '8', hs: '18%', adr: '115', kda: '1.46' },
      { name: 'Redgar', agent: 'Astra', acs: '155', k: '9', d: '11', a: '12', hs: '15%', adr: '92', kda: '1.90' }
    ]
  },
  { 
    id: 3, 
    type: 'LOSS', 
    opponent: 'NAVI', 
    score: '10 - 13', 
    map: 'Ascent', 
    tournament: 'VCT EMEA Stage 2', 
    date: 'Aug 19, 2026', 
    mvp: 'Shao', 
    topAgent: 'Fade', 
    roundsWon: 10, 
    roundsLost: 13,
    roundsTimeline: ['L', 'L', 'W', 'W', 'L', 'L', 'W', 'L', 'L', 'W', 'L', 'W', 'W', 'L', 'L', 'W', 'W', 'L', 'W', 'L', 'L', 'L', 'L'],
    kills: [
      { x: 50, y: 60, team: 'NV' }, { x: 25, y: 45, team: 'TL' }, { x: 60, y: 50, team: 'NV' },
      { x: 30, y: 35, team: 'TL' }, { x: 80, y: 60, team: 'NV' }, { x: 70, y: 30, team: 'NV' }
    ],
    rosterPerformance: [
      { name: 'Sayf', agent: 'Sova', acs: '220', k: '16', d: '15', a: '8', hs: '22%', adr: '140', kda: '1.60' },
      { name: 'Nats', agent: 'Killjoy', acs: '205', k: '14', d: '14', a: '6', hs: '25%', adr: '132', kda: '1.42' },
      { name: 'TenZ', agent: 'Jett', acs: '198', k: '15', d: '17', a: '3', hs: '29%', adr: '128', kda: '1.05' },
      { name: 'Jamppi', agent: 'Omen', acs: '175', k: '12', d: '16', a: '7', hs: '17%', adr: '110', kda: '1.18' },
      { name: 'Redgar', agent: 'KAY/O', acs: '150', k: '10', d: '16', a: '11', hs: '18%', adr: '90', kda: '1.31' }
    ]
  },
  { 
    id: 4, 
    type: 'WIN', 
    opponent: 'KRU Esports', 
    score: '13 - 4', 
    map: 'Bind', 
    tournament: 'VCT EMEA Stage 2', 
    date: 'Aug 16, 2026', 
    mvp: 'Jamppi', 
    topAgent: 'Viper', 
    roundsWon: 13, 
    roundsLost: 4,
    roundsTimeline: ['W', 'W', 'W', 'W', 'L', 'W', 'W', 'W', 'L', 'W', 'W', 'L', 'W', 'L', 'W', 'W', 'W'],
    kills: [
      { x: 45, y: 30, team: 'TL' }, { x: 20, y: 40, team: 'TL' }, { x: 50, y: 60, team: 'TL' },
      { x: 70, y: 40, team: 'KR' }, { x: 80, y: 80, team: 'TL' }
    ],
    rosterPerformance: [
      { name: 'Jamppi', agent: 'Viper', acs: '276', k: '19', d: '8', a: '10', hs: '23%', adr: '168', kda: '3.62' },
      { name: 'TenZ', agent: 'Reyna', acs: '260', k: '18', d: '9', a: '4', hs: '33%', adr: '159', kda: '2.44' },
      { name: 'Nats', agent: 'Cypher', acs: '204', k: '14', d: '7', a: '6', hs: '29%', adr: '128', kda: '2.85' },
      { name: 'Sayf', agent: 'Fade', acs: '190', k: '12', d: '8', a: '9', hs: '21%', adr: '122', kda: '2.62' },
      { name: 'Redgar', agent: 'Brimstone', acs: '145', k: '8', d: '9', a: '13', hs: '16%', adr: '88', kda: '2.33' }
    ]
  },
  { 
    id: 5, 
    type: 'WIN', 
    opponent: 'NRG', 
    score: '13 - 9', 
    map: 'Icebox', 
    tournament: 'Masters Tokyo', 
    date: 'Aug 10, 2026', 
    mvp: 'Nats', 
    topAgent: 'Viper', 
    roundsWon: 13, 
    roundsLost: 9,
    roundsTimeline: ['W', 'L', 'W', 'W', 'L', 'W', 'L', 'W', 'W', 'L', 'L', 'W', 'W', 'L', 'W', 'L', 'W', 'L', 'W', 'W', 'L', 'W'],
    kills: [
      { x: 30, y: 70, team: 'TL' }, { x: 40, y: 60, team: 'TL' }, { x: 60, y: 40, team: 'NR' },
      { x: 50, y: 30, team: 'TL' }, { x: 70, y: 70, team: 'NR' }
    ],
    rosterPerformance: [
      { name: 'Nats', agent: 'Viper', acs: '265', k: '20', d: '11', a: '9', hs: '27%', adr: '160', kda: '2.63' },
      { name: 'TenZ', agent: 'Jett', acs: '228', k: '16', d: '14', a: '5', hs: '30%', adr: '142', kda: '1.50' },
      { name: 'Sayf', agent: 'Sage', acs: '205', k: '14', d: '12', a: '8', hs: '20%', adr: '131', kda: '1.83' },
      { name: 'Jamppi', agent: 'Sova', acs: '180', k: '11', d: '13', a: '11', hs: '22%', adr: '118', kda: '1.69' },
      { name: 'Redgar', agent: 'Harbor', acs: '158', k: '9', d: '13', a: '10', hs: '16%', adr: '90', kda: '1.46' }
    ]
  },
  { 
    id: 6, 
    type: 'LOSS', 
    opponent: 'Sentinels', 
    score: '11 - 13', 
    map: 'Split', 
    tournament: 'Masters Tokyo', 
    date: 'Aug 8, 2026', 
    mvp: 'Zekken', 
    topAgent: 'Raze', 
    roundsWon: 11, 
    roundsLost: 13,
    roundsTimeline: ['L', 'W', 'L', 'L', 'W', 'W', 'L', 'W', 'L', 'L', 'W', 'L', 'W', 'W', 'L', 'L', 'W', 'L', 'W', 'L', 'W', 'L', 'W', 'L'],
    kills: [
      { x: 20, y: 40, team: 'SEN' }, { x: 50, y: 50, team: 'SEN' }, { x: 35, y: 70, team: 'TL' },
      { x: 65, y: 35, team: 'TL' }, { x: 80, y: 55, team: 'SEN' }
    ],
    rosterPerformance: [
      { name: 'TenZ', agent: 'Jett', acs: '235', k: '18', d: '16', a: '4', hs: '28%', adr: '148', kda: '1.37' },
      { name: 'Sayf', agent: 'Breach', acs: '210', k: '15', d: '15', a: '10', hs: '23%', adr: '135', kda: '1.67' },
      { name: 'Jamppi', agent: 'Omen', acs: '190', k: '13', d: '17', a: '6', hs: '20%', adr: '119', kda: '1.11' },
      { name: 'Nats', agent: 'Cypher', acs: '185', k: '12', d: '16', a: '8', hs: '25%', adr: '115', kda: '1.25' },
      { name: 'Redgar', agent: 'Astra', acs: '165', k: '10', d: '17', a: '12', hs: '18%', adr: '95', kda: '1.29' }
    ]
  }
];

export const initialRankings = [
  { rank: '01', team: 'Team Liquid', winRate: '76.0%', points: '2,890', trend: 'up', region: 'EMEA' },
  { rank: '02', team: 'Fnatic', winRate: '72.0%', points: '2,845', trend: 'up', region: 'EMEA' },
  { rank: '03', team: 'NAVI', winRate: '74.0%', points: '2,810', trend: 'down', region: 'EMEA' },
  { rank: '04', team: 'G2 Esports', winRate: '68.1%', points: '2,754', trend: 'up', region: 'Americas' },
  { rank: '05', team: 'Team Vitality', winRate: '65.3%', points: '2,698', trend: 'up', region: 'EMEA' },
  { rank: '06', team: 'KC Esports', winRate: '61.8%', points: '2,612', trend: 'down', region: 'EMEA' },
  { rank: '07', team: 'BBL Esports', winRate: '59.2%', points: '2,540', trend: 'stable', region: 'EMEA' },
  { rank: '08', team: 'Giants', winRate: '57.4%', points: '2,488', trend: 'down', region: 'EMEA' },
  { rank: '09', team: 'FUT Esports', winRate: '54.9%', points: '2,410', trend: 'up', region: 'EMEA' },
  { rank: '10', team: 'HEET', winRate: '52.1%', points: '2,330', trend: 'down', region: 'EMEA' },
  { rank: '11', team: 'Sentinels', winRate: '70.5%', points: '2,790', trend: 'up', region: 'Americas' },
  { rank: '12', team: 'Paper Rex', winRate: '75.2%', points: '2,850', trend: 'up', region: 'Pacific' },
  { rank: '13', team: 'DRX', winRate: '71.8%', points: '2,800', trend: 'stable', region: 'Pacific' },
  { rank: '14', team: 'LOUD', winRate: '69.4%', points: '2,760', trend: 'down', region: 'Americas' }
];

export const initialScheduleEvents = [
  { id: 1, dayName: 'Mon', dateNum: '21', events: [ { type: 'meeting', title: 'Team Meeting', time: '10:00' }, { type: 'vod', title: 'VOD Review', time: '14:00' } ] },
  { id: 2, dayName: 'Tue', dateNum: '22', events: [ { type: 'scrim', title: 'Scrim vs Fnatic', time: '16:00' } ] },
  { id: 3, dayName: 'Wed', dateNum: '23', events: [ { type: 'match', title: 'Match vs G2 — VCT EMEA', time: '18:00', active: true } ] },
  { id: 4, dayName: 'Thu', dateNum: '24', events: [ { type: 'scrim', title: 'Scrim vs NAVI', time: '15:00' } ] },
  { id: 5, dayName: 'Fri', dateNum: '25', events: [ { type: 'rest', title: 'Rest Day', time: 'All Day' } ] },
  { id: 6, dayName: 'Sat', dateNum: '26', events: [ { type: 'match', title: 'Match vs NAVI — VCT Champions', time: '20:00' } ] },
  { id: 7, dayName: 'Sun', dateNum: '27', events: [ { type: 'vod', title: 'VOD Review', time: '11:00' } ] }
];

export const initialChecklist = [
  { id: 'comms', text: 'Team comms check', checked: true },
  { id: 'agent', text: 'Agent lock confirmed', checked: true },
  { id: 'map', text: 'Map ban strategy reviewed', checked: false },
  { id: 'vod', text: 'Opponent VOD reviewed', checked: false },
  { id: 'warmup', text: 'Warmup complete', checked: false }
];

export const initialNotifications = [
  { id: 'match_reminders', label: 'Match Reminders', enabled: true },
  { id: 'scrim_alerts', label: 'Scrim Alerts', enabled: true },
  { id: 'rank_changes', label: 'Rank Changes', enabled: true },
  { id: 'weekly_reports', label: 'Weekly Reports', enabled: false },
  { id: 'system_updates', label: 'System Updates', enabled: false }
];

export const initialAgents = [
  { name: 'Killjoy', role: 'Sentinel', pick: '78%', win: '64%', trend: 'up' },
  { name: 'Astra', role: 'Controller', pick: '71%', win: '61%', trend: 'up' },
  { name: 'Breach', role: 'Initiator', pick: '68%', win: '58%', trend: 'up' },
  { name: 'Jett', role: 'Duelist', pick: '65%', win: '52%', trend: 'down' },
  { name: 'Sova', role: 'Initiator', pick: '62%', win: '60%', trend: 'stable' },
  { name: 'Viper', role: 'Controller', pick: '55%', win: '63%', trend: 'up' },
  { name: 'Neon', role: 'Duelist', pick: '48%', win: '49%', trend: 'down' },
  { name: 'Cypher', role: 'Sentinel', pick: '45%', win: '67%', trend: 'up' }
];
