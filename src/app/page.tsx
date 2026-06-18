'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sabbatical } from '@/types';
import * as api from '@/lib/api';
import { ChevronRight, BookOpen, Target, Calendar, TrendingUp, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sabbaticals, setSabbaticals] = useState<Sabbatical[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      api.getSessions().then((data: Sabbatical[]) => {
        setSabbaticals(data);
        setLoading(false);
      });
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A1628 0%, #0a2540 100%)',
        color: 'white',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.03em' }}>RE:NEW</h1>
          <div className="spinner" />
        </div>
      </div>
    );
  }

  const firstName = session?.user?.name?.split(' ')[0] || 'Friend';
  const completedCount = sabbaticals.filter(s => s.status === 'completed').length;
  const latestSession = sabbaticals[0]; // Most recent
  const inProgress = sabbaticals.find(s => s.status === 'in-progress');

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0A1628 0%, #0d1f35 50%, #0A1628 100%)' }}>
      {/* Hero */}
      <div className="animate-fade" style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #0a2540 60%, #153d6b 100%)',
        padding: '52px 24px 40px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 20%, rgba(91,164,230,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{
          fontSize: '56px', fontWeight: 900, color: 'white', letterSpacing: '-0.02em',
          margin: '0 auto 8px', position: 'relative',
          textShadow: '0 2px 12px rgba(91,164,230,0.25), 0 4px 24px rgba(0,0,0,0.3)',
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'lowercase',
        }}>
          re:new
        </div>
        <p style={{ fontSize: '18px', fontWeight: 700, opacity: 0.9, margin: '0 0 4px', position: 'relative' }}>
          Welcome back, {firstName}
        </p>
        <p style={{ fontSize: '13px', opacity: 0.5, margin: 0, position: 'relative' }}>
          Personal Sabbatical Framework
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px 20px' }}>

        {/* Quick Stats */}
        <div className="animate-in stagger-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '18px 14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--blue-accent)' }}>{sabbaticals.length}</div>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Sessions</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '18px 14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--green)' }}>{completedCount}</div>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Completed</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '18px 14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#f59e0b' }}>{sabbaticals.length - completedCount}</div>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Active</div>
          </div>
        </div>

        {/* Current / Latest Session Card */}
        {(inProgress || latestSession) && (
          <div
            className="animate-in stagger-2"
            onClick={() => router.push(`/session/${(inProgress || latestSession).id}`)}
            style={{
              background: 'linear-gradient(135deg, #0a2540 0%, #153d6b 100%)',
              borderRadius: '16px', padding: '24px', marginBottom: '16px', cursor: 'pointer',
              border: '1px solid rgba(91,164,230,0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--blue-accent)' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue-accent)' }}>
                  {inProgress ? 'Continue Session' : 'Latest Session'}
                </span>
              </div>
              <ChevronRight size={18} style={{ opacity: 0.4 }} />
            </div>
            <h3 style={{ fontWeight: 900, fontSize: '20px', margin: '0 0 8px' }}>
              {(inProgress || latestSession).title}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', opacity: 0.5 }}>
              <Calendar size={13} />
              {(() => { try { const d = new Date((inProgress || latestSession).date); return isNaN(d.getTime()) ? String((inProgress || latestSession).date) : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); } catch { return String((inProgress || latestSession).date); } })()}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="animate-in stagger-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          <div
            onClick={() => router.push('/sessions')}
            style={{
              background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '20px 16px', cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s ease',
            }}
          >
            <BookOpen size={22} style={{ color: 'var(--blue-accent)', marginBottom: '10px' }} />
            <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>All Sessions</div>
            <div style={{ fontSize: '12px', opacity: 0.4 }}>View & manage</div>
          </div>
          <div
            onClick={() => router.push('/tracker')}
            style={{
              background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '20px 16px', cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s ease',
            }}
          >
            <Target size={22} style={{ color: 'var(--green)', marginBottom: '10px' }} />
            <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>Goal Tracker</div>
            <div style={{ fontSize: '12px', opacity: 0.4 }}>Track progress</div>
          </div>
        </div>

        {/* Scripture */}
        <div className="animate-in stagger-4" style={{
          background: 'rgba(91,164,230,0.06)', borderLeft: '3px solid var(--blue-accent)',
          padding: '18px 20px', borderRadius: '0 14px 14px 0',
        }}>
          <p style={{ fontStyle: 'italic', fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: '0 0 8px' }}>
            "Where there is no counsel, the people fall; But in the multitude of counselors there is safety."
          </p>
          <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue-accent)', margin: 0 }}>— Proverbs 11:14</p>
        </div>

        {/* Framework Overview */}
        <div className="animate-in stagger-5" style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>
            The RE:NEW Framework
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { icon: '🔑', title: 'Day 1 — Keys to the Kingdom', desc: 'Reverence · Release · Repent · Renounce · Receive' },
              { icon: '🖐️', title: 'Day 2 — Hi 5', desc: 'Health · Goals · People · Reflection' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '16px 18px',
                border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '14px',
              }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '2px' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', opacity: 0.4 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
