'use client';

import { login } from './actions';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await login(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // SUCCESS: Hard redirect to /admin
        window.location.href = '/admin';
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  // Senior Dev Style Objects
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f5',
    padding: '20px',
    fontFamily: 'sans-serif'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e4e4e7'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #d4d4d8',
    marginTop: '8px',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box' as const
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#7A0102',
    color: 'white',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600' as const,
    cursor: 'pointer',
    marginTop: '20px',
    transition: '0.2s',
    opacity: loading ? 0.7 : 1
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            background: '#7A0102', 
            color: 'white', 
            width: '40px', 
            height: '40px', 
            margin: '0 auto 16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: '10px', 
            fontWeight: 'bold',
            fontSize: '20px'
          }}>S</div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#18181b', margin: '0' }}>Welcome Back</h1>
          <p style={{ color: '#71717a', marginTop: '8px', fontSize: '14px' }}>Sign in to your Sankalp Account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#3f3f46' }}>Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="name@example.com" 
              required 
              style={inputStyle} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#3f3f46' }}>Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              style={inputStyle} 
            />
          </div>

          {error && (
            <div style={{ 
              backgroundColor: '#fef2f2', 
              color: '#dc2626', 
              padding: '12px', 
              borderRadius: '8px', 
              fontSize: '13px', 
              marginBottom: '20px',
              border: '1px solid #fee2e2'
            }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#71717a', fontSize: '14px', textDecoration: 'none' }}>
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}