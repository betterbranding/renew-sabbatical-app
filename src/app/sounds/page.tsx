'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Headphones, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface SoundTrack {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  frequency: string;
  color: string;
  // YouTube embed IDs for binaural beats
  youtubeId: string;
}

const TRACKS: SoundTrack[] = [
  {
    id: 'deep-prayer',
    title: 'Deep Prayer',
    subtitle: 'Theta waves · 6Hz · Deep meditation',
    icon: '🙏',
    frequency: '6Hz Theta',
    color: '#5BA4E6',
    youtubeId: 'WPni755-Krg', // Binaural beats for prayer/meditation
  },
  {
    id: 'soaking-worship',
    title: 'Soaking Worship',
    subtitle: 'Alpha waves · 10Hz · Peaceful presence',
    icon: '🕊️',
    frequency: '10Hz Alpha',
    color: '#a855f7',
    youtubeId: 'bPaTNXB5kik', // Soaking worship music
  },
  {
    id: 'focus-clarity',
    title: 'Focus & Clarity',
    subtitle: 'Beta waves · 14Hz · Mental sharpness',
    icon: '🎯',
    frequency: '14Hz Beta',
    color: '#22c55e',
    youtubeId: 'jOwvLAe6RYw', // Focus binaural beats
  },
  {
    id: 'deep-rest',
    title: 'Deep Rest',
    subtitle: 'Delta waves · 2Hz · Restorative calm',
    icon: '🌙',
    frequency: '2Hz Delta',
    color: '#5BE6A4',
    youtubeId: 'tUUGerPankw', // Delta wave sleep music
  },
  {
    id: 'scripture-ambience',
    title: 'Scripture Ambience',
    subtitle: 'Gentle piano · Atmospheric · Reflective',
    icon: '📖',
    frequency: 'Ambient',
    color: '#E6855B',
    youtubeId: 'YdGSeMi5tFg', // Instrumental scripture meditation
  },
  {
    id: 'nature-peace',
    title: 'Nature & Peace',
    subtitle: 'Rain & forest · Natural frequencies',
    icon: '🌿',
    frequency: 'Natural',
    color: '#f59e0b',
    youtubeId: 'jfKfPfyJRdk', // Lo-fi / nature sounds
  },
];

export default function SoundsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handlePlay = (trackId: string) => {
    if (activeTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(trackId);
      setIsPlaying(true);
    }
  };

  const activeTrackData = TRACKS.find(t => t.id === activeTrack);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0A1628 0%, #0d1f35 50%, #0A1628 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0A1628, #0a2540 60%, #153d6b 100%)',
        padding: '48px 24px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <Headphones size={28} style={{ color: '#a855f7', marginBottom: '8px', position: 'relative' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 4px', position: 'relative' }}>Sounds</h1>
        <p style={{ fontSize: '13px', opacity: 0.5, margin: 0, position: 'relative' }}>
          Binaural beats & ambient sounds for soaking
        </p>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px 20px' }}>
        {/* Now Playing */}
        {activeTrack && activeTrackData && (
          <div className="animate-in" style={{
            background: `linear-gradient(135deg, ${activeTrackData.color}15, ${activeTrackData.color}08)`,
            borderRadius: '16px', padding: '0', marginBottom: '20px', overflow: 'hidden',
            border: `1px solid ${activeTrackData.color}30`,
          }}>
            {/* YouTube Embed */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${activeTrackData.youtubeId}?autoplay=1&loop=1&playlist=${activeTrackData.youtubeId}&rel=0`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>{activeTrackData.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '15px' }}>{activeTrackData.title}</div>
                <div style={{ fontSize: '12px', opacity: 0.5 }}>{activeTrackData.frequency}</div>
              </div>
              <div style={{
                padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 700,
                background: `${activeTrackData.color}20`, color: activeTrackData.color,
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                Now Playing
              </div>
            </div>
          </div>
        )}

        {/* Track List */}
        <h3 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>
          Choose a Sound
        </h3>

        {TRACKS.map((track, i) => {
          const isActive = activeTrack === track.id;
          return (
            <div
              key={track.id}
              className={`animate-in stagger-${Math.min(i + 1, 6)}`}
              onClick={() => handlePlay(track.id)}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${track.color}12, ${track.color}06)`
                  : 'linear-gradient(135deg, #0f2744, #0c1a30)',
                borderRadius: '14px', padding: '16px 18px', marginBottom: '10px',
                border: `1px solid ${isActive ? track.color + '30' : 'rgba(255,255,255,0.06)'}`,
                display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${track.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '22px',
              }}>
                {track.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '2px' }}>{track.title}</div>
                <div style={{ fontSize: '12px', opacity: 0.4 }}>{track.subtitle}</div>
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: isActive ? track.color : 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}>
                {isActive ? (
                  <Volume2 size={16} style={{ color: 'white' }} />
                ) : (
                  <Play size={14} style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '2px' }} />
                )}
              </div>
            </div>
          );
        })}

        {/* Tip */}
        <div style={{
          marginTop: '20px', padding: '16px 18px', borderRadius: '14px',
          background: 'rgba(91,164,230,0.06)', border: '1px solid rgba(91,164,230,0.1)',
        }}>
          <p style={{ fontSize: '13px', opacity: 0.5, margin: 0, lineHeight: 1.6 }}>
            💡 <strong style={{ color: 'white', fontWeight: 700 }}>Tip:</strong> Play sounds during your sabbatical session for deeper focus and soaking in God's presence. Audio continues as you navigate between pages.
          </p>
        </div>
      </div>
    </div>
  );
}
