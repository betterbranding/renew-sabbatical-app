import React, { useState, useRef, useEffect } from 'react';
import { DAY1_MODULES, LessonStep, LessonModule } from '../utils/content';
import { KeyEntry } from '../types';

// ── Helper: render markdown bold **text** as <strong> ──
function renderText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Preserve line breaks
    const lines = part.split('\n');
    if (lines.length === 1) return <span key={i}>{part}</span>;
    return (
      <span key={i}>
        {lines.map((line, j) => (
          <span key={j}>{line}{j < lines.length - 1 && <br />}</span>
        ))}
      </span>
    );
  });
}

// ── Expandable section with smooth animation ──
const ExpandableSection: React.FC<{
  title: string;
  icon?: string;
  color?: string;
  type: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, icon, color, type, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open, children]);

  const typeLabel = type === 'prayer' ? '🙏 PRAYER' : type === 'reference' ? '📖 REFERENCE' : type === 'expandable' ? '📚 READ MORE' : '';
  const borderColor = color === 'blue' ? '#5BA4E6' : color === 'green' ? '#22c55e' : color === 'purple' ? '#a855f7' : color === 'pink' ? '#ec4899' : '#5BA4E6';

  return (
    <div className="expandable-section" style={{
      marginBottom: '12px',
      borderRadius: '12px',
      overflow: 'hidden',
      border: `1px solid ${open ? borderColor + '40' : 'rgba(255,255,255,0.08)'}`,
      transition: 'border-color 0.3s ease',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 16px',
          background: open ? borderColor + '12' : 'rgba(255,255,255,0.04)',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
          fontFamily: 'inherit',
          textAlign: 'left',
          transition: 'background 0.3s ease',
        }}
      >
        <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon || (type === 'prayer' ? '🙏' : '📖')}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '-0.01em' }}>{title}</div>
          {typeLabel && <div style={{ fontSize: '10px', fontWeight: 700, color: borderColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{typeLabel}</div>}
        </div>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{
            opacity: 0.4,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div style={{
        maxHeight: open ? `${Math.max(height + 40, 2000)}px` : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
        opacity: open ? 1 : 0,
      }}>
        <div ref={contentRef} style={{ padding: '0 16px 16px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ── Scripture Callout ──
const ScriptureCallout: React.FC<{ step: LessonStep }> = ({ step }) => {
  const borderColor = step.color === 'green' ? '#22c55e' : step.color === 'pink' ? '#ec4899' : step.color === 'gray' ? '#94a3b8' : '#5BA4E6';
  const bgColor = step.color === 'green' ? 'rgba(34,197,94,0.08)' : step.color === 'pink' ? 'rgba(236,72,153,0.08)' : step.color === 'gray' ? 'rgba(148,163,184,0.06)' : 'rgba(91,164,230,0.08)';
  return (
    <div className="scripture-callout" style={{
      borderLeft: `4px solid ${borderColor}`,
      background: bgColor,
      borderRadius: '0 12px 12px 0',
      padding: '16px 20px',
      margin: '16px 0',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <span style={{ fontSize: '20px', flexShrink: 0, marginTop: '2px' }}>{step.icon || '✝️'}</span>
        <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
          {renderText(step.content)}
        </div>
      </div>
    </div>
  );
};

// ── Teaching Content ──
const TeachingContent: React.FC<{ step: LessonStep }> = ({ step }) => (
  <div className="teaching-content" style={{ margin: '16px 0' }}>
    {step.title && step.title !== 'Now Do This' && (
      <h4 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 10px', color: 'white', letterSpacing: '-0.01em' }}>
        {step.title}
      </h4>
    )}
    <div style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.75)' }}>
      {renderText(step.content)}
    </div>
  </div>
);

// ── Action Step ──
const ActionStep: React.FC<{ step: LessonStep }> = ({ step }) => (
  <div style={{
    margin: '16px 0',
    padding: '16px 20px',
    background: 'rgba(91,164,230,0.06)',
    borderRadius: '12px',
    border: '1px solid rgba(91,164,230,0.12)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <span style={{ fontSize: '14px' }}>⚡</span>
      <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5BA4E6' }}>
        {step.title}
      </span>
    </div>
    <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
      {renderText(step.content)}
    </div>
  </div>
);

// ── Video Embed ──
const VideoEmbed: React.FC<{ step: LessonStep }> = ({ step }) => {
  const url = step.content;
  let embedUrl = '';
  if (url.includes('youtu.be/')) {
    embedUrl = `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
  } else if (url.includes('youtube.com/watch')) {
    const vid = new URL(url).searchParams.get('v');
    if (vid) embedUrl = `https://www.youtube.com/embed/${vid}`;
  }
  if (!embedUrl) return null;

  return (
    <div className="video-embed" style={{ margin: '16px 0' }}>
      {step.title && (
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>
          🎬 {step.title}
        </div>
      )}
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#000',
      }}>
        <iframe
          src={embedUrl}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

// ── Prayer Card ──
const PrayerCard: React.FC<{ step: LessonStep }> = ({ step }) => {
  const borderColor = step.color === 'green' ? '#22c55e' : step.color === 'purple' ? '#a855f7' : '#5BA4E6';
  return (
    <div className="prayer-card" style={{
      padding: '20px',
      background: `linear-gradient(135deg, ${borderColor}0a, ${borderColor}05)`,
      borderRadius: '12px',
      border: `1px solid ${borderColor}25`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        marginBottom: '14px',
        paddingBottom: '12px',
        borderBottom: `1px solid ${borderColor}20`,
      }}>
        <span style={{ fontSize: '18px' }}>🙏</span>
        <span style={{
          fontSize: '11px', fontWeight: 900, textTransform: 'uppercase',
          letterSpacing: '0.12em', color: borderColor,
        }}>
          Read Aloud
        </span>
      </div>
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'rgba(255,255,255,0.82)' }}>
        {renderText(step.content)}
      </div>
    </div>
  );
};

// ── Render a single step recursively ──
const StepRenderer: React.FC<{ step: LessonStep; depth?: number }> = ({ step, depth = 0 }) => {
  // Scripture callout
  if (step.type === 'scripture') {
    return <ScriptureCallout step={step} />;
  }

  // Teaching
  if (step.type === 'teaching') {
    return <TeachingContent step={step} />;
  }

  // Video
  if (step.type === 'video') {
    return <VideoEmbed step={step} />;
  }

  // Prayer (expandable or inline)
  if (step.type === 'prayer') {
    if (step.expandable) {
      return (
        <ExpandableSection title={step.title} icon={step.icon} color={step.color} type="prayer">
          <PrayerCard step={step} />
        </ExpandableSection>
      );
    }
    return <PrayerCard step={step} />;
  }

  // Reference (expandable)
  if (step.type === 'reference') {
    return (
      <ExpandableSection title={step.title} icon={step.icon} color={step.color} type="reference" defaultOpen={!step.expandable}>
        <div style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.78)' }}>
          {renderText(step.content)}
        </div>
      </ExpandableSection>
    );
  }

  // Expandable generic
  if (step.type === 'expandable' && step.expandable) {
    return (
      <ExpandableSection title={step.title} icon={step.icon} color={step.color} type="expandable">
        <div style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.78)' }}>
          {renderText(step.content)}
        </div>
      </ExpandableSection>
    );
  }

  // Action with sub-steps
  if (step.type === 'action') {
    return (
      <div style={{ margin: '16px 0' }}>
        <ActionStep step={step} />
        {step.subSteps && step.subSteps.map((sub, i) => (
          <div key={i} style={{ marginLeft: depth > 0 ? '0' : '0', marginTop: '8px' }}>
            <StepRenderer step={sub} depth={depth + 1} />
          </div>
        ))}
      </div>
    );
  }

  // Fallback
  return (
    <div style={{ margin: '12px 0', fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
      {step.title && <h4 style={{ fontWeight: 700, margin: '0 0 6px', color: 'white' }}>{step.title}</h4>}
      {renderText(step.content)}
    </div>
  );
};

// ── Main KeysModule Component ──
interface KeysModuleProps {
  moduleId: string;
  entry: KeyEntry;
  onSaveJournal: (text: string) => void;
  onToggleComplete: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const KeysModule: React.FC<KeysModuleProps> = ({
  moduleId, entry, onSaveJournal, onToggleComplete, isOpen, onToggleOpen
}) => {
  const lessonModule = DAY1_MODULES.find(m => m.id === moduleId);
  if (!lessonModule) return null;

  const [journal, setJournal] = useState(entry.user_response || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const contentRef = useRef<HTMLDivElement>(null);
  const isCompleted = entry.completed === 1;

  const handleJournalChange = (val: string) => {
    setJournal(val);
    setSaved(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSaveJournal(val);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 1500);
  };

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  // Sync journal text when entry changes externally
  useEffect(() => {
    setJournal(entry.user_response || '');
  }, [entry.user_response]);

  return (
    <div className={`module-card ${isCompleted ? 'module-card-completed' : ''} ${isOpen ? 'module-card-open' : ''}`}>
      {/* ── Card Header ── */}
      <div onClick={onToggleOpen} className="module-card-header">
        <div className={`module-card-icon ${isCompleted ? 'module-card-icon-done' : ''}`}>
          {isCompleted ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <span style={{ fontSize: '22px' }}>{lessonModule.icon}</span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontWeight: 900, fontSize: '18px', margin: '0 0 3px', color: 'white',
            letterSpacing: '-0.02em',
          }}>
            {lessonModule.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {lessonModule.time}
            </span>
            {lessonModule.tags.map(t => (
              <span key={t} style={{
                fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                borderRadius: '10px', background: 'rgba(91,164,230,0.15)', color: '#5BA4E6',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{t}</span>
            ))}
          </div>
        </div>
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{
            opacity: 0.3,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* ── Summary (visible when closed) ── */}
      {!isOpen && (
        <div style={{ padding: '0 20px 16px', fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.45)' }}>
          {lessonModule.summary}
        </div>
      )}

      {/* ── Expanded Lesson Content ── */}
      <div
        className="module-content"
        style={{
          maxHeight: isOpen ? '100000px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
        }}
      >
        <div ref={contentRef} style={{
          padding: '0 20px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          marginTop: '4px',
          paddingTop: '20px',
        }}>
          {/* Step indicator */}
          <div className="step-indicator">
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5BA4E6' }}>
              {lessonModule.steps.length} steps in this lesson
            </span>
            <div style={{
              height: '2px', background: 'rgba(91,164,230,0.15)', borderRadius: '1px',
              marginTop: '8px', marginBottom: '20px',
            }}>
              <div style={{
                height: '100%', background: 'linear-gradient(90deg, #5BA4E6, #22c55e)',
                borderRadius: '1px', width: isCompleted ? '100%' : '0%',
                transition: 'width 0.6s ease',
              }} />
            </div>
          </div>

          {/* Render all steps */}
          {lessonModule.steps.map((step, i) => (
            <StepRenderer key={i} step={step} />
          ))}

          {/* ── Journal Area ── */}
          {lessonModule.journalPrompt && (
            <div className="journal-area" style={{
              marginTop: '28px',
              padding: '20px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '16px' }}>✍️</span>
                <span style={{
                  fontSize: '11px', fontWeight: 900, textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: '#5BA4E6',
                }}>
                  Journal
                </span>
                {saved && (
                  <span style={{
                    fontSize: '11px', color: '#22c55e', fontWeight: 600,
                    marginLeft: 'auto', animation: 'fadeIn 0.3s ease',
                  }}>
                    ✓ Saved
                  </span>
                )}
              </div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', margin: '0 0 12px', lineHeight: 1.5 }}>
                {lessonModule.journalPrompt}
              </p>
              <textarea
                className="renew-textarea"
                value={journal}
                onChange={(e) => handleJournalChange(e.target.value)}
                placeholder="Write your thoughts here..."
                style={{ minHeight: '160px' }}
              />
            </div>
          )}

          {/* ── Complete Button ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
            <button
              onClick={onToggleComplete}
              className={`btn-renew ${isCompleted ? 'btn-outline' : 'btn-complete'}`}
              style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 800 }}
            >
              {isCompleted ? '↩ Mark Incomplete' : '✓ Mark Complete'}
            </button>
            {isCompleted && (
              <span style={{ fontSize: '13px', color: '#22c55e', fontWeight: 600 }}>
                Lesson Complete ✓
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
