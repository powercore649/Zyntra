import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

import Overview from './Overview';
import Moderation from './Moderation';
import AutoMod from './AutoMod';
import Commands from './Commands';
import Docs from './Docs';
import Changelog from './Changelog';

export default function Dashboard() {
  const [activePage, setActivePage] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar 
        activePage={activePage}
        setActivePage={setActivePage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="dashboard-content">
        {activePage === 'overview' && <Overview />}
        {activePage === 'moderation' && <Moderation />}
        {activePage === 'automod' && <AutoMod />}
        {activePage === 'commands' && <Commands />}
        {activePage === 'docs' && <Docs />}
        {activePage === 'changelog' && <Changelog />}
      </div>
    </div>
  );
}
