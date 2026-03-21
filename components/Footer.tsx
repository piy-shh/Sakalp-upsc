'use client';

import Link from 'next/link';
import { FaFacebookF,  FaLinkedinIn, FaInstagram, FaTelegramPlane, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    backgroundColor: '#000',
    color: '#fff',
    padding: '60px 8% 40px 8%', // Reduced from 100px for mobile comfort
    borderTop: '1px solid rgba(255,255,255,0.1)',
    fontFamily: 'sans-serif',
    width: '100%',
    boxSizing: 'border-box' as const
  };

  const gridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1400px',
    margin: '0 auto',
    flexWrap: 'wrap' as const,
    gap: '40px' // Tightened gap
  };

  const colStyle = {
    flex: '1',
    minWidth: '220px'
  };

  const linkStyle = {
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    display: 'block',
    marginBottom: '15px',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px'
  };

  const headingStyle = {
    color: '#fff',
    fontSize: '11px',
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    marginBottom: '30px',
    fontWeight: '900'
  };

  return (
    <footer style={footerStyle} className="footer-container">
      <div style={gridStyle} className="footer-grid">
        
        {/* Column 1: Brand/Vision */}
        <div style={{ ...colStyle, flex: '1.5' }} className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
             <span style={{ color: '#fff', fontWeight: '900', fontSize: '24px', letterSpacing: '-1.5px' }}>
                <span style={{ color: '#7A0102' }}>//</span> SANKALP
             </span>
          </div>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.4)', maxWidth: '320px' }} className="brand-desc">
            Nurturing future diplomats through premium guidance and a dedicated elite community at Delhi University.
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '35px' }} className="social-row">
            {[FaInstagram].map((Icon, idx) => (
              <a 
                key={idx} 
                href="https://www.instagram.com/sankalpupsc_" 
                style={{ color: '#fff', opacity: 0.4, transition: '0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.4'}
              >
                <Icon size={18} />
              </a>
            ))}
             {[  FaLinkedinIn].map((Icon, idx) => (
              <a 
                key={idx} 
                href="https://www.linkedin.com/company/sankalpupsc" 
                style={{ color: '#fff', opacity: 0.4, transition: '0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.4'}
              >
                <Icon size={18} />
              </a>
            ))}

                 {[FaTelegramPlane].map((Icon, idx) => (
              <a 
                key={idx} 
                href="https://t.me/sankalpupscsociety" 
                style={{ color: '#fff', opacity: 0.4, transition: '0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.4'}
              >
                <Icon size={18} />
              </a>
            ))}
               {[ FaYoutube].map((Icon, idx) => (
              <a 
                key={idx} 
                href="https://www.youtube.com/@Sankalpupsc_" 
                style={{ color: '#fff', opacity: 0.4, transition: '0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.4'}
              >
                <Icon size={18} />
              </a>
            ))}

          </div>
        </div>

        {/* Column 2: Navigation */}
        <div style={colStyle} className="footer-col">
          <h4 style={headingStyle}>Navigation</h4>
          <Link href="/#about" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color='#fff'} onMouseOut={(e) => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>The Mission</Link>
          <Link href="/#events" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color='#fff'} onMouseOut={(e) => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Field Operations</Link>
          <Link href="/team" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color='#fff'} onMouseOut={(e) => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>The Council</Link>
          <Link href="/join" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color='#fff'} onMouseOut={(e) => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Enlist Now</Link>
        </div>

        {/* Column 3: Information & Admin Portal */}
        <div style={colStyle} className="footer-col">
          <h4 style={headingStyle}>Information</h4>
          <Link href="/privacy" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color='#fff'} onMouseOut={(e) => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Privacy Policy</Link>
          <Link href="/terms" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color='#fff'} onMouseOut={(e) => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>Terms of Use</Link>
          
          {/* Subtle Admin Link - PRESERVED */}
          <Link 
            href="/login" 
            style={{ 
              ...linkStyle, 
              marginTop: '30px', 
              opacity: 0.15, 
              fontSize: '10px' 
            }} 
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'} 
            onMouseOut={(e) => e.currentTarget.style.opacity = '0.15'}
          >
            Admin Portal
          </Link>
        </div>

        {/* Column 4: Status Badge */}
        <div style={{ ...colStyle, textAlign: 'right' }} className="footer-col badge-col">
            <div style={{ 
              display: 'inline-block', 
              border: '1px solid rgba(122, 1, 2, 0.5)', 
              padding: '20px', 
              borderRadius: '4px',
              textAlign: 'center'
            }}>
               <div style={{ color: '#7A0102', fontSize: '10px', fontWeight: '900', letterSpacing: '2px', marginBottom: '5px' }}>OFFICIALLY RECOGNIZED</div>
               <div style={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}>NITI AAYOG</div>
               <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', marginTop: '5px' }}>UP/2026/SEC-SANKALP</div>
            </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '80px auto 0', 
        paddingTop: '30px', 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        fontSize: '11px', 
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: '1px'
      }} className="bottom-bar">
        <span>© {currentYear} SANKALP SOCIETY. ALL RIGHTS RESERVED.</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>BUILT FOR THE BOLD.</span>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid { flex-direction: column !important; gap: 50px !important; text-align: center !important; }
          .footer-col { width: 100% !important; min-width: unset !important; text-align: center !important; }
          .badge-col { text-align: center !important; }
          .brand-desc { margin: 0 auto !important; }
          .social-row { justify-content: center !important; }
          .bottom-bar { justify-content: center !important; text-align: center !important; flex-direction: column !important; }
        }
      `}</style>
    </footer>
  );
}