import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import lumyImg from '../assets/Lumy.jpeg';

type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: '360°', label: 'Proyección holográfica' },
  { value: '48h', label: 'Batería continua' },
  { value: '180g', label: '6×6×3 cm' },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-4 pb-12 md:pb-12 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(144,68,235,0.12) 0%, transparent 65%)' }}
        />
        <div
          className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(36,116,213,0.1) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(193,43,77,0.05) 0%, transparent 70%)' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: copy */}
        <div className="order-2 lg:order-1">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full text-xs font-medium tracking-wide"
            style={{
              background: 'rgba(144,68,235,0.08)',
              border: '1px solid rgba(144,68,235,0.22)',
              color: '#c084fc',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#9044EB' }}
            />
            Innovación Destacada Travel Tech 2025
          </div>

          {/* Headline */}
          <h1
            className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-[68px] leading-[1.04] tracking-tight text-white mb-6"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            El mundo no se busca,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2474D5 0%, #9044EB 55%, #C12B4D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              se proyecta
            </span>{' '}
            con LUMY
          </h1>

          {/* Subtitle */}
          <p
            className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            El primer navegador holográfico portátil impulsado por{' '}
            <span className="text-slate-200 font-medium">Inteligencia Artificial.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-10 md:mb-12">
            <button
              type="button"
              onClick={() => navigate('/tienda')}
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95 w-full md:w-auto"
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                boxShadow: '0 4px 28px rgba(144,68,235,0.38)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Ordenar Lumy
              <ChevronRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 md:flex md:flex-wrap gap-4 md:gap-8 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-bold text-2xl text-white mb-0.5"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs text-slate-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: product image, click to go to shop */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg">
            {/* Glow aura */}
            <div
              className="absolute -inset-8 rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(144,68,235,0.18) 0%, rgba(36,116,213,0.1) 50%, transparent 70%)',
              }}
            />
            <div
              className="relative animate-float cursor-pointer group"
              onClick={() => navigate('/tienda')}
              title="Ver producto y comprar"
            >
              <img
                src={lumyImg}
                alt="Dispositivo LUMY"
                className="w-full h-60 md:h-[460px] object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(144,68,235,0.12)' }}
              >
                <span
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <ChevronRight size={14} />
                  Comprar LUMY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
