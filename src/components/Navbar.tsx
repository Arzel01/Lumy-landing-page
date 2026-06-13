import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Características', href: '#caracteristicas' },
  { label: 'Hardware', href: '#hardware' },
  { label: 'Soporte', href: '#soporte' },
];

function LumyLogo() {
  return (
    <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, letterSpacing: '0.18em', fontSize: '1.25rem', color: '#fff' }}>
      L
      <span style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        U
      </span>
      M
      <span style={{ background: 'linear-gradient(135deg, #9044EB, #C12B4D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        Y
      </span>
    </span>
  );
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleNavClick = (href: string) => {
    scrollTo(href);
    setMobileOpen(false);
  };

  return (
    <header
      className="fixed left-0 right-0 z-40"
      style={{
        top: '40px',
        background: 'rgba(5,7,15,0.82)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('#inicio')}
          className="cursor-pointer bg-transparent border-none p-0 focus:outline-none"
        >
          <LumyLogo />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <button
            type="button"
            onClick={() => handleNavClick('#comprar')}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(144,68,235,0.08)',
              border: '1px solid rgba(144,68,235,0.38)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <ShoppingBag size={13} />
            Comprar Ahora
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-slate-400 hover:text-white transition-colors focus:outline-none"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2"
          style={{
            background: 'rgba(5,7,15,0.98)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left py-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNavClick('#comprar')}
            className="mt-5 w-full py-3 rounded-xl text-sm font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, #2474D5, #9044EB)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Comprar Ahora
          </button>
        </div>
      )}
    </header>
  );
}
