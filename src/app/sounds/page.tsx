'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Headphones, Play, Pause } from 'lucide-react';
import { useAudio } from '@/components/AudioPlayer';

interface SoundTrack {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  frequency: string;
  color: string;
  file: string;
}

const STORAGE_BASE =
  'https://klhhebbyuhrsbvqenril.supabase.co/storage/v1/object/public/binaural';

const TRACKS: SoundTrack[] = [
  { id: 'deep-prayer',     title: 'Deep Prayer',        subtitle: 'Lo-fi worship · 6 Hz theta · Deep meditation',  icon: '🙏', frequency: '6 Hz Theta',  color: '#5BA4E6', file: 'deep_prayer.mp3' },
  { id: 'soaking-worship', title: 'Soaking Worship',    subtitle: 'Lo-fi worship · 10 Hz alpha · Peaceful presence', icon: '🕊️', frequency: '10 Hz Alpha', color: '#a855f7', file: 'soaking_worship.mp3' },
  { id: 'focus',           title: 'Focus & Clarity',    subtitle: 'Lo-fi study · 15 Hz beta · Mental sharpness',   icon: '🎯', frequency: '15 Hz Beta',  color: '#22c55e', file: 'focus.mp3' },
  { id: 'deep-rest',       title: 'Deep Rest',          subtitle: 'Ambient drone · 2.5 Hz delta · Restorative calm', icon: '🌙', frequency: '2.5 Hz Delta', color: '#5BE6A4', file: 'deep_rest.mp3' },
  { id: 'scripture',       title: 'Scripture Ambience', subtitle: 'Cinematic sacred strings · 7 Hz theta',         icon: '📖', frequency: '7 Hz Theta',  color: '#E6855B', file: 'scripture.mp3' },
  { id: 'be-still',        title: 'Be Still',           subtitle: 'Pure meditative pad · 999 Hz solfeggio · Stillness',  icon: '🌿', frequency: '999 Hz',      color: '#f59e0b', file: 'be_still.mp3' },
  { id: 'release',         title: 'Release',            subtitle: 'Pure meditative pad · 333 Hz solfeggio · Surrender',  icon: '🕯️', frequency: '333 Hz',      color: '#ec4899', file: 'release.mp3' },
];

export default function SoundsPage() {
  const { status } = useSession();
  const router = useRouter();
  const { current, isPlaying, play } = useAudio();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #0A1628, #0a2540)', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <Headphones size={32} style={{ color: 'var(--blue-accent)', marginBottom: '12px' }} />
          <p style={{ opacity: 0.5 }}>Loading sounds...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0A1628 0%, #0d1f35 50%, #0A1628 100%)', paddingBottom: '140px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0A1628, #0a2540 60%, #153d6b 100%)',
        padding: '48px 24px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <Headphones size={28} style={{ color: '#a855f7', marginBottom: '8px', position: 'relative' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 4px', position: 'relative' }}>Sounds</h1>
        <p style={{ fontSize: '13px', opacity: 0.5, margin: 0, position: 'relative' }}>
          Lo-fi worship with binaural beats · headphones recommended
        </p>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px 20px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>
          Choose a Sound
        </h3>

        {TRACKS.map((track, i) => {
          const isActive = current?.slug === track.id;
          const playing = isActive && isPlaying;
          return (
            <div
              key={track.id}
              className={`animate-in stagger-${Math.min(i + 1, 6)}`}
              onClick={() => play({ slug: track.id, title: track.title, subtitle: track.frequency, url: `${STORAGE_BASE}/${track.file}` })}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${track.color}18, ${track.color}08)`
                  : 'linear-gradient(135deg, #0f2744, #0c1a30)',
                borderRadius: '14px', padding: '16px 18px', marginBottom: '10px',
                border: `1px solid ${isActive ? track.color + '40' : 'rgba(255,255,255,0.06)'}`,
                display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${track.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '22px',
              }}>{track.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '2px' }}>{track.title}</div>
                <div style={{ fontSize: '12px', opacity: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.subtitle}</div>
              </div>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: playing ? track.color : (isActive ? `${track.color}40` : 'rgba(255,255,255,0.08)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease', flexShrink: 0,
              }}>
                {playing ? (
                  <Pause size={16} style={{ color: 'white' }} fill="white" />
                ) : (
                  <Play size={14} style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.6)', marginLeft: '2px' }} fill={isActive ? 'white' : 'currentColor'} />
                )}
              </div>
            </div>
          );
        })}

        <div style={{
          marginTop: '20px', padding: '16px 18px', borderRadius: '14px',
          background: 'rgba(91,164,230,0.06)', border: '1px solid rgba(91,164,230,0.1)',
        }}>
          <p style={{ fontSize: '13px', opacity: 0.6, margin: 0, lineHeight: 1.6 }}>
            🎧 <strong style={{ color: 'white', fontWeight: 700 }}>Headphones required.</strong> Each track is a 30-minute lo-fi worship loop with binaural beats baked in. The player keeps playing as you move between pages — loop on by default.
          </p>
        </div>
      </div>
    </div>
  );
}
