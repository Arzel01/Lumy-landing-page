import { Home, Bell, Map, Crosshair, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TABS = [
  { label: 'Inicio',    Icon: Home,      to: '/',               exact: true,  authRequired: false, deviceRequired: false },
  { label: 'Notif.',   Icon: Bell,      to: '/notificaciones', exact: false, authRequired: true,  deviceRequired: true  },
  { label: 'Mapa',     Icon: Map,       to: '/mapa',           exact: false, authRequired: false, deviceRequired: false },
  { label: 'Rastrear', Icon: Crosshair, to: '/rastrear',       exact: false, authRequired: true,  deviceRequired: true  },
  { label: 'Cuenta',   Icon: User,      to: '/cuenta',         exact: false, authRequired: true,  deviceRequired: false },
];

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  const hasDevices = (user?.devices?.length ?? 0) > 0;

  const isActive = (to: string, exact: boolean) => {
    if (to === '/cuenta') return pathname === '/cuenta' || pathname === '/auth';
    if (exact) return pathname === to;
    return pathname.startsWith(to);
  };

  const handleTab = (to: string, authRequired: boolean, deviceRequired: boolean) => {
    if (authRequired && !user) { navigate('/auth'); return; }
    if (deviceRequired && !hasDevices) { navigate('/cuenta'); return; }
    navigate(to);
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
        {TABS.map(({ label, Icon, to, exact, authRequired, deviceRequired }) => {
          const active = isActive(to, exact);
          return (
            <button
              key={to}
              type="button"
              onClick={() => handleTab(to, authRequired, deviceRequired)}
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
              <Icon
                size={22}
                style={{
                  color: active ? '#9044EB' : '#3d4a5c',
                  filter: active ? 'drop-shadow(0 0 5px rgba(144,68,235,0.55))' : 'none',
                  transition: 'color 0.2s, filter 0.2s',
                }}
              />
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
