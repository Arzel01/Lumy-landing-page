import { Package, Shield, Cable, BookOpen, type LucideIcon } from 'lucide-react';
import unboxingImg from '../assets/Unboxing.jpeg';
import { useInView } from '../hooks/useInView';

type BoxItem = {
  Icon: LucideIcon;
  name: string;
  description: string;
};

const BOX_ITEMS: BoxItem[] = [
  {
    Icon: Package,
    name: 'Dispositivo LUMY',
    description: 'El cubo holográfico de 6×6×3 cm listo para proyectar desde el primer encendido.',
  },
  {
    Icon: Shield,
    name: 'Estuche Protector',
    description: 'Funda EVA de alta densidad con cierre magnético y interior de microfibra negra.',
  },
  {
    Icon: Cable,
    name: 'Cable USB-C Trenzado',
    description: 'Cable nylon de 1.2 m. Compatible con carga rápida 30W. Resistente a dobleces.',
  },
  {
    Icon: BookOpen,
    name: 'Guía Rápida de Inicio',
    description:
      'Manual multilingüe (ES / EN / PT / FR) con código QR para tutoriales en video.',
  },
];

export default function Unboxing() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      className="py-12 lg:py-16"
      style={{ background: 'rgba(255,255,255,0.008)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div
              className="inline-block text-xs font-mono tracking-widest text-slate-500 mb-5 uppercase"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Contenido del Empaque
            </div>
            <h2
              className="font-bold text-3xl lg:text-5xl text-white leading-tight mb-5"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Unboxing{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                exclusivo
              </span>
            </h2>
            <p
              className="text-slate-400 text-base lg:text-lg mb-10 leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Caja de cartón rígido laminado negro mate — 22×12×5 cm. Diseñada para
              que el primer contacto con LUMY sea una experiencia memorable.
            </p>

            <div className="flex flex-col gap-4">
              {BOX_ITEMS.map(({ Icon, name, description }, i) => (
                <div
                  key={name}
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-500 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transitionDelay: `${i * 80 + 200}ms`,
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{
                      background: 'rgba(144,68,235,0.1)',
                      border: '1px solid rgba(144,68,235,0.15)',
                    }}
                  >
                    <Icon size={15} style={{ color: '#9044EB' }} />
                  </div>
                  <div>
                    <div
                      className="font-semibold text-white text-sm mb-0.5"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {name}
                    </div>
                    <div
                      className="text-slate-500 text-xs leading-relaxed"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: unboxing image */}
          <div
            className={`transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              <div
                className="absolute -inset-8 blur-3xl opacity-10 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                }}
              />
              <img
                src={unboxingImg}
                alt="Unboxing LUMY"
                className="w-full rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
