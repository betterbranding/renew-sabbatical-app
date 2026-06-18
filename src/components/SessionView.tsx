'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SabbaticalFull, KeyEntry, HealthEntry, HealthGoal, Goal, Person, Reflection, HEALTH_AREAS } from '@/types';
import { DAY1_MODULES as DAY1_MODULE_DEFS, DAY2_OVERVIEW, ANCHOR_SCRIPTURE, DAY2_TRANSITIONS } from '@/lib/content';
import * as api from '@/lib/api';
import { flushPendingSaves } from '@/lib/api';
import { KeysModule } from './KeysModule';

interface SessionViewProps {
  sabbatical: SabbaticalFull;
  onBack: () => void;
  onUpdate: (s: SabbaticalFull) => void;
}

type DayTab = 'day1' | 'day2';

// ── Area color/icon maps ──
const AREA_COLORS: Record<string, string> = {
  'Spiritual Health': '#5BA4E6', 'Relational Health': '#E6855B', 'Financial Health': '#5BE6A4',
  'Mental Health': '#E6E65B', 'Physical Health': '#B55BE6',
  'Spiritual': '#5BA4E6', 'Relational': '#E6855B', 'Financial': '#5BE6A4',
  'Mental': '#E6E65B', 'Physical': '#B55BE6',
};
const AREA_ICONS: Record<string, string> = {
  'Spiritual Health': '🕊️', 'Relational Health': '💗', 'Financial Health': '💸',
  'Mental Health': '🧠', 'Physical Health': '💪',
  'Spiritual': '🕊️', 'Relational': '💗', 'Financial': '💸',
  'Mental': '🧠', 'Physical': '💪',
};

