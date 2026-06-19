'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SabbaticalFull, HealthGoal, HEALTH_AREAS } from '@/types';
import * as api from '@/lib/api';
import { Target, ChevronDown, ChevronUp } from 'lucide-react';

const STATUS_CYCLE = ['Not started', 'In progress', 'Done'] as const;
const STATUS_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  'Not started': { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: 'rgba(255,255,255,0.1)' },
  'In progress': { bg: 'rgba(91,164,230,0.12)', color: '#5BA4E6', border: 'rgba(91,164,230,0.3)' },
  'Done': { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', border: 'rgba(34,197,94,0.3)' },
};

export default function TrackerPage() {
  const { status: authStatus } = useSession();
  const router = useRouter();
  const [goals, setGoals] = useState<HealthGoal[]>([]);
  const [sessionTitle, setSessionTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }
    if (authStatus !== 'authenticated') return;

    // Get sessions, pick the most recent, fetch its full data
    api.getSessions().then(async (sessions: any[]) => {
      if (sessions.length === 0) { setLoading(false); return; }
      const latest = sessions[0];
      setSessionTitle(latest.title);
      const full: SabbaticalFull = await api.getSession(latest.id);
      setGoals(full.healthGoals || []);
      setLoading(false);
    });
  }, [authStatus, router]);

  const cycleStatus = (goal: HealthGoal) => {
    const idx = STATUS_CYCLE.indexOf(goal.status as any);
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, status: next } : g));
    api.updateHealthGoal(goal.id, { status: next });
  };

  if (authStatus === 'loading' || loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #0A1628, #0a2540)', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <Target size={32} style={{ color: 'var(--blue-accent)', marginBottom: '12px' }} />
          <p style={{ opacity: 0.5 }}>Loading goals...</p>
        </div>
      </div>
    );
  }

  const groupedByArea = HEALTH_AREAS.map(area => ({
    ...area,
    goals: goals.filter(g => g.area === area.name),
  })).filter(a => a.goals.length > 0);

  const totalGoals = goals.length;
  const doneGoals = goals.filter(g => g.status === 'Done').length;
  const inProgressGoals = goals.filter(g => g.status === 'In progress').length;
  const progressPct = totalGoals > 0 ? Math.round((doneGoals / totalGoals) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0A1628 0%, #0d1f35 50%, #0A1628 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0A1628, #0a2540 60%, #153d6b 100%)',
        padding: '48px 24px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 70% 30%, rgba(34,197,94,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <Target size={28} style={{ color: 'var(--green)', marginBottom: '8px', position: 'relative' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 4px', position: 'relative' }}>Goal Tracker</h1>
        <p style={{ fontSize: '13px', opacity: 0.5, margin: 0, position: 'relative' }}>
          {sessionTitle ? `From: ${sessionTitle}` : 'No sessions yet'}
        </p>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px 20px' }}>
        {/* Stats Row */}
        <div className="animate-in stagger-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '16px 12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--green)' }}>{doneGoals}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Done</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '16px 12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--blue-accent)' }}>{inProgressGoals}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>In Progress</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '16px 12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#f59e0b' }}>{totalGoals - doneGoals - inProgressGoals}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Not Started</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="animate-in stagger-2" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <span>Overall Progress</span>
            <span>{progressPct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Goals by Area */}
        {groupedByArea.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: 'rgba(255,255,255,0.4)' }}>
            <Target size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ margin: 0 }}>No goals found. Complete a sabbatical session to set goals.</p>
          </div>
        ) : (
          groupedByArea.map((area, i) => {
            const areaDone = area.goals.filter(g => g.status === 'Done').length;
            const isExpanded = expandedArea === area.key || expandedArea === null;
            return (
              <div key={area.key} className={`animate-in stagger-${Math.min(i + 3, 6)}`} style={{ marginBottom: '12px' }}>
                <div
                  onClick={() => setExpandedArea(expandedArea === area.key ? null : area.key)}
                  style={{
                    background: 'linear-gradient(135deg, #0f2744, #0c1a30)',
                    borderRadius: isExpanded ? '14px 14px 0 0' : '14px',
                    padding: '16px 18px', cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderBottom: isExpanded ? '1px solid rgba(255,255,255,0.03)' : undefined,
                    display: 'flex', alignItems: 'center', gap: '12px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{area.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '15px' }}>{area.name}</div>
                    <div style={{ fontSize: '12px', opacity: 0.4 }}>{areaDone}/{area.goals.length} complete</div>
                  </div>
                  {isExpanded ? <ChevronUp size={18} style={{ opacity: 0.4 }} /> : <ChevronDown size={18} style={{ opacity: 0.4 }} />}
                </div>
                {isExpanded && (
                  <div style={{
                    background: 'linear-gradient(135deg, #0a1e38, #0c1a30)',
                    borderRadius: '0 0 14px 14px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderTop: 'none',
                    padding: '4px 0',
                  }}>
                    {area.goals.map(goal => {
                      const st = STATUS_STYLES[goal.status] || STATUS_STYLES['Not started'];
                      return (
                        <div key={goal.id} style={{
                          padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: '12px',
                          borderBottom: '1px solid rgba(255,255,255,0.03)',
                        }}>
                          {/* Status checkbox */}
                          <button
                            onClick={() => cycleStatus(goal)}
                            style={{
                              width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                              background: st.bg, border: `2px solid ${st.border}`, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {goal.status === 'Done' && <span style={{ color: st.color, fontSize: '12px', fontWeight: 700 }}>✓</span>}
                            {goal.status === 'In progress' && <span style={{ color: st.color, fontSize: '10px' }}>●</span>}
                          </button>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: '14px', fontWeight: 600, lineHeight: 1.4,
                              color: goal.status === 'Done' ? 'rgba(255,255,255,0.4)' : 'white',
                              textDecoration: goal.status === 'Done' ? 'line-through' : 'none',
                            }}>
                              {goal.goalText}
                            </div>
                            <label style={{
                              marginTop: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px',
                              cursor: 'pointer', fontSize: '11px',
                              color: goal.dueDate ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)',
                              background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '6px',
                              border: '1px solid rgba(255,255,255,0.08)', position: 'relative', userSelect: 'none',
                            }}>
                              <span style={{ pointerEvents: 'none' }}>
                                {goal.dueDate
                                  ? `📅 ${(() => { try { const d = new Date(goal.dueDate); return isNaN(d.getTime()) ? goal.dueDate : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); } catch { return goal.dueDate; } })()}`
                                  : '📅 + due date'}
                              </span>
                              <input
                                type="date"
                                value={goal.dueDate || ''}
                                onChange={e => {
                                  const v = e.target.value || null;
                                  setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, dueDate: v } : g));
                                  api.updateHealthGoal(goal.id, { dueDate: v });
                                }}
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', border: 'none', padding: 0, margin: 0, fontSize: '16px', colorScheme: 'dark' } as any}
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
