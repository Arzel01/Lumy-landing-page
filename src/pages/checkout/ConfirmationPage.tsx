import { Link } from 'react-router-dom';
import { Package, Truck, Mail, ArrowRight } from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';

export default function ConfirmationPage() {
  const { orderNumber, shipping } = useCheckout();

  const displayOrder = orderNumber || 'LMY-000000';

  return (
    <div className="max-w-xl mx-auto py-12 text-center">
      {/* Success animation */}
      <div className="relative mx-auto w-24 h-24 mb-8">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse"
          style={{ background: 'radial-gradient(circle, #9044EB, #2474D5)' }}
        />
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2474D5, #9044EB)',
            boxShadow: '0 0 40px rgba(144,68,235,0.4)',
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <div
        className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest mb-5"
        style={{
          background: 'rgba(144,68,235,0.1)',
          border: '1px solid rgba(144,68,235,0.2)',
          color: '#a78bfa',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        Pedido confirmado
      </div>

      <h1
        className="font-bold text-3xl lg:text-4xl text-white mb-4 leading-tight"
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        ¡Gracias por tu pedido!
      </h1>
      <p
        className="text-slate-400 text-base mb-8 leading-relaxed"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        Tu LUMY está en camino.{' '}
        {shipping.email ? (
          <>
            Enviamos la confirmación a{' '}
            <span className="text-slate-200 font-medium">{shipping.email}</span>.
          </>
        ) : (
          'Recibirás un correo de confirmación en breve.'
        )}
      </p>

      {/* Order number card */}
      <div
        className="p-5 rounded-2xl mb-8"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="text-slate-500 text-xs mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Número de pedido
        </div>
        <div
          className="font-bold text-2xl text-white mb-0.5"
          style={{ fontFamily: 'Sora, sans-serif', letterSpacing: '0.05em' }}
        >
          {displayOrder}
        </div>
        <div
          className="text-slate-600 text-xs"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Guarda este número para cualquier consulta de soporte
        </div>
      </div>

      {/* Timeline */}
      <div
        className="p-5 rounded-2xl mb-10 text-left"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <h3
          className="font-semibold text-white text-sm mb-5"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          ¿Qué pasa ahora?
        </h3>
        <div className="flex flex-col gap-4">
          {[
            {
              Icon: Mail,
              title: 'Confirmación por correo',
              desc: 'Recibirás todos los detalles de tu pedido en minutos.',
              color: '#2474D5',
              done: true,
            },
            {
              Icon: Package,
              title: 'Preparación y empaque',
              desc: 'Tu LUMY se empaca en su caja negra mate en 24-48 h.',
              color: '#9044EB',
              done: false,
            },
            {
              Icon: Truck,
              title: 'Envío express',
              desc: 'Entrega en 3-7 días hábiles a tu dirección.',
              color: '#C12B4D',
              done: false,
            },
          ].map(({ Icon, title, desc, color, done }, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `rgba(${color === '#2474D5' ? '36,116,213' : color === '#9044EB' ? '144,68,235' : '193,43,77'},0.12)`,
                  border: `1px solid rgba(${color === '#2474D5' ? '36,116,213' : color === '#9044EB' ? '144,68,235' : '193,43,77'},0.2)`,
                  opacity: done ? 1 : 0.5,
                }}
              >
                <Icon size={15} style={{ color }} />
              </div>
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: done ? '#e2e8f0' : '#475569', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {title}
                </div>
                <div
                  className="text-xs leading-relaxed mt-0.5"
                  style={{ color: done ? '#64748b' : '#334155', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #2474D5, #9044EB)',
            boxShadow: '0 4px 20px rgba(144,68,235,0.25)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Volver al inicio
          <ArrowRight size={14} />
        </Link>
        <Link
          to="/soporte"
          className="flex items-center justify-center px-6 py-3 rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Centro de soporte
        </Link>
      </div>
    </div>
  );
}
