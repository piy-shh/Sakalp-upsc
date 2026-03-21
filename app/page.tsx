'use client';

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HomePage() {
  const [heroImages, setHeroImages] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const team = [
    { name: "Priyanshu Ranjan", role: "President", college: "Kirori Mal College" },
    { name: "Ananya Singh", role: "Vice President", college: "Hindu College" },
    { name: "Aditya Verma", role: "General Secretary", college: "Ramjas College" },
    { name: "Ishita Gupta", role: "Treasurer", college: "Hansraj College" },
    { name: "Rahul Meena", role: "Academic Head", college: "Miranda House" },
    { name: "Sneha Kapoor", role: "PR & Outreach", college: "SRCC" }
  ];

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      try {
        const [heroRes, eventRes, galleryRes] = await Promise.all([
          supabase.from('hero_slides').select('*').eq('is_active', true).order('created_at', { ascending: false }),
          supabase.from('events').select('*').order('event_date', { ascending: true }),
          supabase.from('gallery').select('*').order('created_at', { ascending: false })
        ]);
        setHeroImages(heroRes.data || []);
        setEvents(eventRes.data || []);
        setGallery(galleryRes.data || []);
      } catch (e) {
        console.error("Load error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return null;

  return (
    <div style={{ backgroundColor: '#fff', scrollBehavior: 'smooth', color: '#1a1a1a' }}>
      
      {/* 1. HERO SECTION (REVERSED & UPGRADED TYPOGRAPHY) */}
      <header style={{ 
        display: 'flex', 
        flexDirection: 'row-reverse', 
        padding: '100px 8%', 
        gap: '80px', // INCREASED GAP FOR MORE BREATHING SPACE
        alignItems: 'center', 
        flexWrap: 'wrap',
        minHeight: '80vh'
      }}>
        {/* TEXT SIDE */}
        <div style={{ flex: '1.2', minWidth: '320px' }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '6px 16px', 
            backgroundColor: 'rgba(122, 1, 2, 0.08)', 
            border: '1px solid rgba(122, 1, 2, 0.2)',
            borderRadius: '100px',
            color: '#7A0102',
            fontSize: '11px',
            fontWeight: '800',
            marginBottom: '24px',
            letterSpacing: '2px'
          }}>
            RECOGNIZED BY NITI AAYOG (UP/2025/0776675)
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(48px, 6vw, 78px)', 
            fontWeight: '900', 
            color: '#000', 
            lineHeight: '0.9', 
            letterSpacing: '-4px',
            margin: '0'
          }}>
            BECOME THE <br/> 
            <span style={{ color: '#7A0102' }}>ARCHITECT</span> <br/> 
            OF INDIA.
          </h1>
          
          <p style={{ fontSize: '19px', color: '#555', margin: '30px 0', maxWidth: '500px', lineHeight: '1.6' }}>
            The premier UPSC preparation community at Delhi University. <br/>
            Join an elite circle of aspirants dedicated to strategic leadership.
          </p>
          
          <Link href="/join">
            <button style={{ 
              padding: '18px 45px', 
              backgroundColor: '#7A0102', 
              color: 'white', 
              border: 'none', 
              borderRadius: '15px', 
              fontWeight: 'bold', 
              fontSize: '16px', 
              cursor: 'pointer', 
              boxShadow: '0 10px 20px rgba(122, 1, 2, 0.2)' 
            }}>
              Register Now
            </button>
          </Link>
        </div>

        {/* SLIDER SIDE */}
        <div style={{ 
          flex: '1.5', // INCREASED FLEX FOR A WIDER, UNCRUNCHED SLIDER
          minWidth: '320px', 
          borderRadius: '30px', 
          overflow: 'hidden', 
          boxShadow: '0 30px 60px rgba(0,0,0,0.12)', 
          border: '1px solid #eee' 
        }}>
          <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3500 }} pagination={{ clickable: true }} loop={true} style={{ height: '500px' }}>
            {heroImages.map((img) => (
              <SwiperSlide key={img.id}>
                <img src={img.image_url} alt="Sankalp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>

      {/* 2. ABOUT SECTION */}
      <section id="about" style={{ padding: '100px 8%', backgroundColor: '#fcfcfc' }}>
        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1', minWidth: '320px' }}>
            <span style={{ color: '#7A0102', fontWeight: 'bold', letterSpacing: '2px', fontSize: '24px' }}>ABOUT OUR SOCIETY</span>
            <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '15px 0' }}>संकल्प: <span style={{ color: '#7A0102' }}>सेवा शक्ति</span></h2>
            <p style={{ color: '#666', lineHeight: '1.8', fontSize: '16px' }}>
              Sankalp is the premier UPSC-focused academic society at the University of Delhi. 
              We provide a structured environment for civil services aspirants, offering expert mentorship, 
              GS discussion clubs, and comprehensive test series guidance.
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '320px' }}>
             <img 
               src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000" 
               style={{ width: '100%', borderRadius: '20px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }} 
               alt="About Group" 
             />
          </div>
        </div>
      </section>

      {/* 3. EVENTS SECTION */}
      <section id="events" style={{ padding: '80px 8%' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '40px', borderLeft: '6px solid #7A0102', paddingLeft: '20px' }}>Upcoming Events</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {events.length > 0 ? events.map((event) => (
            <div key={event.id} style={{ borderRadius: '20px', backgroundColor: '#fff', border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <img src={event.image_url || 'https://via.placeholder.com/400x200'} alt={event.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <div style={{ color: '#7A0102', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>{event.event_date}</div>
                <h3 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>{event.title}</h3>
                <button onClick={() => setSelectedEvent(event)} style={{ background: 'none', border: 'none', color: '#7A0102', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>View Details →</button>
              </div>
            </div>
          )) : <p style={{ color: '#999' }}>Stay tuned for upcoming events!</p>}
        </div>
      </section>

      {/* 4. GALLERY SECTION */}
      <section id="gallery" style={{ padding: '100px 8%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '800', marginBottom: '50px' }}>Society <span style={{ color: '#7A0102' }}>Gallery</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {gallery.map((item) => (
            <div key={item.id} style={{ borderRadius: '15px', overflow: 'hidden', height: '250px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <img src={item.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gallery" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEAM SECTION */}
      
      {/* 5. TEAM SECTION */}
<section id="team" style={{ padding: '120px 8%', backgroundColor: '#fcfcfc' }}>
  {/* CSS for Flip Animation */}
  <style>{`
    .council-card {
      perspective: 1000px;
      height: 400px;
      cursor: pointer;
    }
    .council-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.8s;
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
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.04);
      border: 1px solid #eee;
    }
    .card-front {
      background-color: #fff;
    }
    .card-back {
      background-color: #000;
      color: white;
      transform: rotateY(180deg);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
      text-align: center;
    }
  `}</style>

  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
    <div>
      <span style={{ color: '#7A0102', fontWeight: '900', letterSpacing: '3px', fontSize: '12px' }}>EXECUTIVE LEADERSHIP</span>
      <h2 style={{ fontSize: '42px', fontWeight: '900', marginTop: '10px', letterSpacing: '-1px' }}>The <span style={{ color: '#7A0102' }}>Council</span></h2>
    </div>
    <Link href="/team">
      <button style={{ 
        padding: '12px 30px', 
        border: '1px solid #7A0102', 
        backgroundColor: 'transparent', 
        color: '#7A0102', 
        borderRadius: '8px', 
        fontWeight: '700', 
        cursor: 'pointer' 
      }}>
        View Full Hierarchy →
      </button>
    </Link>
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
    {[
      { name: "Shagun Sharma", role: "President",  image: "/team/shgun.jpeg" },
      { name: "Akanksha Shama", role: "Vice President",  image: "/team/akansha.jpeg" },
      { name: "Umesh Yadav", role: "Chief Executive Secretary", image: "/team/umesh.jpeg" },
      { name: "Shubhya Pandey", role: "Joint Secretary",  image: "/team/shubha.jpeg" }
    ].map((m, i) => (
      <div key={i} className="council-card">
        <div className="council-card-inner">
          
          {/* FRONT: ONLY IMAGE */}
          <div className="card-front">
            <img 
              src={m.image} 
              alt={m.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300x400?text=" + m.name.split(' ')[0]; }}
            />
          </div>

          {/* BACK: ROLE & DETAILS */}
          <div className="card-back">
            <div style={{ color: '#7A0102', fontSize: '40px', fontWeight: '900', marginBottom: '10px', opacity: 0.3 }}>{m.name[0]}</div>
            <h3 style={{ fontSize: '24px', margin: '0 0 10px 0', fontWeight: '800' }}>{m.name}</h3>
            <p style={{ color: '#7A0102', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>{m.role}</p>
            <p style={{ color: '#888', fontSize: '13px', marginTop: '15px', lineHeight: '1.5' }}>{m.college}</p>
          </div>

        </div>
      </div>
    ))}
  </div>
</section>


      {/* END TEAM SECTION */}
      {/* EVENT MODAL */}
      {selectedEvent && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '25px', maxWidth: '500px', width: '90%', position: 'relative' }}>
            <button onClick={() => setSelectedEvent(null)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: '#eee', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ color: '#7A0102' }}>{selectedEvent.title}</h2>
            <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}