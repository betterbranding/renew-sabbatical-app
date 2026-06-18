'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Compass, ExternalLink, BookOpen, Video, FileText, Heart } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  url?: string;
  tag?: string;
}

const RESOURCES: { section: string; items: Resource[] }[] = [
  {
    section: 'The RE:NEW Framework',
    items: [
      {
        title: 'Day 1 — Keys to the Kingdom',
        description: 'Reverence, Release, Repent, Renounce, Receive. Five keys for spiritual renewal based on Matthew 16:19.',
        icon: <span style={{ fontSize: '20px' }}>🔑</span>,
        color: '#5BA4E6',
        tag: 'Day 1',
      },
      {
        title: 'Day 2 — Hi 5',
        description: 'Five areas of life assessment: Health, Goals, People, and Reflection for holistic life planning.',
        icon: <span style={{ fontSize: '20px' }}>🖐️</span>,
        color: '#22c55e',
        tag: 'Day 2',
      },
    ],
  },
  {
    section: 'Key Scriptures',
    items: [
      {
        title: 'Matthew 16:19',
        description: '"I will give you the keys of the kingdom of heaven; whatever you bind on earth will be bound in heaven."',
        icon: <BookOpen size={20} />,
        color: '#5BA4E6',
      },
      {
        title: 'Proverbs 11:14',
        description: '"Where there is no counsel, the people fall; but in the multitude of counselors there is safety."',
        icon: <BookOpen size={20} />,
        color: '#a855f7',
      },
      {
        title: 'Psalm 46:10',
        description: '"Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."',
        icon: <BookOpen size={20} />,
        color: '#E6855B',
      },
      {
        title: 'Romans 12:2',
        description: '"Be transformed by the renewing of your mind, that you may prove what is that good and acceptable and perfect will of God."',
        icon: <BookOpen size={20} />,
        color: '#22c55e',
      },
      {
        title: 'Isaiah 43:18-19',
        description: '"Forget the former things; do not dwell on the past. See, I am doing a new thing!"',
        icon: <BookOpen size={20} />,
        color: '#f59e0b',
      },
    ],
  },
  {
    section: 'Recommended Reading',
    items: [
      {
        title: 'The Ruthless Elimination of Hurry',
        description: 'John Mark Comer — Learning to slow down and live an unhurried life with Jesus.',
        icon: <FileText size={20} />,
        color: '#5BA4E6',
        url: 'https://www.amazon.com/Ruthless-Elimination-Hurry-Emotionally-Spiritually/dp/0525653090',
      },
      {
        title: 'Emotionally Healthy Spirituality',
        description: 'Peter Scazzero — The link between emotional health and spiritual maturity.',
        icon: <FileText size={20} />,
        color: '#a855f7',
        url: 'https://www.amazon.com/Emotionally-Healthy-Spirituality-Impossible-Spiritually/dp/0310348498',
      },
      {
        title: 'Sabbath: Finding Rest, Renewal, and Delight',
        description: 'Wayne Muller — Rediscovering the ancient practice of Sabbath rest.',
        icon: <FileText size={20} />,
        color: '#22c55e',
        url: 'https://www.amazon.com/Sabbath-Finding-Renewal-Delight-Overworked/dp/0553380117',
      },
    ],
  },
  {
    section: 'Helpful Links',
    items: [
      {
        title: 'Bible Gateway',
        description: 'Search and read scripture in multiple translations.',
        icon: <ExternalLink size={20} />,
        color: '#5BA4E6',
        url: 'https://www.biblegateway.com',
      },
      {
        title: 'YouVersion Bible App',
        description: 'Reading plans and devotionals for daily study.',
        icon: <ExternalLink size={20} />,
        color: '#22c55e',
        url: 'https://www.bible.com',
      },
      {
        title: 'The Chosen (Watch Free)',
        description: 'Multi-season show about the life of Jesus and his disciples.',
        icon: <Video size={20} />,
        color: '#E6855B',
        url: 'https://www.angel.com/watch/the-chosen',
      },
    ],
  },
];

export default function ResourcesPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #0A1628, #0a2540)', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <Compass size={32} style={{ color: 'var(--blue-accent)', marginBottom: '12px' }} />
          <p style={{ opacity: 0.5 }}>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0A1628 0%, #0d1f35 50%, #0A1628 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0A1628, #0a2540 60%, #153d6b 100%)',
        padding: '48px 24px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 50%, rgba(91,164,230,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <Compass size={28} style={{ color: 'var(--blue-accent)', marginBottom: '8px', position: 'relative' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 4px', position: 'relative' }}>Resources</h1>
        <p style={{ fontSize: '13px', opacity: 0.5, margin: 0, position: 'relative' }}>
          Scriptures, reading, and tools for your journey
        </p>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px 20px' }}>
        {RESOURCES.map((section, si) => (
          <div key={section.section} className={`animate-in stagger-${Math.min(si + 1, 6)}`} style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '12px' }}>
              {section.section}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {section.items.map((item, i) => {
                const Wrapper = item.url ? 'a' : 'div';
                const wrapperProps = item.url ? { href: item.url, target: '_blank', rel: 'noopener noreferrer', style: { textDecoration: 'none', color: 'inherit' } } : {};
                return (
                  <Wrapper key={i} {...(wrapperProps as any)}>
                    <div style={{
                      background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '16px 18px',
                      border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'flex-start', gap: '14px',
                      cursor: item.url ? 'pointer' : 'default', transition: 'all 0.3s ease',
                    }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: `${item.color}15`, color: item.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 800, fontSize: '14px' }}>{item.title}</span>
                          {item.tag && (
                            <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '8px', background: `${item.color}15`, color: item.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '13px', opacity: 0.45, lineHeight: 1.5 }}>{item.description}</div>
                      </div>
                      {item.url && <ExternalLink size={14} style={{ opacity: 0.3, flexShrink: 0, marginTop: '4px' }} />}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
