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
        { name: "Shagun Sharma", role: "President", college: "Kirori Mal College", image: "/team/shgun.jpeg", backImage: "shgun-desc.jpeg" },
        { name: "Akanksha Sharma", role: "Vice President", college: "Hindu College", image: "/team/akansha.jpeg", backImage: "akansha-desc.jpeg" },
        { name: "Umesh Yadav", role: "Chief Executive Secretary", college: "Ramjas College", image: "/team/umesh.jpeg", backImage: "umesh-desc.jpeg" },
        { name: "Shubhya Pandey", role: "Joint Secretary", college: "Hansraj College", image: "/team/shubha.jpeg", backImage: "shubha-desc.jpeg" },
        { name: "Kalpana Pathak", role: "General Secretary", college: "Hansraj College", image: "/team/kalpna.jpeg", backImage: "kalpna-desc.jpeg" },
        { name: "Prince & Aashna", role: "Joint Secretaries", college: "Hansraj College", image: "prince and aashna.jpeg", backImage: "prince-desc.jpeg" }
      ]
    },
    {
      title: "Department Heads",
      description: "Leading the specialized wings of the society from academics to outreach.",
      members: [
        { name: "Piyush Raj", role: "Technical Team Head",  image: "piyush-techhead.jpeg", backImage: "desc-techheadpiyu.jpeg" },
        { name: "Vrinda &  Bhumika", role: "Creative Team Head", image: "creative.jpeg", backImage: "creative-desc1.jpeg" },
        { name: "Hrishita & Kanya", role: "Orgainizing Team Head",  image: "organising-team.jpeg", backImage: "organising-desc.jpeg" },
         { name: "Abhilasha & Monalisa", role: "Content Team Head",  image: "com.jpeg", backImage: "content-desc1.jpeg" },
        { name: "Geetanshu &  Upwan", role: "PR & Sponsorship Team Head", image: "prp.jpeg", backImage: "pr1.jpeg" },
        { name: "Ekta & Amisha", role: "Social Media Team Head",  image: "socialmedia.jpeg", backImage: "social-desc.jpeg" }
        
      
      ]
    }
  ];

  return (
    <main style={{ backgroundColor: '#fff' }}>
      <Navbar />
      
      <style>{`
        .council-card {
          perspective: 1200px;
          height: 420px;
          cursor: pointer;
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
        /* BACK SIDE STYLING */
        .card-back {
          background-color: #000;
          color: white;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 30px;
          text-align: center;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        /* Overlay to ensure text visibility over the back image */
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
        .card-back::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 5px;
          background: #7A0102;
          z-index: 3;
        }
      `}</style>

      {/* Hero Header */}
      <header style={{ padding: '200px 8% 100px 8%', backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '5px 15px', border: '1px solid #7A0102', borderRadius: '50px', color: '#7A0102', fontSize: '11px', fontWeight: '900', letterSpacing: '3px', marginBottom: '25px' }}>
          ESTABLISHED 2025
        </div>
        <h1 style={{ fontSize: 'clamp(45px, 7vw, 90px)', fontWeight: '900', margin: '0', letterSpacing: '-4px', lineHeight: 0.9 }}>
          The <span style={{ color: '#7A0102' }}>Registry.</span>
        </h1>
        <p style={{ maxWidth: '600px', margin: '30px auto 0', opacity: 0.5, fontSize: '18px', lineHeight: '1.7', fontWeight: '400' }}>
          Meet the minds shaping the future of civil services preparation at Delhi University.
        </p>
      </header>

      {/* Team Categories */}
      <section style={{ padding: '100px 8%' }}>
        {categories.map((cat, idx) => (
          <div key={idx} style={{ marginBottom: '120px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '50px' }}>
                <div style={{ height: '2px', width: '40px', backgroundColor: '#7A0102' }}></div>
                <h2 style={{ fontSize: '32px', fontWeight: '900', margin: 0, letterSpacing: '-1px' }}>{cat.title}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px' }}>
              {cat.members.map((m, i) => (
                <div key={i} className="council-card">
                  <div className="council-card-inner">
                    
                    {/* Front Side */}
                    <div className="card-front">
                      <img 
                        src={m.image} 
                        alt={m.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x500?text=Profile"; }}
                      />
                    </div>

                    {/* Back Side with Second Image */}
                    <div className="card-back" style={{ backgroundImage: `url(${m.backImage})` }}>
                       <div className="card-content">
                          <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', fontWeight: '900', letterSpacing: '-0.5px' }}>{m.name}</h3>
                          <p style={{ color: '#7A0102', fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>{m.role}</p>
                          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '500' }}>{m.college}</p>
                       </div>
                    </div>

                  </div>
                </div>
              )
              
              
              
              
              )}
            </div>
          </div>
        ))}
      </section>

   
    </main>
  );
}