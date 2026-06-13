import type { ReactNode } from 'react';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: '#05070F', minHeight: '100vh' }}>
      <AnnouncementBanner />
      <Navbar />
      <main style={{ paddingTop: '88px' }}>{children}</main>
      <Footer />
    </div>
  );
}
