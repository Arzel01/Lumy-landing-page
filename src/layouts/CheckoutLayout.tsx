import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { CheckoutProvider } from '../context/CheckoutContext';

type Step = { number: number; path: string; label: string };

const STEPS: Step[] = [
  { number: 1, path: '/checkout/carrito', label: 'Carrito' },
  { number: 2, path: '/checkout/envio', label: 'Envío' },
  { number: 3, path: '/checkout/pago', label: 'Pago' },
  { number: 4, path: '/checkout/confirmacion', label: 'Confirmación' },
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

const BACK_ROUTES: Record<string, string> = {
  '/checkout/carrito': '/tienda',
  '/checkout/envio': '/checkout/carrito',
  '/checkout/pago': '/checkout/envio',
};

export default function CheckoutLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentStep =
    STEPS.find((s) => s.path === pathname)?.number ?? 1;
  const isConfirmation = pathname === '/checkout/confirmacion';
  const backRoute = BACK_ROUTES[pathname];

  return (
    <CheckoutProvider>
      <div style={{ background: '#05070F', minHeight: '100vh' }}>
        {/* Minimal header */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: 'rgba(5,7,15,0.97)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {backRoute && (
                <button
                  type="button"
                  onClick={() => navigate(backRoute)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors focus:outline-none"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem' }}
                >
                  <ArrowLeft size={15} />
                  Volver
                </button>
              )}
              <Link to="/" className="focus:outline-none">
                <LumyLogo />
              </Link>
            </div>
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: '#4ade80', fontFamily: 'DM Sans, sans-serif' }}
            >
              <ShieldCheck size={13} />
              Checkout seguro
            </div>
          </div>
        </header>

        {/* Step indicator */}
        {!isConfirmation && (
          <div
            className="py-5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div className="max-w-5xl mx-auto px-6">
              {/* Bubbles + connectors */}
              <div className="flex items-start justify-center mb-4">
                {STEPS.map((step, i) => {
                  const isActive = step.number === currentStep;
                  const isDone = step.number < currentStep;
                  return (
                    <div key={step.path} className="flex items-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                          style={{
                            background: isActive
                              ? 'linear-gradient(135deg, #2474D5, #9044EB)'
                              : isDone
                              ? 'rgba(144,68,235,0.2)'
                              : 'rgba(255,255,255,0.04)',
                            color: isActive ? '#fff' : isDone ? '#a78bfa' : '#334155',
                            border: isDone
                              ? '1px solid rgba(144,68,235,0.35)'
                              : isActive
                              ? 'none'
                              : '1px solid rgba(255,255,255,0.06)',
                            boxShadow: isActive ? '0 0 16px rgba(144,68,235,0.45)' : 'none',
                            fontFamily: 'Sora, sans-serif',
                          }}
                        >
                          {isDone ? '✓' : step.number}
                        </div>
                        <span
                          className="text-xs hidden sm:block"
                          style={{
                            color: isActive ? '#e2e8f0' : isDone ? '#64748b' : '#1e293b',
                            fontFamily: 'DM Sans, sans-serif',
                          }}
                        >
                          {step.label}
                        </span>
                      </div>

                      {i < STEPS.length - 1 && (
                        <div
                          className="w-12 sm:w-20 md:w-28 mx-3 mb-4 relative"
                          style={{ height: '2px' }}
                        >
                          {/* Track */}
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.05)' }}
                          />
                          {/* Fill */}
                          <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              width: isDone ? '100%' : isActive ? '50%' : '0%',
                              background: 'linear-gradient(90deg, #2474D5, #9044EB)',
                              transition: 'width 0.5s ease',
                              boxShadow: isDone ? '0 0 6px rgba(144,68,235,0.5)' : 'none',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Full-width progress bar */}
              <div
                className="h-0.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                    background: 'linear-gradient(90deg, #2474D5, #9044EB, #C12B4D)',
                    boxShadow: '0 0 8px rgba(144,68,235,0.6)',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10">
          <Outlet />
        </div>
      </div>
    </CheckoutProvider>
  );
}
