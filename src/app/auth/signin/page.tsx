'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0A1628 0%, #1B3A5C 60%, #2d5a8e 100%)',
      color: 'white',
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '400px', padding: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 8px' }}>RE:NEW</h1>
        <p style={{ fontSize: '14px', fontWeight: 500, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 40px' }}>
          Personal Sabbatical Framework
        </p>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: 700,
            color: '#0A1628',
            background: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
        <p style={{ fontSize: '13px', opacity: 0.4, marginTop: '24px' }}>
          Your sabbatical data is private and only visible to you.
        </p>
      </div>
    </div>
  );
}
