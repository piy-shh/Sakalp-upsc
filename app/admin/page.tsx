'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { 
  addEvent, 
  uploadGalleryImage, 
  getApplicationStats, 
  getApplications, 
  updateApplicationStatus, 
  deleteApplication,
  uploadHeroImage,
  getHeroImages,
  deleteHeroImage,
  getApprovedMembers 
} from './actions';

export default function AdminPage() {
  const router = useRouter();

  // --- 1. ALL STATE HOOKS ---
  const [activeTab, setActiveTab] = useState('applications');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [applications, setApplications] = useState<any[]>([]);
  const [approvedMembers, setApprovedMembers] = useState<any[]>([]);
  const [heroImages, setHeroImages] = useState<any[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // --- 2. DATA LOADING CALLBACK ---
  const loadData = useCallback(async () => {
    try {
      const [s, apps, heros, members] = await Promise.all([
        getApplicationStats(),
        getApplications(),
        getHeroImages(),
        getApprovedMembers() 
      ]);
      setStats(s || { pending: 0, approved: 0, rejected: 0 });
      setApplications(apps || []);
      setHeroImages(heros || []);
      setApprovedMembers(members || []);
    } catch (err) {
      console.error("Data Load Error:", err);
    }
  }, []);

  // --- 3. ALL USEEFFECT HOOKS ---
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const isAdmin = user?.app_metadata?.role === 'admin';

      if (!user || !isAdmin) {
        router.push('/login');
      } else {
        setAuthLoading(false);
      }
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    if (!authLoading) {
      loadData();
    }
  }, [loadData, activeTab, authLoading]);

  // --- 4. ACTION HANDLERS ---
  const handleAction = async (id: string, action: 'approved' | 'rejected' | 'delete') => {
    setProcessingId(id);
    let res;
    if (action === 'delete') {
      if(!confirm("Delete this application permanently?")) {
        setProcessingId(null);
        return;
      }
      res = await deleteApplication(id);
    } else {
      res = await updateApplicationStatus(id, action);
    }

    if (res?.success) {
      loadData();
    } else {
      alert("Error: " + (res?.error || "Unknown error"));
    }
    setProcessingId(null);
  };

  const downloadCSV = () => {
    const headers = "Name,Email,College,Course,Year\n";
    const rows = approvedMembers.map(m => 
      `"${m.full_name}","${m.email}","${m.college}","${m.course}","${m.year}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `Sankalp_Members_${new Date().toLocaleDateString()}.csv`);
    a.click();
  };

  // --- 5. STYLES (MOBILE RESPONSIVE) ---
  const containerStyle = { 
    padding: '20px 5%', 
    maxWidth: '1200px', 
    margin: '0 auto', 
    boxSizing: 'border-box' as const,
    width: '100%'
  };
  
  const cardStyle = { 
    backgroundColor: 'white', 
    padding: '20px', 
    borderRadius: '12px', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
    border: '1px solid #eee', 
    marginBottom: '20px',
    boxSizing: 'border-box' as const 
  };
  
  const inputStyle = { 
    width: '100%', 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #ddd', 
    marginTop: '8px', 
    marginBottom: '15px', 
    boxSizing: 'border-box' as const,
    fontSize: '16px' // Stops mobile zoom
  };
  
  const primaryBtn = { 
    backgroundColor: '#7A0102', 
    color: 'white', 
    padding: '12px 25px', 
    borderRadius: '8px', 
    border: 'none', 
    fontWeight: 'bold' as const, 
    cursor: 'pointer' 
  };

  // Loading State
  if (authLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #7A0102', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#666' }}>Verifying Admin Credentials...</p>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header - Stacks on Mobile */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ color: '#7A0102', fontSize: 'clamp(24px, 6vw, 32px)', margin: 0, fontWeight: '800' }}>Sankalp Admin</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>Society Management Portal</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '350px' }}>
          <button onClick={() => window.location.href = '/'} style={{ flex: 1, background: 'white', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>View Site</button>
          <button onClick={async () => { 
            const s = createClient(); 
            await s.auth.signOut(); 
            router.push('/login'); 
          }} style={{ flex: 1, background: '#eee', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>Logout</button>
        </div>
      </div>

      {/* Stats - Grid Stacking */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
        gap: '15px', 
        marginBottom: '40px' 
      }}>
        <div style={{ ...cardStyle, borderLeft: '5px solid #ffa000', marginBottom: 0 }}>
          <div style={{ fontSize: '10px', color: '#888' }}>PENDING</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pending}</div>
        </div>
        <div style={{ ...cardStyle, borderLeft: '5px solid #2e7d32', marginBottom: 0 }}>
          <div style={{ fontSize: '10px', color: '#888' }}>APPROVED</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.approved}</div>
        </div>
        <div style={{ ...cardStyle, borderLeft: '5px solid #c62828', marginBottom: 0 }}>
          <div style={{ fontSize: '10px', color: '#888' }}>REJECTED</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.rejected}</div>
        </div>
      </div>

      {/* Tabs - Horizontal Scroll on Mobile */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px', 
        borderBottom: '1px solid #eee', 
        paddingBottom: '10px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        {['applications', 'members', 'events', 'gallery', 'hero'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px',
            backgroundColor: activeTab === tab ? '#7A0102' : 'transparent', color: activeTab === tab ? 'white' : '#666',
            flexShrink: 0
          }}>{tab.toUpperCase()}</button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'applications' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))', gap: '20px' }}>
          {applications.filter(a => a.status === 'pending').length === 0 ? <p style={{textAlign: 'center', opacity: 0.5}}>No pending applications.</p> : 
          applications.filter(a => a.status === 'pending').map(app => (
            <div key={app.id} style={cardStyle}>
              <h3 style={{fontSize: '18px', marginBottom: '5px'}}>{app.full_name}</h3>
              <p style={{ color: '#7A0102', fontWeight: 'bold', fontSize: '13px' }}>{app.course} • {app.college}</p>
              <div style={{ fontSize: '13px', background: '#f5f5f5', padding: '12px', margin: '15px 0', borderRadius: '6px' }}>"{app.why_join}"</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleAction(app.id, 'approved')} style={{ flex: 1, padding: '12px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Approve</button>
                <button onClick={() => handleAction(app.id, 'rejected')} style={{ flex: 1, padding: '12px', background: '#555', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'members' && (
        <div style={{...cardStyle, padding: '15px'}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{margin: 0, fontSize: '18px'}}>Members ({approvedMembers.length})</h3>
            <button onClick={downloadCSV} style={{ ...primaryBtn, padding: '8px 15px', fontSize: '11px', backgroundColor: '#2e7d32' }}>Export Excel</button>
          </div>
          {/* Scrollable Table Container */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '600px', textAlign: 'left', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '12px' }}>NAME</th>
                  <th style={{ padding: '12px' }}>COLLEGE</th>
                  <th style={{ padding: '12px' }}>EMAIL</th>
                  <th style={{ padding: '12px' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {approvedMembers.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '12px' }}>{m.full_name}</td>
                    <td style={{ padding: '12px' }}>{m.college}</td>
                    <td style={{ padding: '12px' }}>{m.email}</td>
                    <td style={{ padding: '12px' }}><button onClick={() => handleAction(m.id, 'rejected')} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(activeTab === 'events' || activeTab === 'gallery' || activeTab === 'hero') && (
        <div style={cardStyle}>
          <h3 style={{fontSize: '18px', marginBottom: '20px'}}>Update {activeTab.toUpperCase()}</h3>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fd = new FormData(e.currentTarget);
            let res;
            if (activeTab === 'events') res = await addEvent(fd);
            else if (activeTab === 'hero') res = await uploadHeroImage(fd);
            else res = await uploadGalleryImage(fd);
            setLoading(false);
            if(res.success) { alert("Successfully Updated!"); loadData(); e.currentTarget.reset(); }
          }}>
            {activeTab === 'gallery' && <input name="title" placeholder="Image Title" required style={inputStyle} />}
            {activeTab === 'events' && (
              <>
                <input name="title" placeholder="Event Name" required style={inputStyle} />
                <input name="event_date" type="date" required style={inputStyle} />
                <textarea name="description" placeholder="Short Event Description" style={{...inputStyle, height: '100px'}} />
              </>
            )}
            <input name="image" type="file" accept="image/*" required style={inputStyle} />
            <button type="submit" disabled={loading} style={{...primaryBtn, width: '100%'}}>{loading ? 'Processing...' : `Post to ${activeTab}`}</button>
          </form>
        </div>
      )}
    </div>
  );
}