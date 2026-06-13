import AnnouncementBanner from './components/AnnouncementBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HardwareAnatomy from './components/HardwareAnatomy';
import Ecommerce from './components/Ecommerce';
import Unboxing from './components/Unboxing';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ background: '#05070F', minHeight: '100vh' }}>
      {/* Fixed top bars: banner (40px) + navbar (64px) = 104px total */}
      <AnnouncementBanner />
      <Navbar />

      <main style={{ paddingTop: '104px' }}>
        <Hero />
        <Features />
        <HardwareAnatomy />
        <Ecommerce />
        <Unboxing />
        <Reviews />
      </main>

      <Footer />
    </div>
  );
}
