import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';

function MobileTopBar() {
  return (
    <div
      className="md:hidden fixed top-0 left-0 right-0 z-40 h-12 flex items-center px-5"
      style={{
        background: '#05070F',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Link to="/" className="focus:outline-none">
        <span
          style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.18em',
            fontSize: '1.1rem',
            color: '#fff',
          }}
        >
          L
          <span style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>U</span>
          M
          <span style={{ background: 'linear-gradient(135deg, #9044EB, #C12B4D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Y</span>
        </span>
      </Link>
    </div>
  );
}

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: '#05070F', minHeight: '100vh' }}>
      {/* Desktop: announcement banner + navbar */}
      <AnnouncementBanner />
      <Navbar />
      {/* Mobile: slim top bar with logo */}
      <MobileTopBar />
      {/* pt-12 on mobile (top bar height), pt-[88px] on desktop (banner + navbar) */}
      <main className="pt-12 pb-20 md:pt-[88px] md:pb-0">{children}</main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <MobileBottomNav />
    </div>
  );
}
