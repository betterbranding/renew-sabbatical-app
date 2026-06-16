import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Session } from './types';
import { initDB, seedFromJSON, getSessions, createSession, seedNewSession } from './utils/db';
import { Landing } from './components/Landing';
import { SessionView } from './components/SessionView';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'session'>('landing');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    await initDB();
    await seedFromJSON();
    const s = await getSessions();
    setSessions(s);
    setLoading(false);
  }

  async function handleSelectSession(s: Session) {
    setActiveSession(s);
    setView('session');
  }

  async function handleNewSession(title: string, date: string) {
    const id = 'session-' + Date.now();
    await createSession(id, title, date);
    await seedNewSession(id);
    const s = await getSessions();
    setSessions(s);
    const newSession = s.find(x => x.id === id);
    if (newSession) {
      setActiveSession(newSession);
      setView('session');
    }
  }

  async function handleBack() {
    const s = await getSessions();
    setSessions(s);
    setActiveSession(null);
    setView('landing');
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A1628 0%, #1B3A5C 100%)',
        color: 'white',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.03em' }}>RE:NEW</h1>
          <div style={{
            width: '40px', height: '40px',
            border: '3px solid rgba(255,255,255,0.15)',
            borderTopColor: '#5BA4E6',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (view === 'session' && activeSession) {
    return <SessionView session={activeSession} onBack={handleBack} />;
  }

  return (
    <Landing
      sessions={sessions}
      onSelectSession={handleSelectSession}
      onNewSession={handleNewSession}
    />
  );
};

createRoot(document.getElementById('root')!).render(<App />);
