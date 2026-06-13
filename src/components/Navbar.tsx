import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

type NavLink = { label: string; to: string };

const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Características', to: '/caracteristicas' },
  { label: 'Hardware', to: '/hardware' },
  { label: 'Soporte', to: '/soporte' },
];

function LumyLogo() {
  return (
    <span
      style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.18em',
        fontSize: '1.25rem',
        color: '#fff',
      }}
    >
      L
      <span
        style={{
          background: 'linear-gradient(135deg, #2474D5, #9044EB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        U
      </span>
      M
      <span
        style={{
          background: 'linear-gradient(135deg, #9044EB, #C12B4D)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Y
      </span>
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { itemCount } = useCart();

  const isActive = (to: string) => pathname === to.split('#')[0];

  const handleNavClick = (to: string) => {
    const [path, hash] = to.split('#');
    setMobileOpen(false);
    navigate(path);
    if (hash) {
      // scroll after navigation settles
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
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
        <Link to="/" className="focus:outline-none">
          <LumyLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.to)}
              className="text-sm transition-colors duration-200 bg-transparent border-none cursor-pointer"
              style={{
                color: isActive(link.to) ? '#ffffff' : '#94a3b8',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.to))
                  (e.currentTarget as HTMLButtonElement).style.color = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.to))
                  (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart icon */}
          <button
            type="button"
            onClick={() => navigate('/checkout/carrito')}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white transition-colors focus:outline-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <ShoppingBag size={15} />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: '#9044EB', fontFamily: 'Sora, sans-serif' }}
              >
                {itemCount}
              </span>
            )}
          </button>

          {/* CTA */}
          <button
            type="button"
            onClick={() => navigate('/tienda')}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            style={{
              background: 'rgba(144,68,235,0.1)',
              border: '1px solid rgba(144,68,235,0.38)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
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
              onClick={() => handleNavClick(link.to)}
              className="block w-full text-left py-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 mt-5">
            <button
              type="button"
              onClick={() => { navigate('/checkout/carrito'); setMobileOpen(false); }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-slate-300 transition-colors focus:outline-none"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <ShoppingBag size={14} />
              {itemCount > 0 && (
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: '#9044EB' }}
                >
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => { navigate('/tienda'); setMobileOpen(false); }}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white focus:outline-none"
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
