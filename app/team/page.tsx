'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TeamPage() {
  const categories = [
    {
      title: "Society Heads",
      description: "The primary architects of Sankalp's vision and national strategy.",
      members: [
        { name: "Shagun Sharma", role: "President", image: "/team/shgun.jpeg", backImage: "/team/shgun-desc.jpeg" },
        { name: "Akanksha Sharma", role: "Vice President", image: "/team/akansha.jpeg", backImage: "/team/akansha-desc.jpeg" },
        { name: "Umesh Yadav", role: "Chief Executive Secretary",  image: "/team/umesh.jpeg", backImage: "/team/umesh-desc.jpeg" },
        { name: "Shubhya Pandey", role: "Joint Secretary", image: "/team/shubha.jpeg", backImage: "/team/shubha-desc.jpeg" },
        { name: "Kalpana Pathak", role: "General Secretary", image: "/team/kalpna.jpeg", backImage: "/team/kalpna-desc.jpeg" },
        { name: "Prince & Aashna", role: "Joint Secretaries",  image: "/team/prince-and-aashna.jpeg", backImage: "/team/prince-desc.jpeg" }
      ]
    },
    {
      title: "Department Heads",
      description: "Leading the specialized wings of the society from academics to outreach.",
      members: [
        { name: "Piyush Raj", role: "Technical Team Head",  image: "/team/piyush-techhead.jpeg", backImage: "/team/desc-techheadpiyu.jpeg" },
        { name: "Vrinda &  Bhumika", role: "Creative Team Head", image: "/team/creative.jpeg", backImage: "/team/creative-desc1.jpeg" },
        { name: "Hrishita & Kanya", role: "Orgainizing Team Head",  image: "/team/organising-team.jpeg", backImage: "/team/organising-desc.jpeg" },
         { name: "Abhilasha & Monalisa", role: "Content Team Head",  image: "/team/com.jpeg", backImage: "/team/content-desc1.jpeg" },
        { name: "Geetanshu &  Upwan", role: "PR & Sponsorship Team Head", image: "/team/prp.jpeg", backImage: "/team/pr1.jpeg" },
        { name: "Ekta & Amisha", role: "Social Media Team Head",  image: "/team/socialmedia.jpeg", backImage: "/team/social-desc.jpeg" }
      ]
    }
  ];

  return (
    <main style={{ backgroundColor: '#fff', width: '100%', overflowX: 'hidden' }}>
      <Navbar />
      
      <style>{`
        .council-card {
          perspective: 1200px;
          height: 420px;
          cursor: pointer;
          width: 100%;
          max-width: 340px;
          margin: 0 auto;
        }
        .council-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .council-card:hover .council-card-inner {
          transform: rotateY(180deg);
        }
        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid #eee;
        }
        .card-front {
          background-color: #f8f8f8;
        }
        .card-back {
          background-color: #000;
          color: white;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          text-align: center;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .card-back::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85));
          z-index: 1;
        }
        .card-content {
          position: relative;
          z-index: 2;
        }
      `}</style>

      {/* Hero Header - Fixed Padding */}
      <header style={{ 
        padding: '180px 5% 80px 5%', 
        backgroundColor: '#000', 
        color: '#fff', 
        textAlign: 'center',
        boxSizing: 'border-box',
        width: '100%' 
      }}>
        <div style={{ display: 'inline-block', padding: '5px 15px', border: '1px solid #7A0102', borderRadius: '50px', color: '#7A0102', fontSize: '11px', fontWeight: '900', letterSpacing: '3px', marginBottom: '25px' }}>
          ESTABLISHED 2025
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: '900', margin: '0', letterSpacing: '-2px', lineHeight: 1 }}>
          The <span style={{ color: '#7A0102' }}>Registry.</span>
        </h1>
        <p style={{ maxWidth: '600px', margin: '20px auto 0', opacity: 0.5, fontSize: '16px', lineHeight: '1.6' }}>
          Meet the minds shaping the future of civil services preparation at Delhi University.
        </p>
      </header>

      {/* Team Categories - Fixed Grid and Width */}
      <section style={{ padding: '60px 5%', boxSizing: 'border-box', width: '100%' }}>
        {categories.map((cat, idx) => (
          <div key={idx} style={{ marginBottom: '80px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                <div style={{ height: '2px', width: '30px', backgroundColor: '#7A0102' }}></div>
                <h2 style={{ fontSize: '28px', fontWeight: '900', margin: 0 }}>{cat.title}</h2>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '25px',
              width: '100%' 
            }}>
              {cat.members.map((m, i) => (
                <div key={i} className="council-card">
                  <div className="council-card-inner">
                    <div className="card-front">
                      <img 
                        src={m.image} 
                        alt={m.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x500?text=Profile"; }}
                      />
                    </div>
                    <div className="card-back" style={{ backgroundImage: `url(${m.backImage})` }}>
                       <div className="card-content">
                          <h3 style={{ fontSize: '22px', margin: '0 0 5px 0', fontWeight: '900' }}>{m.name}</h3>
                          <p style={{ color: '#7A0102', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>{m.role}</p>
                          {/* @ts-ignore */}
                          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>{m.college}</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

    </main>
  );
}