import type { Metadata } from 'next';
import { Providers } from './providers';
import { BottomNav } from '@/components/BottomNav';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'RE:NEW | Personal Sabbatical Framework',
  description: 'A guided 2-day sabbatical experience for spiritual renewal and life planning.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="has-bottom-nav">
            {children}
          </div>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
