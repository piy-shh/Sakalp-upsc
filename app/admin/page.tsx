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

  // --- 1. ALL STATE HOOKS AT THE TOP ---
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
  
  // Security Check Effect
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

  // Data Loading Effect
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

  // --- 5. EARLY RETURNS (Sit below the hooks) ---
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

  // Styles
  const containerStyle = { padding: '40px 5%', maxWidth: '1200px', margin: '0 auto' };
  const cardStyle = { backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee', marginBottom: '20px' };
  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '8px', marginBottom: '15px' };
  const primaryBtn = { backgroundColor: '#7A0102', color: 'white', padding: '12px 25px', borderRadius: '8px', border: 'none', fontWeight: 'bold' as const, cursor: 'pointer' };

  // --- 6. FINAL RENDER ---
  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ color: '#7A0102', fontSize: '32px', margin: 0, fontWeight: '800' }}>Sankalp Admin</h1>
          <p style={{ color: '#666' }}>Society Management Portal</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => window.location.href = '/'} style={{ background: 'white', border: '1px solid #ddd', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>View Site</button>
          <button onClick={async () => { 
            const s = createClient(); 
            await s.auth.signOut(); 
            router.push('/login'); 
          }} style={{ background: '#eee', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ ...cardStyle, borderLeft: '5px solid #ffa000' }}>
          <div style={{ fontSize: '12px', color: '#888' }}>PENDING</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.pending}</div>
        </div>
        <div style={{ ...cardStyle, borderLeft: '5px solid #2e7d32' }}>
          <div style={{ fontSize: '12px', color: '#888' }}>APPROVED</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.approved}</div>
        </div>
        <div style={{ ...cardStyle, borderLeft: '5px solid #c62828' }}>
          <div style={{ fontSize: '12px', color: '#888' }}>REJECTED</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.rejected}</div>
        </div>
      </div>

      {/* Tabs Section */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        {['applications', 'members', 'events', 'gallery', 'hero'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold',
            backgroundColor: activeTab === tab ? '#7A0102' : 'transparent', color: activeTab === tab ? 'white' : '#666'
          }}>{tab.toUpperCase()}</button>
        ))}
      </div>

      {/* Tab Content Section */}
      {activeTab === 'applications' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {applications.filter(a => a.status === 'pending').map(app => (
            <div key={app.id} style={cardStyle}>
              <h3>{app.full_name}</h3>
              <p style={{ color: '#7A0102', fontWeight: 'bold' }}>{app.course} • {app.college}</p>
              <div style={{ fontSize: '13px', background: '#f5f5f5', padding: '10px', margin: '10px 0' }}>"{app.why_join}"</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleAction(app.id, 'approved')} style={{ flex: 1, padding: '10px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '5px' }}>Approve</button>
                <button onClick={() => handleAction(app.id, 'rejected')} style={{ flex: 1, padding: '10px', background: '#555', color: 'white', border: 'none', borderRadius: '5px' }}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'members' && (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>Society Directory ({approvedMembers.length})</h3>
            <button onClick={downloadCSV} style={{ ...primaryBtn, padding: '8px 15px', fontSize: '12px', backgroundColor: '#2e7d32' }}>Export to Excel</button>
          </div>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '10px' }}>NAME</th>
                <th style={{ padding: '10px' }}>COLLEGE</th>
                <th style={{ padding: '10px' }}>EMAIL</th>
                <th style={{ padding: '10px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {approvedMembers.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '10px' }}>{m.full_name}</td>
                  <td style={{ padding: '10px' }}>{m.college}</td>
                  <td style={{ padding: '10px' }}>{m.email}</td>
                  <td style={{ padding: '10px' }}><button onClick={() => handleAction(m.id, 'rejected')} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'events' && (
        <div style={cardStyle}>
          <h3>Post New Event</h3>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const res = await addEvent(new FormData(e.currentTarget));
            setLoading(false);
            if(res.success) { alert("Event Added!"); loadData(); }
          }}>
            <input name="title" placeholder="Event Name" required style={inputStyle} />
            <input name="event_date" type="date" required style={inputStyle} />
            <textarea name="description" placeholder="Description" style={{...inputStyle, height: '100px'}} />
            <button type="submit" disabled={loading} style={primaryBtn}>Post Event</button>
          </form>
        </div>
      )}

      {(activeTab === 'gallery' || activeTab === 'hero') && (
        <div style={cardStyle}>
          <h3>Upload {activeTab === 'hero' ? 'Hero Photo' : 'Gallery Image'}</h3>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fd = new FormData(e.currentTarget);
            const res = activeTab === 'hero' ? await uploadHeroImage(fd) : await uploadGalleryImage(fd);
            setLoading(false);
            if(res.success) { alert("Uploaded!"); loadData(); }
          }}>
            {activeTab === 'gallery' && <input name="title" placeholder="Title" required style={inputStyle} />}
            <input name="image" type="file" accept="image/*" required style={inputStyle} />
            <button type="submit" disabled={loading} style={primaryBtn}>Upload Now</button>
          </form>
        </div>
      )}
    </div>
  );
}