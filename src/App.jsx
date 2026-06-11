import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Roster from './pages/Roster';
import Matches from './pages/Matches';
import Rankings from './pages/Rankings';
import Schedule from './pages/Schedule';
import Insights from './pages/Insights';
import Settings from './pages/Settings';

import {
  initialRoster,
  initialMatches,
  initialRankings,
  initialScheduleEvents,
  initialChecklist,
  initialNotifications
} from './data/state';

function App() {
  // Shared state hooks
  const [roster, setRoster] = useState(initialRoster);
  const [matches, setMatches] = useState(initialMatches);
  const [rankings, setRankings] = useState(initialRankings);
  const [scheduleEvents, setScheduleEvents] = useState(initialScheduleEvents);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchVal, setSearchVal] = useState('');
  const [selectedMatchId, setSelectedMatchId] = useState(1); // Default to Fnatic (ID 1)

  // Bundled context value to pass to layout/outlet
  const contextValue = {
    roster,
    setRoster,
    matches,
    setMatches,
    rankings,
    scheduleEvents,
    checklist,
    setChecklist,
    notifications,
    setNotifications,
    searchVal,
    onSearchChange: setSearchVal,
    selectedMatchId,
    setSelectedMatchId
  };

  return (
    <Routes>
      <Route element={<Layout contextValue={contextValue} />}>
        <Route path="/" element={<Overview />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
