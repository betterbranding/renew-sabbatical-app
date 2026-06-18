'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, BookOpen, Target, Headphones, Compass, User } from 'lucide-react';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: Home, path: '/' },
  { key: 'sessions', label: 'Sessions', icon: BookOpen, path: '/sessions' },
  { key: 'tracker', label: 'Tracker', icon: Target, path: '/tracker' },
  { key: 'sounds', label: 'Sounds', icon: Headphones, path: '/sounds' },
  { key: 'resources', label: 'Resources', icon: Compass, path: '/resources' },
  { key: 'account', label: 'Account', icon: User, path: '/account' },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide on sign-in page and inside individual sessions
  if (pathname?.startsWith('/auth') || pathname?.startsWith('/session/')) return null;

  const activeKey = NAV_ITEMS.find(item => {
    if (item.path === '/') return pathname === '/';
    return pathname?.startsWith(item.path);
  })?.key || 'home';

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(item => {
        const isActive = item.key === activeKey;
        const Icon = item.icon;
        return (
          <button
            key={item.key}
            onClick={() => router.push(item.path)}
            className={`bottom-nav-item ${isActive ? 'bottom-nav-active' : ''}`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
