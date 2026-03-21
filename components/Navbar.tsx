'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav style={{ 
      backdropFilter: 'blur(16px) saturate(180%)',
      backgroundColor: 'rgba(122, 1, 2, 0.95)', 
      padding: '16px 8%', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      position: 'fixed', 
      top: 0, 
      left: 0,
      width: '100%',
      zIndex: 2000,
      boxSizing: 'border-box',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
    }}>
      {/* BRANDING */}
      <Link href="/" style={{ 
        color: '#fff', 
        textDecoration: 'none', 
        fontWeight: '900', 
        fontSize: '22px',
        letterSpacing: '-1px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ color: 'rgba(255,255,255,0.5)' }}>//</span> SANKALP
      </Link>

      {/* MOBILE BURGER ICON */}
      <div 
        onClick={toggleMenu}
        style={{ 
          display: 'none', 
          flexDirection: 'column', 
          gap: '5px', 
          cursor: 'pointer',
          zIndex: 2001 
        }}
        className="burger-icon"
      >
        <div style={{ width: '25px', height: '2px', backgroundColor: '#fff', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }}></div>
        <div style={{ width: '25px', height: '2px', backgroundColor: '#fff', opacity: isOpen ? 0 : 1, transition: '0.3s' }}></div>
        <div style={{ width: '25px', height: '2px', backgroundColor: '#fff', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }}></div>
      </div>

      {/* NAVIGATION LINKS */}
      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        {['About', 'Events', 'Team'].map((item) => (
          <Link 
            key={item}
            href={item === 'Team' ? '/team' : `/#${item.toLowerCase()}`} 
            onClick={() => setIsOpen(false)}
            style={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontSize: '12px', 
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              opacity: 0.8,
              transition: '0.3s ease'
            }}
          >
            {item}
          </Link>
        ))}

        {/* CTA BUTTON */}
        <Link href="/join" onClick={() => setIsOpen(false)} style={{ 
          backgroundColor: '#fff', 
          color: '#7A0102', 
          padding: '10px 22px', 
          borderRadius: '8px', 
          fontWeight: '900', 
          textDecoration: 'none', 
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textAlign: 'center'
        }}>
          Join Portal
        </Link>
      </div>

      <style jsx>{`
        .nav-menu {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .burger-icon {
            display: flex !important;
          }

          .nav-menu {
            position: fixed;
            top: 0;
            right: ${isOpen ? '0' : '-100%'};
            height: 100vh;
            width: 70%;
            background: rgba(122, 1, 2, 0.98);
            flex-direction: column;
            justify-content: center;
            transition: 0.4s ease-in-out;
            backdrop-filter: blur(10px);
            box-shadow: -10px 0 30px rgba(0,0,0,0.3);
          }
        }
      `}</style>
    </nav>
  );
}