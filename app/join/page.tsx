'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function JoinPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputStyle = {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px', // Changed to 16px to prevent iOS auto-zoom
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as 'border-box'
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const supabase = createClient();

      const { error } = await supabase.from('applications').insert([{
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        college: formData.get('college'),
        course: formData.get('course'),
        year: formData.get('year'),
        why_join: formData.get('why_join'),
        status: 'pending',
        created_at: new Date().toISOString()
      }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (error: any) {
      console.error("Submission Error:", error.message);
      alert("Submission failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#7A0102', fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '800' }}>Application Received!</h2>
        <p style={{ marginTop: '20px', color: '#555', lineHeight: '1.6' }}>
          Thank you for your interest in Sankalp. <br/> 
          We will review your application and reach out via email soon.
        </p>
        <div style={{ marginTop: '30px' }}>
            <a href="/" style={{ color: '#7A0102', fontWeight: 'bold', textDecoration: 'none' }}>← Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="join-container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: '800', margin: '0' }}>Join <span style={{ color: '#7A0102' }}>Sankalp UPSC</span></h1>
        <p style={{ color: '#666', marginTop: '10px', fontSize: '14px' }}>Fill out the form below to apply for society membership.</p>
      </div>

      <form onSubmit={handleSubmit} className="join-form" style={{ 
        display: 'grid', 
        gap: '20px', 
        backgroundColor: '#fff', 
        padding: '30px 20px', // Reduced padding for mobile
        borderRadius: '20px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid #eee' 
      }}>
        
        <div className="form-grid">
          <div>
            <label className="label-style">FULL NAME</label>
            <input name="full_name" placeholder="Enter your full name" required style={inputStyle} />
          </div>
          <div>
            <label className="label-style">EMAIL ADDRESS</label>
            <input name="email" type="email" placeholder="Enter your email" required style={inputStyle} />
          </div>
        </div>

        <div className="form-grid">
          <div>
            <label className="label-style">PHONE (WHATSAPP)</label>
            <input name="phone" type="tel" placeholder="+91 00000 00000" required style={inputStyle} />
          </div>
          <div>
            <label className="label-style">COLLEGE</label>
            <input name="college" placeholder="College name" required style={inputStyle} />
          </div>
        </div>

        <div className="form-grid">
          <div>
            <label className="label-style">COURSE</label>
            <input name="course" placeholder="e.g. B.A. Pol Science" required style={inputStyle} />
          </div>
          <div>
            <label className="label-style">YEAR OF STUDY</label>
            <select name="year" required style={inputStyle}>
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year / Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label-style">STATEMENT OF PURPOSE</label>
          <textarea 
            name="why_join" 
            placeholder="Tell us briefly why you want to join Sankalp UPSC..." 
            required 
            style={{ ...inputStyle, height: '120px', resize: 'none', fontFamily: 'inherit' }} 
          />
        </div>
        
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Processing...' : 'Submit Membership Application'}
        </button>
      </form>

      <style jsx>{`
        .label-style {
          font-size: 10px;
          font-weight: bold;
          color: #7A0102;
          display: block;
          margin-bottom: 6px;
          letter-spacing: 1px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .submit-btn {
          padding: 16px;
          background-color: #7A0102;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          font-size: 16px;
          transition: 0.3s;
          margin-top: 10px;
        }
        .submit-btn:active {
          transform: scale(0.98);
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr; /* Stack inputs on mobile */
            gap: 15px;
          }
          .join-container {
            padding: 20px 15px !important;
          }
          .join-form {
            padding: 25px 15px !important;
            border-radius: 15px;
          }
        }
      `}</style>
    </div>
  );
}