'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, LogOut, CreditCard, Shield, Mail, Bell, ChevronRight } from 'lucide-react';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #0A1628, #0a2540)', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <User size={32} style={{ color: 'var(--blue-accent)', marginBottom: '12px' }} />
          <p style={{ opacity: 0.5 }}>Loading account...</p>
        </div>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0A1628 0%, #0d1f35 50%, #0A1628 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0A1628, #0a2540 60%, #153d6b 100%)',
        padding: '48px 24px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 30%, rgba(91,164,230,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        {/* Avatar */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 12px',
          background: 'linear-gradient(135deg, var(--blue-accent), #153d6b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '3px solid rgba(255,255,255,0.15)', position: 'relative',
          overflow: 'hidden',
        }}>
          {user?.image ? (
            <img src={user.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <User size={32} style={{ color: 'white' }} />
          )}
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 4px', position: 'relative' }}>
          {user?.name || 'User'}
        </h1>
        <p style={{ fontSize: '13px', opacity: 0.5, margin: 0, position: 'relative' }}>
          {user?.email || ''}
        </p>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px 20px' }}>
        {/* Subscription Card */}
        <div className="animate-in stagger-1" style={{
          background: 'linear-gradient(135deg, #0a2540, #153d6b)',
          borderRadius: '16px', padding: '24px', marginBottom: '20px',
          border: '1px solid rgba(91,164,230,0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <CreditCard size={18} style={{ color: 'var(--blue-accent)' }} />
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue-accent)' }}>Subscription</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: '20px', marginBottom: '4px' }}>Founding Member</div>
              <div style={{ fontSize: '13px', opacity: 0.5 }}>Full access to all features</div>
            </div>
            <div style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
              background: 'rgba(34,197,94,0.15)', color: '#22c55e',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              Active
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <h3 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '12px' }}>
          Settings
        </h3>

        {[
          { icon: <Mail size={18} />, label: 'Email Preferences', desc: 'Manage notifications', color: '#5BA4E6' },
          { icon: <Bell size={18} />, label: 'Reminders', desc: 'Session & goal reminders', color: '#f59e0b' },
          { icon: <Shield size={18} />, label: 'Privacy', desc: 'Data & account security', color: '#22c55e' },
        ].map((item, i) => (
          <div
            key={i}
            className={`animate-in stagger-${i + 2}`}
            style={{
              background: 'linear-gradient(135deg, #0f2744, #0c1a30)', borderRadius: '14px', padding: '16px 18px',
              border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '14px',
              marginBottom: '8px', cursor: 'pointer', transition: 'all 0.3s ease', opacity: 0.6,
            }}
          >
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: `${item.color}15`, color: item.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '2px' }}>{item.label}</div>
              <div style={{ fontSize: '12px', opacity: 0.4 }}>{item.desc}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Soon</span>
              <ChevronRight size={16} style={{ opacity: 0.3 }} />
            </div>
          </div>
        ))}

        {/* Sign Out */}
        <button
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          className="animate-in stagger-5"
          style={{
            width: '100%', marginTop: '24px', padding: '16px',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '14px', color: '#ef4444', fontWeight: 800, fontSize: '15px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            fontFamily: 'inherit', transition: 'all 0.2s ease',
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>

        {/* Version */}
        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '11px', opacity: 0.25 }}>
          RE:NEW v1.0 · Made with ❤️
        </div>
      </div>
    </div>
  );
}
