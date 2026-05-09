import React from 'react';

export default function Changelog() {
  return (
    <div className="page-content">
      <h1 className="brand-text-glow">Changelog</h1>
      <p className="page-description">Latest updates and improvements to Zyntra.</p>

      <div className="changelog-list">
        <div className="changelog-card glass-panel">
          <h2>v1.0.0</h2>
          <span className="changelog-date">2026-05-09</span>
          <ul>
            <li>Added Changelog page</li>
            <li>Improved sidebar animations</li>
            <li>Enhanced login loading effects</li>
          </ul>
        </div>
      </div>

      <style>{`
        .changelog-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
        }

        .changelog-card {
          padding: 20px;
          border-radius: 12px;
          animation: fadeIn 0.4s ease;
        }

        .changelog-date {
          font-size: 0.9rem;
          opacity: 0.7;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