// ── Helper: render markdown bold ──
function renderBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SMART Goals Expandable
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SmartGoalsRef: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { smartGoals } = DAY2_OVERVIEW;
  const letters: Record<string, string> = { specific: 'S', measurable: 'M', attainable: 'A', realistic: 'R', timeline: 'T' };
  return (
    <div style={{
      marginBottom: '12px', borderRadius: '12px', overflow: 'hidden',
      border: `1px solid ${open ? 'rgba(91,164,230,0.3)' : 'rgba(255,255,255,0.08)'}`,
      transition: 'border-color 0.3s ease',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 16px', background: open ? 'rgba(91,164,230,0.08)' : 'rgba(255,255,255,0.04)',
        border: 'none', cursor: 'pointer', color: 'white', fontFamily: 'inherit', textAlign: 'left',
      }}>
        <span style={{ fontSize: '18px' }}>🎯</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 800 }}>What Are S.M.A.R.T. Goals?</div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#5BA4E6', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>📖 REFERENCE</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.35s ease', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? '800px' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease, opacity 0.35s ease', opacity: open ? 1 : 0 }}>
        <div style={{ padding: '4px 16px 16px' }}>
          {Object.entries(smartGoals).map(([key, val]) => (
            <div key={key} style={{ marginBottom: '10px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(91,164,230,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: 900, color: '#5BA4E6', flexShrink: 0,
              }}>
                {letters[key] || key.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'white', marginBottom: '4px', textTransform: 'capitalize' }}>{key}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// What Are Goals? Expandable
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WhatAreGoalsRef: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      marginBottom: '12px', borderRadius: '12px', overflow: 'hidden',
      border: `1px solid ${open ? 'rgba(91,164,230,0.3)' : 'rgba(255,255,255,0.08)'}`,
      transition: 'border-color 0.3s ease',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 16px', background: open ? 'rgba(91,164,230,0.08)' : 'rgba(255,255,255,0.04)',
        border: 'none', cursor: 'pointer', color: 'white', fontFamily: 'inherit', textAlign: 'left',
      }}>
        <span style={{ fontSize: '18px' }}>📖</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 800 }}>What Are Goals?</div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#5BA4E6', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>📚 TEACHING</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.35s ease', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease, opacity 0.35s ease', opacity: open ? 1 : 0 }}>
        <div style={{ padding: '4px 16px 16px' }}>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
            {DAY2_OVERVIEW.whatAreGoals}
          </p>
        </div>
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GOAL ROW — single goal in area tracker
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const HealthGoalRow: React.FC<{
  goal: HealthGoal;
  onUpdate: (id: number, text: string, status: string, dueDate: string | null) => void;
  onDelete: (id: number) => void;
}> = ({ goal, onUpdate, onDelete }) => {
  const [text, setText] = useState(goal.goalText);
  const [status, setStatus] = useState(goal.status);
  const [dueDate, setDueDate] = useState(goal.dueDate || '');
  const [editing, setEditing] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const scheduleUpdate = (t: string, s: string, d: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (goal.id) onUpdate(goal.id, t, s, d || null);
    }, 1500);
  };

  const handleTextChange = (val: string) => { setText(val); scheduleUpdate(val, status, dueDate); };
  const handleStatusChange = (val: string) => {
    setStatus(val);
    if (goal.id) onUpdate(goal.id, text, val, dueDate || null);
  };
  const handleDateChange = (val: string) => {
    setDueDate(val);
    if (goal.id) onUpdate(goal.id, text, status, val || null);
  };

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  const statusColor = status === 'Done' ? '#22c55e' : status === 'In progress' ? '#f59e0b' : 'rgba(255,255,255,0.25)';
  const statusBg = status === 'Done' ? 'rgba(34,197,94,0.12)' : status === 'In progress' ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)';

  const formatDate = (d: string) => {
    if (!d) return '';
    try {
      const dt = new Date(d + 'T00:00:00');
      return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch { return d; }
  };

  return (
    <div style={{
      padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px',
      marginBottom: '6px', border: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* Row 1: Goal text (full width, prominent) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          onClick={() => handleStatusChange(status === 'Done' ? 'Not started' : status === 'In progress' ? 'Done' : 'In progress')}
          style={{
            width: '18px', height: '18px', borderRadius: '5px', flexShrink: 0, cursor: 'pointer',
            border: `2px solid ${statusColor}`, background: status === 'Done' ? statusColor : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease',
          }}
          title={`Status: ${status} (click to cycle)`}
        >
          {status === 'Done' && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          )}
          {status === 'In progress' && (
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: statusColor }} />
          )}
        </div>
        <input
          className="renew-input"
          value={text}
          onChange={e => handleTextChange(e.target.value)}
          onFocus={() => setEditing(true)}
          onBlur={() => setEditing(false)}
          placeholder="Enter a goal..."
          style={{
            flex: 1, padding: '6px 10px', fontSize: '14px', fontWeight: 600,
            background: editing ? 'rgba(255,255,255,0.06)' : 'transparent',
            border: editing ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
            textDecoration: status === 'Done' ? 'line-through' : 'none',
            opacity: status === 'Done' ? 0.5 : 1,
            transition: 'all 0.2s ease',
          }}
        />
        <button
          onClick={() => goal.id && onDelete(goal.id)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
            color: 'rgba(255,255,255,0.2)', fontSize: '14px', lineHeight: 1, flexShrink: 0,
          }}
          title="Delete goal"
        >✕</button>
      </div>
      {/* Row 2: Small meta — status chip + date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', marginLeft: '28px' }}>
        <select
          value={status}
          onChange={e => handleStatusChange(e.target.value)}
          style={{
            background: statusBg, border: 'none', borderRadius: '6px',
            color: statusColor, padding: '3px 8px', fontSize: '10px', fontWeight: 700,
            fontFamily: 'inherit', cursor: 'pointer', textTransform: 'uppercase',
            letterSpacing: '0.04em', appearance: 'none', WebkitAppearance: 'none',
          }}
        >
          <option value="Not started" style={{ background: '#0c1a30', color: 'white' }}>Not started</option>
          <option value="In progress" style={{ background: '#0c1a30', color: 'white' }}>In progress</option>
          <option value="Done" style={{ background: '#0c1a30', color: 'white' }}>Done</option>
        </select>
        {dueDate ? (
          <span
            onClick={() => {
              const el = document.getElementById(`date-${goal.id}`);
              if (el) (el as HTMLInputElement).showPicker?.();
            }}
            style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}
            title="Click to change date"
          >
            📅 {formatDate(dueDate)}
          </span>
        ) : (
          <span
            onClick={() => {
              const el = document.getElementById(`date-${goal.id}`);
              if (el) (el as HTMLInputElement).showPicker?.();
            }}
            style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}
          >
            + due date
          </span>
        )}
        <input
          id={`date-${goal.id}`}
          type="date"
          value={dueDate}
          onChange={e => handleDateChange(e.target.value)}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
        />
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HEALTH AREA MODULE — full expandable card per area
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const HealthAreaModule: React.FC<{
  entry: HealthEntry;
  goals: HealthGoal[];
  sessionId: string;
  onSaveEntry: (e: HealthEntry) => void;
  onGoalsChanged: () => void;
}> = ({ entry, goals, sessionId, onSaveEntry, onGoalsChanged }) => {
  const [open, setOpen] = useState(false);
  const [feel, setFeel] = useState(entry.feelIfAccomplish || '');
  const [what, setWhat] = useState(entry.whatIfDont || '');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const color = AREA_COLORS[entry.area] || '#5BA4E6';
  const icon = AREA_ICONS[entry.area] || '🎯';
  const goalsSet = goals.filter(g => g.goalText.trim() !== '').length;
  const goalsDone = goals.filter(g => g.status === 'Done').length;

  const handleReflectionChange = (field: 'feel' | 'what', val: string) => {
    if (field === 'feel') setFeel(val); else setWhat(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSaveEntry({
        ...entry,
        feelIfAccomplish: field === 'feel' ? val : feel,
        whatIfDont: field === 'what' ? val : what,
      });
    }, 1500);
  };

  const handleUpdateGoal = (id: any, text: string, status: string, dueDate: string | null) => {
    api.updateHealthGoal(String(id), { goalText: text, status, dueDate });
    // Refresh goals after a short delay
    setTimeout(() => onGoalsChanged(), 200);
  };

  const handleDeleteGoal = async (id: any) => {
    await api.deleteHealthGoal(String(id));
    onGoalsChanged();
  };

  const handleAddGoal = async () => {
    await api.addHealthGoal(sessionId, entry.area);
    onGoalsChanged();
  };

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  return (
    <div className="dark-card" style={{ marginBottom: '10px', cursor: 'default', padding: 0, overflow: 'hidden' }}>
      {/* Header */}
      <div onClick={() => setOpen(!open)} style={{
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px',
        padding: '20px 24px',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: `${color}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 900, fontSize: '16px', margin: 0, color: 'white' }}>{entry.area}</h3>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            {goalsSet > 0 ? `${goalsSet} goal${goalsSet !== 1 ? 's' : ''} set` : 'No goals yet'}
            {goalsDone > 0 && ` · ${goalsDone} done`}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {goalsSet > 0 && (
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: goalsDone === goals.length && goals.length > 0 ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 800,
              color: goalsDone === goals.length && goals.length > 0 ? '#22c55e' : 'rgba(255,255,255,0.4)',
            }}>
              {goalsDone === goals.length && goals.length > 0 ? '✓' : `${goalsSet}`}
            </div>
          )}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      <div style={{
        maxHeight: open ? '2000px' : '0', overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
        opacity: open ? 1 : 0,
      }}>
        <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Goals Tracker */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: color }}>
                Goals Tracker
              </span>
            </div>

            {goals.map((g) => (
              <HealthGoalRow
                key={g.id}
                goal={g}
                onUpdate={handleUpdateGoal}
                onDelete={handleDeleteGoal}
              />
            ))}

            <button
              onClick={handleAddGoal}
              style={{
                background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.12)',
                borderRadius: '10px', padding: '10px 16px', width: '100%', marginTop: '6px',
                color: 'rgba(255,255,255,0.5)', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              ＋ Add Goal
            </button>
          </div>

          {/* Green reflection */}
          <div style={{
            marginTop: '20px', padding: '16px', borderRadius: '12px',
            background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)',
          }}>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#22c55e', display: 'block', marginBottom: '8px' }}>
              ✨ How will I feel if I accomplish these goals?
            </label>
            <textarea
              className="renew-textarea"
              value={feel}
              onChange={e => handleReflectionChange('feel', e.target.value)}
              placeholder="Describe how you'll feel..."
              style={{ minHeight: '80px', background: 'rgba(34,197,94,0.04)', borderColor: 'rgba(34,197,94,0.12)' }}
            />
          </div>

          {/* Pink reflection */}
          <div style={{
            marginTop: '12px', padding: '16px', borderRadius: '12px',
            background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.15)',
          }}>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#ec4899', display: 'block', marginBottom: '8px' }}>
              ⚠️ What will happen if I don't accomplish these goals?
            </label>
            <textarea
              className="renew-textarea"
              value={what}
              onChange={e => handleReflectionChange('what', e.target.value)}
              placeholder="What are the consequences?"
              style={{ minHeight: '80px', background: 'rgba(236,72,153,0.04)', borderColor: 'rgba(236,72,153,0.12)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HIGH FIVE GOAL ROW (Stakes in the Ground)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Hi5GoalRow: React.FC<{ goal: Goal; onSave: (g: Goal) => void }> = ({ goal, onSave }) => {
  const [name, setName] = useState(goal.name);
  const [dueDate, setDueDate] = useState(goal.dueDate || '');
  const [completed, setCompleted] = useState(goal.completed === 1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const color = AREA_COLORS[goal.area] || '#5BA4E6';
  const icon = AREA_ICONS[goal.area] || '🎯';

  const save = (n: string, d: string, c: boolean) => {
    onSave({ ...goal, name: n, dueDate: d || null, completed: c ? 1 : 0 });
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => save(val, dueDate, completed), 1500);
  };

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px',
      marginBottom: '8px', borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <span style={{ fontSize: '16px' }}>{icon}</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{goal.area}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div className={`renew-check ${completed ? 'checked' : ''}`} onClick={() => { const next = !completed; setCompleted(next); save(name, dueDate, next); }} />
        <input className="renew-input" value={name} onChange={e => handleNameChange(e.target.value)} placeholder="Enter your #1 goal..." style={{ flex: 1, textDecoration: completed ? 'line-through' : 'none', opacity: completed ? 0.5 : 1 }} />
        <input className="renew-input" type="date" value={dueDate} onChange={e => { setDueDate(e.target.value); save(name, e.target.value, completed); }} style={{ width: '150px' }} />
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PERSON ROW (Accountability)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PersonRow: React.FC<{ person: Person; onSave: (p: Person) => void }> = ({ person, onSave }) => {
  const [name, setName] = useState(person.name);
  const [contacted, setContacted] = useState(person.contacted === 1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const color = AREA_COLORS[person.area] || '#5BA4E6';
  const icon = AREA_ICONS[person.area] || '👤';

  const handleNameChange = (val: string) => {
    setName(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSave({ ...person, name: val, contacted: contacted ? 1 : 0 }), 1500);
  };

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px',
      marginBottom: '8px', borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <span style={{ fontSize: '16px' }}>{icon}</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{person.area}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div className={`renew-check ${contacted ? 'checked' : ''}`} onClick={() => { const next = !contacted; setContacted(next); onSave({ ...person, name, contacted: next ? 1 : 0 }); }} title="Agreed to help" />
        <input className="renew-input" value={name} onChange={e => handleNameChange(e.target.value)} placeholder="Enter person's name..." style={{ flex: 1 }} />
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN SESSION VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SessionView: React.FC<SessionViewProps> = ({ sabbatical, onBack, onUpdate }) => {
  const [day, setDay] = useState<DayTab>('day1');
  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const [health, setHealth] = useState<HealthEntry[]>([]);
  const [healthGoals, setHealthGoals] = useState<HealthGoal[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);

  // Flush pending saves on unmount or page close
  useEffect(() => {
    const handleBeforeUnload = () => flushPendingSaves();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      flushPendingSaves();
    };
  }, []);

  // Initialize state from the sabbatical prop (already includes all relations)
  useEffect(() => {
    try {
      setKeys(sabbatical.keyEntries || []);
      setHealth(sabbatical.healthEntries || []);
      setHealthGoals(sabbatical.healthGoals || []);
      setGoals(sabbatical.goals || []);
      setPeople(sabbatical.people || []);
      setReflection(sabbatical.reflections?.[0] || null);
    } catch (err) {
      console.error('Error initializing session data:', err);
    }
    setLoading(false);
  }, [sabbatical.id]);

  async function refreshSession() {
    try {
      const fresh = await api.getSession(sabbatical.id);
      setKeys(fresh.keyEntries || []);
      setHealth(fresh.healthEntries || []);
      setHealthGoals(fresh.healthGoals || []);
      setGoals(fresh.goals || []);
      setPeople(fresh.people || []);
      setReflection(fresh.reflections?.[0] || null);
    } catch (err) {
      console.error('Error refreshing session:', err);
    }
  }

  async function refreshHealthGoals() {
    try {
      const fresh = await api.getSession(sabbatical.id);
      setHealthGoals(fresh.healthGoals || []);
    } catch (err) {
      console.error('Error refreshing health goals:', err);
    }
  }

  // ── Save Handlers ──
  function handleSaveKey(entry: KeyEntry) {
    setKeys(prev => prev.map(k => (k.id === entry.id || (k.moduleKey === entry.moduleKey && k.sabbaticalId === entry.sabbaticalId)) ? entry : k));
    api.updateKeyEntry(entry.id, { userResponse: entry.userResponse, completed: entry.completed });
    api.updateSession(sabbatical.id, { status: 'in-progress' });
  }
  function handleSaveHealth(entry: HealthEntry) {
    setHealth(prev => prev.map(h => (h.id === entry.id || (h.area === entry.area && h.sabbaticalId === entry.sabbaticalId)) ? entry : h));
    api.updateHealthEntry(entry.id, { assessment: entry.assessment, feelIfAccomplish: entry.feelIfAccomplish, whatIfDont: entry.whatIfDont, completed: entry.completed });
  }
  function handleSaveGoal(goal: Goal) {
    setGoals(prev => prev.map(g => (g.id === goal.id || (g.area === goal.area && g.sabbaticalId === goal.sabbaticalId)) ? goal : g));
    api.updateGoal(goal.id, { name: goal.name, dueDate: goal.dueDate, completed: goal.completed, notes: goal.notes });
  }
  function handleSavePerson(person: Person) {
    setPeople(prev => prev.map(p => (p.id === person.id || (p.area === person.area && p.sabbaticalId === person.sabbaticalId)) ? person : p));
    api.updatePerson(person.id, { name: person.name, contacted: person.contacted, notes: person.notes });
  }
  function handleSaveReflection(r: Reflection) {
    setReflection(r);
    api.updateReflection(r.id, { howWillIFeel: r.howWillIFeel, whatIfIDont: r.whatIfIDont });
  }

  // ── Progress ──
  const day1Progress = keys.length > 0 ? Math.round(keys.filter(k => k.completed).length / keys.length * 100) : 0;
  const day2Progress = (() => {
    const hgSet = healthGoals.filter(g => g.goalText.trim() !== '').length;
    const gDone = goals.filter(g => g.name.trim() !== '').length;
    const pDone = people.filter(p => p.name.trim() !== '').length;
    const total = Math.max(healthGoals.length, 5) + goals.length + people.length;
    return total > 0 ? Math.round((hgSet + gDone + pDone) / total * 100) : 0;
  })();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #0A1628 0%, #0a2540 100%)' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.15)', borderTopColor: '#5BA4E6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ opacity: 0.5, fontSize: '14px' }}>Loading session...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Helper to get goals for a specific area
  const goalsForArea = (areaName: string) => healthGoals.filter(g => g.area === areaName);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* ── Session Header ── */}
      <div className="animate-fade" style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #0a2540 100%)',
        padding: '20px 20px 24px',
        color: 'white',
        borderBottom: '1px solid rgba(91,164,230,0.1)',
      }}>
        <button onClick={() => { flushPendingSaves(); onBack(); }} style={{
          background: 'none', border: 'none', color: 'white', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', opacity: 0.5, marginBottom: '12px', padding: 0,
          fontFamily: 'inherit',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          All Sessions
        </button>
        <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{sabbatical.title}</h1>
        <p style={{ fontSize: '13px', opacity: 0.4, margin: 0 }}>
          {new Date(sabbatical.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 16px' }}>
        {/* ── Day Tabs ── */}
        <div style={{ display: 'flex', gap: '6px', margin: '20px 0', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '4px' }}>
          {(['day1', 'day2'] as DayTab[]).map(d => (
            <button
              key={d}
              onClick={() => setDay(d)}
              style={{
                flex: 1, padding: '14px', borderRadius: '11px', fontWeight: 800, fontSize: '14px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                fontFamily: 'inherit',
                background: day === d ? '#0a2540' : 'rgba(255,255,255,0.08)',
                color: day === d ? 'white' : 'rgba(255,255,255,0.55)',
                border: day === d ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ fontSize: '16px' }}>{d === 'day1' ? '🔑' : '🖐️'}</span>
              {d === 'day1' ? 'Day 1 — Keys' : 'Day 2 — High Five'}
              {(d === 'day1' ? day1Progress : day2Progress) === 100 && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              )}
            </button>
          ))}
        </div>

        {/* ── Progress Bar ── */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <span>{day === 'day1' ? 'Day 1 Progress' : 'Day 2 Progress'}</span>
            <span>{day === 'day1' ? day1Progress : day2Progress}%</span>
          </div>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #5BA4E6, #22c55e)', borderRadius: '2px', width: `${day === 'day1' ? day1Progress : day2Progress}%`, transition: 'width 0.6s ease' }} />
          </div>
        </div>

        {/* ━━━━━━━━ DAY 1 CONTENT ━━━━━━━━ */}
        {day === 'day1' && (
          <div className="animate-fade">
            {/* Day 1 Header Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0f2744, #0c1a30)',
              borderRadius: '16px', padding: '28px 24px', marginBottom: '20px',
              border: '1px solid rgba(91,164,230,0.12)',
            }}>
              <h2 style={{ fontWeight: 900, fontSize: '24px', margin: '0 0 8px', color: 'white', letterSpacing: '-0.02em' }}>
                🔑 Keys to the Kingdom
              </h2>
              <p style={{ fontSize: '14px', opacity: 0.55, margin: '0 0 14px', lineHeight: 1.6, color: 'white' }}>
                Day 1 is about spiritual renewal. Work through each key at your own pace — take time to be present and honest with God.
              </p>
              <div className="verse-block">
                "I will give you the keys of the kingdom of heaven; whatever you bind on earth will be bound in heaven, and whatever you loose on earth will be loosed in heaven." — Matthew 16:19
              </div>
            </div>

            {/* Module Cards */}
            {keys.map((k, i) => {
              const mod = DAY1_MODULE_DEFS.find(m => m.id === k.moduleKey);
              if (!mod) return null;
              return (
                <KeysModule
                  key={k.id || k.moduleKey}
                  moduleId={mod.id}
                  entry={k}
                  isOpen={openModuleId === mod.id}
                  onToggleOpen={() => setOpenModuleId(openModuleId === mod.id ? null : mod.id)}
                  onSaveJournal={(text) => handleSaveKey({ ...k, userResponse: text })}
                  onToggleComplete={() => handleSaveKey({ ...k, completed: !k.completed })}
                />
              );
            })}
          </div>
        )}

        {/* ━━━━━━━━ DAY 2 CONTENT ━━━━━━━━ */}
        {day === 'day2' && (
          <div className="animate-fade">

            {/* ── Section A: Day 2 Overview Card ── */}
            <div style={{
              background: 'linear-gradient(135deg, #0f2744, #0c1a30)',
              borderRadius: '16px', padding: '28px 24px', marginBottom: '20px',
              border: '1px solid rgba(91,164,230,0.12)',
            }}>
              <h2 style={{ fontWeight: 900, fontSize: '24px', margin: '0 0 8px', color: 'white', letterSpacing: '-0.02em' }}>
                🖐️ High Five
              </h2>
              <p style={{ fontSize: '14px', opacity: 0.6, margin: '0 0 16px', lineHeight: 1.7, color: 'white' }}>
                {DAY2_OVERVIEW.intro}
              </p>
              <div className="verse-block">
                "{DAY2_OVERVIEW.scripture.text}" — {DAY2_OVERVIEW.scripture.reference}
              </div>
            </div>

            {/* Today's Process */}
            <div className="dark-card" style={{ cursor: 'default', marginBottom: '16px', padding: '20px' }}>
              <h3 style={{ fontWeight: 900, fontSize: '16px', margin: '0 0 14px', color: 'white' }}>📋 Today's Process</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {DAY2_OVERVIEW.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '50%',
                      background: 'rgba(91,164,230,0.15)', color: '#5BA4E6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 900, flexShrink: 0, marginTop: '1px',
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      {renderBold(step)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section B: Goal Education (expandable) ── */}
            <div className="dark-card" style={{ cursor: 'default', marginBottom: '16px', padding: '20px' }}>
              <h3 style={{ fontWeight: 900, fontSize: '16px', margin: '0 0 14px', color: 'white' }}>🎯 Learn About Goals</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', margin: '0 0 16px' }}>
                Before mapping out your goals, take a moment to review what makes a great goal.
              </p>
              <WhatAreGoalsRef />
              <SmartGoalsRef />
            </div>

            {/* ── Section C: Health Area Modules ── */}
            <h3 style={{ fontWeight: 800, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '28px 0 12px' }}>
              Map Your Goals by Area
            </h3>
            {health.map((h, i) => (
              <HealthAreaModule
                key={h.id || i}
                entry={h}
                goals={goalsForArea(h.area)}
                sessionId={sabbatical.id}
                onSaveEntry={handleSaveHealth}
                onGoalsChanged={refreshHealthGoals}
              />
            ))}

            {/* ── Section D: Transition Card — Stakes in the Ground ── */}
            <div style={{
              background: 'linear-gradient(135deg, #0f2744, #0c1a30)',
              borderRadius: '16px', padding: '24px', marginTop: '28px', marginBottom: '16px',
              border: '1px solid rgba(91,164,230,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '20px' }}>🏔️</span>
                <h3 style={{ fontWeight: 900, fontSize: '16px', margin: 0, color: 'white' }}>Stakes in the Ground</h3>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                {renderBold(DAY2_TRANSITIONS.afterHealthAreas)}
              </p>
            </div>

            {/* ── Section E: High Five Goals ── */}
            <div className="dark-card" style={{ cursor: 'default', padding: '20px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px' }}>🎯</span>
                <h3 style={{ fontWeight: 900, fontSize: '16px', margin: 0, color: 'white' }}>High Five Goals</h3>
              </div>
              <p style={{ fontSize: '13px', opacity: 0.5, margin: '0 0 16px', color: 'white', lineHeight: 1.5 }}>
                Pick 1 big goal from each area — your declaration to improve this one thing.
              </p>
              {goals.map((g, i) => (
                <Hi5GoalRow key={g.id || i} goal={g} onSave={handleSaveGoal} />
              ))}
            </div>

            {/* ── Section F: Hi 5 Reflections ── */}
            <div className="dark-card" style={{ cursor: 'default', padding: '20px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '18px' }}>💫</span>
                <h3 style={{ fontWeight: 900, fontSize: '16px', margin: 0, color: 'white' }}>High Five Reflections</h3>
              </div>
              {/* Green reflection */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', display: 'block', marginBottom: '8px' }}>
                  ✨ How will I feel if I accomplish my High Five goals?
                </label>
                <textarea
                  className="renew-textarea"
                  value={reflection?.howWillIFeel || ''}
                  onChange={e => {
                    if (reflection) handleSaveReflection({ ...reflection, howWillIFeel: e.target.value });
                  }}
                  placeholder="Describe how you'll feel when you've accomplished your goals..."
                />
              </div>
              {/* Pink reflection */}
              <div>
                <label style={{ fontSize: '14px', fontWeight: 700, color: '#ec4899', display: 'block', marginBottom: '8px' }}>
                  ⚠️ What will happen if I don't accomplish my High Five?
                </label>
                <textarea
                  className="renew-textarea"
                  value={reflection?.whatIfIDont || ''}
                  onChange={e => {
                    if (reflection) handleSaveReflection({ ...reflection, whatIfIDont: e.target.value });
                  }}
                  placeholder="What are the consequences of inaction?"
                />
              </div>
            </div>

            {/* ── Section G: Accountability Transition Card ── */}
            <div style={{
              background: 'linear-gradient(135deg, #0f2744, #0c1a30)',
              borderRadius: '16px', padding: '24px', marginTop: '28px', marginBottom: '16px',
              border: '1px solid rgba(91,164,230,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '20px' }}>🤝</span>
                <h3 style={{ fontWeight: 900, fontSize: '16px', margin: 0, color: 'white' }}>Accountability</h3>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: '0 0 14px' }}>
                {renderBold(DAY2_TRANSITIONS.afterHi5Goals)}
              </p>
              <div className="verse-block">
                "{DAY2_TRANSITIONS.proverbs1114.text}" — {DAY2_TRANSITIONS.proverbs1114.reference}
              </div>
            </div>

            {/* ── Section H: High Five People ── */}
            <div className="dark-card" style={{ cursor: 'default', padding: '20px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px' }}>👥</span>
                <h3 style={{ fontWeight: 900, fontSize: '16px', margin: 0, color: 'white' }}>High Five People</h3>
              </div>
              <p style={{ fontSize: '13px', opacity: 0.5, margin: '0 0 16px', color: 'white', lineHeight: 1.5 }}>
                Identify one person for each area. Reach out and check the box when they agree to hold you accountable.
              </p>
              {people.map((p, i) => (
                <PersonRow key={p.id || i} person={p} onSave={handleSavePerson} />
              ))}
            </div>

          </div>
        )}

        <div style={{ height: '60px' }} />
      </div>
    </div>
  );
};
