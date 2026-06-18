'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SabbaticalFull } from '@/types';
import * as api from '@/lib/api';
import { SessionView } from '@/components/SessionView';

export default function SessionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [sabbatical, setSabbatical] = useState<SabbaticalFull | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && params.id) {
      api.getSession(params.id as string).then((data: SabbaticalFull) => {
        console.log('Session loaded:', data?.id, data?.title);
        setSabbatical(data);
        setLoading(false);
      }).catch((err) => {
        console.error('Session load error:', err);
        router.push('/');
      });
    }
  }, [status, params.id, router]);

  if (loading || !sabbatical) {
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

  return (
    <SessionView
      sabbatical={sabbatical}
      onBack={() => router.push('/')}
      onUpdate={(updated) => setSabbatical(updated)}
    />
  );
}
