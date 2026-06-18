'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sabbatical } from '@/types';
import * as api from '@/lib/api';
import { Landing } from '@/components/Landing';

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
        background: 'linear-gradient(135deg, #000000 0%, #0a2540 100%)',
        color: 'white',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.03em' }}>RE:NEW</h1>
          <div className="spinner" />
        </div>
      </div>
    );
  }

  const handleSelect = (s: Sabbatical) => {
    router.push(`/session/${s.id}`);
  };

  const handleNew = async (title: string, date: string) => {
    const newSab = await api.createSession(title, date);
    router.push(`/session/${newSab.id}`);
  };

  return (
    <Landing
      sessions={sabbaticals}
      userName={session?.user?.name || undefined}
      onSelectSession={handleSelect}
      onNewSession={handleNew}
    />
  );
}
