import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Globe, ChevronDown, ShieldCheck, Truck, RefreshCw, Clock } from 'lucide-react';
import PageLayout from '../layouts/PageLayout';

type FaqItem = { q: string; a: string };

const FAQ: FaqItem[] = [
  {
    q: '¿Cuánto tarda en llegar mi pedido?',
    a: 'Los envíos express llegan en 3-7 días hábiles a cualquier parte del mundo. Recibirás un número de seguimiento por correo electrónico al momento de despachar tu pedido.',
  },
  {
    q: '¿LUMY funciona sin conexión a internet?',
    a: 'Sí. LUMY combina IA on-device con conectividad satelital independiente. Funciona perfectamente en zonas sin cobertura móvil, como montañas, zonas rurales o vuelos.',
  },
  {
    q: '¿Cuánto dura la batería?',
    a: 'Hasta 48 horas en uso continuo moderado. La carga rápida de 30W lleva la batería de 0 a 100% en menos de 90 minutos mediante cualquier cargador USB-C estándar.',
  },
  {
    q: '¿Tiene suscripciones o costos adicionales?',
    a: 'No. LUMY es un pago único sin suscripciones mensuales, sin anuncios y sin costos ocultos. Incluye actualizaciones de software de por vida.',
  },
  {
    q: '¿Qué cubre la garantía?',
    a: 'La garantía cubre defectos de fabricación y fallas de hardware durante 12 meses desde la fecha de compra. Respuesta de soporte garantizada en menos de 24 horas hábiles.',
  },
  {
    q: '¿Puedo devolver el producto?',
    a: 'Sí, tienes 30 días desde la recepción para devolver el producto sin costo si no estás satisfecho. El producto debe estar en su estado original con todo su empaque.',
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-2">
      {FAQ.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden transition-all duration-200"
          style={{
            background: open === i ? 'rgba(144,68,235,0.06)' : 'rgba(255,255,255,0.02)',
            border: open === i ? '1px solid rgba(144,68,235,0.18)' : '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <button
            type="button"
            className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span
              className="font-medium text-sm"
              style={{ color: open === i ? '#e2e8f0' : '#94a3b8', fontFamily: 'DM Sans, sans-serif' }}
            >
              {item.q}
            </span>
            <ChevronDown
              size={16}
              className="flex-shrink-0 ml-4 transition-transform duration-200"
              style={{
                color: open === i ? '#9044EB' : '#475569',
                transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-5">
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#64748b', fontFamily: 'DM Sans, sans-serif' }}
              >
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const GUARANTEES = [
  { Icon: ShieldCheck, title: 'Garantía 12 meses', desc: 'Cubre defectos de fabricación y hardware.' },
  { Icon: RefreshCw, title: 'Devoluciones 30 días', desc: 'Sin preguntas, sin complicaciones.' },
  { Icon: Truck, title: 'Envío gratuito', desc: 'Express a todo el mundo incluido.' },
  { Icon: Clock, title: 'Soporte en 24h', desc: 'Respuesta garantizada en horas hábiles.' },
];

export default function SoportePage() {
  return (
    <PageLayout>
      <section id="soporte-hero" className="py-10 lg:py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #9044EB, transparent)' }}
          />
        </div>
        <div className="relative max-w-2xl mx-auto px-6">
          <div
            className="inline-block text-xs font-mono tracking-widest text-slate-500 mb-5 uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Centro de Soporte
          </div>
          <h1
            className="font-bold text-4xl lg:text-6xl text-white mb-5 leading-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            ¿En qué podemos{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ayudarte?
            </span>
          </h1>
          <p
            className="text-slate-400 text-lg"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Respuesta garantizada en menos de 24 horas hábiles.
          </p>
        </div>
      </section>

      {/* Guarantees */}
      <section className="pb-10 lg:pb-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {GUARANTEES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="p-5 rounded-2xl flex flex-col gap-3"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(144,68,235,0.1)', border: '1px solid rgba(144,68,235,0.15)' }}
                >
                  <Icon size={16} style={{ color: '#9044EB' }} />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {title}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* FAQ */}
            <div>
              <h2
                className="font-bold text-2xl text-white mb-7"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Preguntas frecuentes
              </h2>
              <FaqAccordion />
            </div>

            {/* Contact */}
            <div>
              <h2
                className="font-bold text-2xl text-white mb-7"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Contáctanos directamente
              </h2>
              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); console.log('WhatsApp'); }}
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}
                  >
                    <MessageCircle size={18} style={{ color: '#4ade80' }} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Soporte por WhatsApp
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Respuesta en menos de 24 horas hábiles
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); console.log('Sitio Web'); }}
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(36,116,213,0.1)', border: '1px solid rgba(36,116,213,0.15)' }}
                  >
                    <Globe size={18} style={{ color: '#2474D5' }} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Portal de Soporte Web
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Artículos, guías y tutoriales en video
                    </div>
                  </div>
                </a>
              </div>

              <div
                className="mt-8 p-5 rounded-2xl"
                style={{
                  background: 'rgba(144,68,235,0.06)',
                  border: '1px solid rgba(144,68,235,0.15)',
                }}
              >
                <p
                  className="text-slate-300 text-sm leading-relaxed mb-4"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  ¿Listo para experimentar LUMY?
                </p>
                <Link
                  to="/tienda"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Comprar LUMY
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
