import React, { useState, useRef, useEffect } from 'react';

export default function Sidebar({ user, selectedGuild, onSelectGuild, activePage, setActivePage, mobileMenuOpen, setMobileMenuOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentGuild = user?.allowedGuilds?.find(g => g.id === selectedGuild);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('zenith_token');
    window.location.href = '/login';
  };

  const closeMobileMenu = () => {
    if (typeof setMobileMenuOpen === 'function') setMobileMenuOpen(false);
  };

  const handleClickEffect = (e) => {
    const item = e.currentTarget;
    item.classList.remove("clicked");
    void item.offsetWidth;
    item.classList.add("clicked");
  };

  return (
    <nav className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header dashboard-sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div className="sidebar-brand-block">
          <p className="sidebar-kicker">AI Moderation Platform</p>
          <h2 className="brand-text-glow">Zyntra</h2>
        </div>
        <button 
          className="btn-icon mobile-only" 
          onClick={closeMobileMenu}
          style={{ background: 'none', border: 'none', color: '#DBDEE1', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="guild-selector" id="guild-selector" ref={dropdownRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img 
          src={currentGuild?.icon ? `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
          alt="Guild" className="guild-icon" 
        />
        <span className="guild-name">{currentGuild?.name || 'Select Server'}</span>
        <i className="fa-solid fa-chevron-down"></i>
        
        <div className={`guild-dropdown ${dropdownOpen ? 'active' : ''}`}>
          {user?.allowedGuilds?.map(g => (
            <div 
              key={g.id} 
              className="guild-option" 
              onClick={(e) => { e.stopPropagation(); onSelectGuild(g.id); setDropdownOpen(false); closeMobileMenu(); }}
            >
              {g.icon ? (
                <img src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`} className="guild-icon" alt="" />
              ) : (
                <div className="guild-icon" style={{ background: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>#</div>
              )}
              <span className="guild-name">{g.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section-label">Workspace</div>
      <ul className="nav-links">

        <li className={activePage === 'overview' ? 'active' : ''} onClick={(e) => { handleClickEffect(e); setActivePage('overview'); closeMobileMenu(); }}>
          <i className="fa-solid fa-chart-pie"></i>
          <span>Overview</span>
        </li>

        <li className={activePage === 'moderation' ? 'active' : ''} onClick={(e) => { handleClickEffect(e); setActivePage('moderation'); closeMobileMenu(); }}>
          <i className="fa-solid fa-gavel"></i>
          <span>Moderation</span>
        </li>

        <li className={activePage === 'automod' ? 'active' : ''} onClick={(e) => { handleClickEffect(e); setActivePage('automod'); closeMobileMenu(); }}>
          <i className="fa-solid fa-shield-halved"></i>
          <span>Auto Moderation</span>
        </li>

        <li className={activePage === 'commands' ? 'active' : ''} onClick={(e) => { handleClickEffect(e); setActivePage('commands'); closeMobileMenu(); }}>
          <i className="fa-solid fa-terminal"></i>
          <span>Command Center</span>
        </li>

        <li className={activePage === 'docs' ? 'active' : ''} onClick={(e) => { handleClickEffect(e); setActivePage('docs'); closeMobileMenu(); }}>
          <i className="fa-solid fa-book"></i>
          <span>Docs & Guides</span>
        </li>

        {/* SECTION CHANGELOG */}
        <li className={activePage === 'changelog' ? 'active' : ''} onClick={(e) => { handleClickEffect(e); setActivePage('changelog'); closeMobileMenu(); }}>
          <i className="fa-solid fa-clock-rotate-left"></i>
          <span>Changelog</span>
        </li>

      </ul>

      <div className="sidebar-footer-note">
        <span className="sidebar-footer-dot"></span>
        <span>Built for fast moderation, safer communities, and contributor-friendly ops.</span>
      </div>

      <div className="user-profile" style={{ marginTop: 'auto' }}>
        <img 
          src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
          alt="User" className="user-avatar" 
        />
        <div className="user-info">
          <h4>{user?.username || 'Loading...'}</h4>
          <span className="logout-btn" onClick={handleLogout}>Log out</span>
        </div>
      </div>

      <style>{`
        .nav-links li {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.15s ease;
        }

        .nav-links li:hover {
          background: rgba(88, 101, 242, 0.12);
          transform: translateX(4px);
        }

        .nav-links li.active {
          background: linear-gradient(90deg, rgba(88,101,242,0.25), rgba(88,101,242,0.05));
          border-left: 3px solid #5865F2;
          padding-left: 17px;
        }

        .nav-links li::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(88,101,242,0.5);
          border-radius: 50%;
          transform: scale(0);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .nav-links li.clicked::after {
          transform: scale(18);
          opacity: 0;
        }
      `}</style>
    </nav>
  );
}
