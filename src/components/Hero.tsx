import { ChevronRight, Play } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';

type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: '360°', label: 'Proyección holográfica' },
  { value: '48h', label: 'Batería continua' },
  { value: '180g', label: '6×6×3 cm' },
];

export default function Hero() {
  const handleOrder = () => {
    document.querySelector('#comprar')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVideo = () => {
    console.log('Ver Video clicked');
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-8 pb-24 overflow-hidden"
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
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
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
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              type="button"
              onClick={handleOrder}
              className="group flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95"
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

            <button
              type="button"
              onClick={handleVideo}
              className="group flex items-center gap-3 px-7 py-4 rounded-full font-medium text-sm text-slate-200 transition-all duration-300 hover:text-white hover:bg-white/[0.04]"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <span
                className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                <Play size={11} fill="white" className="translate-x-px" />
              </span>
              Ver Video
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-8 pt-8"
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

        {/* Right: product image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg">
            {/* Glow aura */}
            <div
              className="absolute -inset-8 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(144,68,235,0.18) 0%, rgba(36,116,213,0.1) 50%, transparent 70%)' }}
            />
            <div className="relative animate-float">
              <ImagePlaceholder
                label="Foto Principal — Dispositivo LUMY encendido proyectando holograma de mapa tridimensional"
                width="w-full"
                height="h-72 md:h-[460px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
