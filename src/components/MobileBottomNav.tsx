import { Home, Sparkles, ShoppingBag, Cpu, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const TABS = [
  { label: 'Inicio', Icon: Home, to: '/', exact: true, showCart: false },
  { label: 'Specs', Icon: Sparkles, to: '/caracteristicas', exact: false, showCart: false },
  { label: 'Tienda', Icon: ShoppingBag, to: '/tienda', exact: false, showCart: true },
  { label: 'Hardware', Icon: Cpu, to: '/hardware', exact: false, showCart: false },
  { label: 'Cuenta', Icon: User, to: '/cuenta', exact: false, showCart: false },
];

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { itemCount } = useCart();
  const { user } = useAuth();

  const isActive = (to: string, exact: boolean) => {
    if (to === '/cuenta') return pathname === '/cuenta' || pathname === '/auth';
    if (exact) return pathname === to;
    return pathname.startsWith(to);
  };

  const handleTab = (to: string) => {
    if (to === '/cuenta' && !user) navigate('/auth');
    else navigate(to);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: '#05070F',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex h-16">
        {TABS.map(({ label, Icon, to, exact, showCart }) => {
          const active = isActive(to, exact);
          return (
            <button
              key={to}
              type="button"
              onClick={() => handleTab(to)}
              className="flex-1 flex flex-col items-center justify-center gap-1 relative focus:outline-none active:scale-90 transition-transform duration-100"
              style={{ border: 'none', background: 'transparent' }}
            >
              {/* Active top line */}
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 rounded-b-full"
                  style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, #2474D5, #9044EB)',
                    boxShadow: '0 0 8px rgba(144,68,235,0.7)',
                  }}
                />
              )}

              {/* Icon */}
              <div className="relative">
                <Icon
                  size={22}
                  style={{
                    color: active ? '#9044EB' : '#3d4a5c',
                    filter: active ? 'drop-shadow(0 0 5px rgba(144,68,235,0.55))' : 'none',
                    transition: 'color 0.2s, filter 0.2s',
                  }}
                />
                {showCart && itemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 px-0.5 rounded-full flex items-center justify-center text-[7px] font-bold text-white"
                    style={{ background: '#C12B4D', fontFamily: 'Sora, sans-serif' }}
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className="text-[9px]"
                style={{
                  color: active ? '#9044EB' : '#2f3d50',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: active ? '600' : '400',
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
