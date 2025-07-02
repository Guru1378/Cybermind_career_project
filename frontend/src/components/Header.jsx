import React from 'react';

const Header = ({ onCreateJob }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '32px 0 24px 0',
      background: '#fff',
      // borderBottom removed
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        // Remove border, add more borderRadius for rounded look
        borderRadius: 24,
        boxShadow: '0 2px 12px rgba(160,132,238,0.08)',
        padding: '12px 32px',
        minWidth: 700,
        maxWidth: 900,
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <img
        src="/company_logo.jpeg"
        alt="Logo"
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          objectFit: 'cover',
          marginRight: 32,
        }}
      />
      {/* Navigation */}
      <nav style={{ display: 'flex', gap: 32, alignItems: 'center', flex: 1 }}>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Home</a>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Find Jobs</a>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Find Talents</a>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>About us</a>
        <a href="#" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Testimonials</a>
      </nav>
      {/* Create Jobs Button */}
      <button
        onClick={onCreateJob}
        style={{
          background: 'linear-gradient(90deg, #a084ee 0%, #8b5cf6 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 24,
          padding: '10px 28px',
          fontWeight: 600,
          fontSize: 16,
          marginLeft: 32,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(160,132,238,0.10)'
        }}
      >
        Create Jobs
      </button>
    </div>
  </div>
);

export default Header;