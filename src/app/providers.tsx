'use client';

import { SessionProvider } from 'next-auth/react';
import { AudioProvider } from '@/components/AudioPlayer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AudioProvider>{children}</AudioProvider>
    </SessionProvider>
  );
}
