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
    fontSize: '14px',
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
        phone: formData.get('phone'), // Added this to fix the database error
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
      <div style={{ padding: '100px 8%', textAlign: 'center', minHeight: '60vh', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#7A0102', fontSize: '32px', fontWeight: '800' }}>Application Received!</h2>
        <p style={{ marginTop: '20px', color: '#555' }}>
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
    <div style={{ padding: '60px 8%', maxWidth: '800px', margin: '0 auto', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800' }}>Join <span style={{ color: '#7A0102' }}>Sankalp UPSC</span></h1>
        <p style={{ color: '#666', marginTop: '10px' }}>Fill out the form below to apply for society membership.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ 
        display: 'grid', 
        gap: '20px', 
        backgroundColor: '#fff', 
        padding: '40px', 
        borderRadius: '25px', 
        boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
        border: '1px solid #eee' 
      }}>
        {/* Row 1: Name & Email */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A0102', display: 'block', marginBottom: '5px', letterSpacing: '1px' }}>FULL NAME</label>
            <input name="full_name" placeholder="Enter your full name" required style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A0102', display: 'block', marginBottom: '5px', letterSpacing: '1px' }}>EMAIL ADDRESS</label>
            <input name="email" type="email" placeholder="Enter your email" required style={inputStyle} />
          </div>
        </div>

        {/* Row 2: Phone & College */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A0102', display: 'block', marginBottom: '5px', letterSpacing: '1px' }}>PHONE NUMBER (WHATSAPP)</label>
            <input name="phone" type="tel" placeholder="e.g. +91 9876543210" required style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A0102', display: 'block', marginBottom: '5px', letterSpacing: '1px' }}>COLLEGE</label>
            <input name="college" placeholder="e.g. Kirori Mal College" required style={inputStyle} />
          </div>
        </div>

        {/* Row 3: Course & Year */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A0102', display: 'block', marginBottom: '5px', letterSpacing: '1px' }}>COURSE</label>
            <input name="course" placeholder="e.g. B.A. Pol Science" required style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A0102', display: 'block', marginBottom: '5px', letterSpacing: '1px' }}>YEAR OF STUDY</label>
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
          <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A0102', display: 'block', marginBottom: '5px', letterSpacing: '1px' }}>STATEMENT OF PURPOSE</label>
          <textarea 
            name="why_join" 
            placeholder="Tell us briefly why you want to join Sankalp UPSC..." 
            required 
            style={{ ...inputStyle, height: '120px', resize: 'none', fontFamily: 'inherit' }} 
          />
        </div>
        
        <button type="submit" disabled={loading} style={{ 
          padding: '18px', 
          backgroundColor: '#7A0102', 
          color: 'white', 
          border: 'none', 
          borderRadius: '12px', 
          fontWeight: 'bold', 
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          boxShadow: '0 8px 15px rgba(122, 1, 2, 0.2)',
          transition: '0.3s'
        }}>
          {loading ? 'Processing...' : 'Submit Membership Application'}
        </button>
      </form>
    </div>
  );
}
export async function getApprovedMembers() {
  const supabase = await createClient(); // Ensure createClient is imported in this file
  
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('status', 'approved')
    .order('full_name', { ascending: true });

  if (error) {
    console.error("Error fetching members:", error.message);
    return [];
  }
  return data || [];
}