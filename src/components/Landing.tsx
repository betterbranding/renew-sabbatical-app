import React, { useState } from 'react';
import { Session } from '../types';
import { Plus, BookOpen, ChevronRight, Calendar, CheckCircle, Clock } from 'lucide-react';
import { RENEW_LOGO_BASE64 } from '../utils/logo';

interface LandingProps {
  sessions: Session[];
  onSelectSession: (s: Session) => void;
  onNewSession: (title: string, date: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ sessions, onSelectSession, onNewSession }) => {
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    onNewSession(newTitle.trim(), newDate);
    setShowNew(false);
    setNewTitle('');
  };

  const statusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle size={18} style={{ color: '#22c55e' }} />;
    if (status === 'in-progress') return <Clock size={18} style={{ color: '#5BA4E6' }} />;
    return <BookOpen size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />;
  };

  const statusLabel = (status: string) => {
    if (status === 'completed') return <span className="tag tag-green">Completed</span>;
    if (status === 'in-progress') return <span className="tag tag-blue">In Progress</span>;
    return <span className="tag tag-amber">New</span>;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '0' }}>
      {/* Hero */}
      <div className="animate-fade" style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #1B3A5C 60%, #2d5a8e 100%)',
        padding: '60px 24px 48px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 20%, rgba(91,164,230,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <img
          src={RENEW_LOGO_BASE64}
          alt="RE:NEW"
          style={{ width: '280px', maxWidth: '70%', height: 'auto', margin: '0 auto 12px', display: 'block', position: 'relative', filter: 'drop-shadow(0 4px 24px rgba(91,164,230,0.2))' }}
        />
        <p style={{ fontSize: '14px', fontWeight: 500, opacity: 0.7, margin: '0 0 24px', letterSpacing: '0.1em', textTransform: 'uppercase', position: 'relative' }}>
          Personal Sabbatical Framework
        </p>
        <p style={{ fontSize: '14px', fontStyle: 'italic', opacity: 0.5, maxWidth: '460px', margin: '0 auto', lineHeight: 1.6, position: 'relative' }}>
          "Where there is no counsel, the people fall; But in the multitude of counselors there is safety." — Proverbs 11:14
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '32px 20px' }}>
        {/* New Session Button */}
        {!showNew ? (
          <button
            className="btn-renew animate-in stagger-1"
            onClick={() => setShowNew(true)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '28px', padding: '16px' }}
          >
            <Plus size={20} /> Start New Sabbatical
          </button>
        ) : (
          <div className="dark-card animate-in" style={{ marginBottom: '28px', cursor: 'default' }}>
            <h3 style={{ fontWeight: 800, fontSize: '18px', margin: '0 0 16px' }}>New Sabbatical Session</h3>
            <input
              className="renew-input"
              placeholder="Session title (e.g., RE:NEW | July 2026)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ marginBottom: '12px' }}
              autoFocus
            />
            <input
              className="renew-input"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-renew" onClick={handleCreate} disabled={!newTitle.trim()}>Create Session</button>
              <button className="btn-renew btn-outline" onClick={() => setShowNew(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Session List */}
        <h2 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 16px' }}>
          Your Sessions ({sessions.length})
        </h2>

        {sessions.map((s, i) => (
          <div
            key={s.id}
            className={`dark-card animate-in stagger-${Math.min(i + 1, 6)}`}
            onClick={() => onSelectSession(s)}
            style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(91,164,230,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {statusIcon(s.status)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontWeight: 800, fontSize: '16px', margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', opacity: 0.5 }}>
                <Calendar size={13} />
                {new Date(s.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {statusLabel(s.status)}
              <ChevronRight size={18} style={{ opacity: 0.4 }} />
            </div>
          </div>
        ))}

        {sessions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#94a3b8' }}>
            <BookOpen size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ margin: 0 }}>No sessions yet. Start your first sabbatical above.</p>
          </div>
        )}
      </div>
    </div>
  );
};
