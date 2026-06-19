'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Play, Pause, Repeat, X } from 'lucide-react';

export type Track = {
  slug: string;
  title: string;
  subtitle: string;
  url: string;
};

type AudioCtx = {
  current: Track | null;
  isPlaying: boolean;
  loop: boolean;
  play: (t: Track) => void;
  toggle: () => void;
  stop: () => void;
  toggleLoop: () => void;
};

const Ctx = createContext<AudioCtx | null>(null);

export function useAudio() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAudio must be inside <AudioProvider>');
  return v;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(true);

  // Create a single persistent audio element
  useEffect(() => {
    const a = new Audio();
    a.preload = 'auto';
    a.loop = true;
    a.addEventListener('play', () => setIsPlaying(true));
    a.addEventListener('pause', () => setIsPlaying(false));
    a.addEventListener('ended', () => setIsPlaying(false));
    audioRef.current = a;
    return () => {
      a.pause();
      a.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = loop;
  }, [loop]);

  const play = (t: Track) => {
    const a = audioRef.current;
    if (!a) return;
    if (current?.slug === t.slug) {
      if (a.paused) a.play();
      else a.pause();
      return;
    }
    a.src = t.url;
    a.loop = loop;
    a.play().catch(() => {});
    setCurrent(t);
  };

  const toggle = () => {
    const a = audioRef.current;
    if (!a || !current) return;
    if (a.paused) a.play();
    else a.pause();
  };

  const stop = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setCurrent(null);
  };

  const toggleLoop = () => setLoop((v) => !v);

  return (
    <Ctx.Provider value={{ current, isPlaying, loop, play, toggle, stop, toggleLoop }}>
      {children}
      <GlobalPlayerBar />
    </Ctx.Provider>
  );
}

function GlobalPlayerBar() {
  const { current, isPlaying, loop, toggle, stop, toggleLoop } = useAudio();
  if (!current) return null;

  return (
    <div className="global-player">
      <div className="global-player-inner">
        <button onClick={toggle} className="gp-play" aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" />}
        </button>
        <div className="gp-meta">
          <div className="gp-title">{current.title}</div>
          <div className="gp-sub">{current.subtitle}</div>
        </div>
        <button
          onClick={toggleLoop}
          className={`gp-loop ${loop ? 'on' : ''}`}
          aria-label="Toggle loop"
          title={loop ? 'Loop on' : 'Loop off'}
        >
          <Repeat size={16} />
        </button>
        <button onClick={stop} className="gp-close" aria-label="Close player">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
