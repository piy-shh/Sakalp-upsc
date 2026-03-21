'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ 
      backdropFilter: 'blur(16px) saturate(380%)',
      backgroundColor: 'rgba(122, 1, 2, 0.9)', // Deep Burgundy with Transparency
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
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Subtle light border
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

      {/* NAVIGATION LINKS */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        {['About', 'Events', 'Team'].map((item) => (
          <Link 
            key={item}
            href={`/#${item.toLowerCase()}`} 
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
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.letterSpacing = '2px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.letterSpacing = '1.5px';
            }}
          >
            {item}
          </Link>
        ))}

        {/* CTA BUTTON - High Contrast White */}
        <Link href="/join" style={{ 
          backgroundColor: '#fff', 
          color: '#7A0102', 
          padding: '10px 22px', 
          borderRadius: '8px', 
          fontWeight: '900', 
          textDecoration: 'none', 
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#fff';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        >
          Join Portal
        </Link>
      </div>
    </nav>
  );
}