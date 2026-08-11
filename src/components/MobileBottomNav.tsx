import { Home, Bell, Map, Crosshair, User, PlusCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TABS_WITH_DEVICE = [
  { label: 'Inicio',    Icon: Home,      to: '/',               exact: true  },
  { label: 'Notif.',   Icon: Bell,      to: '/notificaciones', exact: false },
  { label: 'Mapa',     Icon: Map,       to: '/mapa',           exact: false },
  { label: 'Rastrear', Icon: Crosshair, to: '/rastrear',       exact: false },
  { label: 'Cuenta',   Icon: User,      to: '/cuenta',         exact: false },
];

const TABS_NO_DEVICE = [
  { label: 'Inicio',    Icon: Home,       to: '/',       exact: true  },
  { label: 'Agregar Lumy', Icon: PlusCircle, to: '/cuenta', exact: false, addPrompt: true },
  { label: 'Cuenta',   Icon: User,       to: '/cuenta', exact: false },
];

const TABS_NO_SESSION = [
  { label: 'Inicio', Icon: Home, to: '/',      exact: true  },
  { label: 'Cuenta', Icon: User, to: '/auth',  exact: false },
];

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  const hasDevices = (user?.devices?.length ?? 0) > 0;

  const TABS = !user
    ? TABS_NO_SESSION
    : hasDevices
      ? TABS_WITH_DEVICE
      : TABS_NO_DEVICE;

  const isActive = (to: string, exact: boolean, addPrompt?: boolean) => {
    if (addPrompt) return false;
    if (to === '/cuenta') return pathname === '/cuenta' || pathname === '/auth';
    if (to === '/auth') return pathname === '/auth' || pathname === '/cuenta';
    if (exact) return pathname === to;
    return pathname.startsWith(to);
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
        {TABS.map(({ label, Icon, to, exact, ...rest }) => {
          const addPrompt = (rest as { addPrompt?: boolean }).addPrompt;
          const active = isActive(to, exact, addPrompt);

          return (
            <button
              key={label}
              type="button"
              onClick={() => navigate(to)}
              className="flex-1 flex flex-col items-center justify-center gap-1 relative focus:outline-none active:scale-90 transition-transform duration-100"
              style={{ border: 'none', background: 'transparent' }}
            >
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

              {addPrompt ? (
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                    boxShadow: '0 0 14px rgba(144,68,235,0.55)',
                  }}
                >
                  <Icon size={18} style={{ color: '#fff' }} />
                </span>
              ) : (
                <Icon
                  size={22}
                  style={{
                    color: active ? '#9044EB' : '#3d4a5c',
                    filter: active ? 'drop-shadow(0 0 5px rgba(144,68,235,0.55))' : 'none',
                    transition: 'color 0.2s, filter 0.2s',
                  }}
                />
              )}

              <span
                className="text-[9px] leading-tight text-center"
                style={{
                  color: addPrompt ? '#9044EB' : active ? '#9044EB' : '#2f3d50',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: addPrompt || active ? '600' : '400',
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
