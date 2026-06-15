import { useInView } from '../hooks/useInView';
import feature1 from '../assets/Feature.jpeg';
import feature2 from '../assets/Feature2.png';
import feature3 from '../assets/Feature3.png';

type Feature = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  tag: string;
  imageSrc: string;
  imageLabel: string;
  accent: string;
  accentRgb: string;
};

const FEATURES: Feature[] = [
  {
    id: 1,
    eyebrow: '01 - Visualización',
    title: 'Navegación Holográfica 3D',
    description:
      'Proyecta destinos turísticos, mapas interactivos y menús tridimensionales directamente sobre cualquier superficie plana. Explora el mundo antes de pisarlo.',
    tag: 'Proyección Láser',
    imageSrc: feature1,
    imageLabel: 'Proyección de Mapa 3D holográfico',
    accent: '#2474D5',
    accentRgb: '36,116,213',
  },
  {
    id: 2,
    eyebrow: '02 - Conectividad',
    title: 'Conectividad Satelital Independiente',
    description:
      'Combina IA, sensores espaciales y conectividad satelital para proyectar entornos incluso donde la señal móvil no existe. Cero fricción de red, en cualquier rincón del planeta.',
    tag: 'Sin Red Móvil',
    imageSrc: feature2,
    imageLabel: 'Conectividad satelital LUMY',
    accent: '#9044EB',
    accentRgb: '144,68,235',
  },
  {
    id: 3,
    eyebrow: '03 - Inteligencia',
    title: 'Asistente Inteligente Avanzado',
    description:
      'Comandos de voz naturales en cualquier idioma. Recomendaciones y sugerencias personalizadas por ubicación en tiempo real. Tu guía de viaje definitiva.',
    tag: 'IA On-Device',
    imageSrc: feature3,
    imageLabel: 'Asistente IA holográfico LUMY',
    accent: '#C12B4D',
    accentRgb: '193,43,77',
  },
];

function FeatureBlock({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const { ref, inView } = useInView(0.12);
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Text block */}
      <div className={isReversed ? 'lg:order-2' : ''}>
        <div
          className="text-xs font-mono tracking-widest mb-4 uppercase"
          style={{ color: feature.accent, fontFamily: 'DM Sans, sans-serif' }}
        >
          {feature.eyebrow}
        </div>
        <h3
          className="font-bold text-3xl lg:text-4xl text-white leading-tight mb-5"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          {feature.title}
        </h3>
        <p
          className="text-slate-400 text-base lg:text-lg leading-relaxed mb-7"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {feature.description}
        </p>
        <span
          className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-full"
          style={{
            background: `rgba(${feature.accentRgb},0.1)`,
            border: `1px solid rgba(${feature.accentRgb},0.25)`,
            color: feature.accent,
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: feature.accent }}
          />
          {feature.tag}
        </span>
      </div>

      {/* Image block */}
      <div className={isReversed ? 'lg:order-1' : ''}>
        <div className="relative">
          <div
            className="absolute -inset-6 rounded-3xl blur-2xl opacity-10"
            style={{
              background: `radial-gradient(circle, ${feature.accent}, transparent)`,
            }}
          />
          <img
            src={feature.imageSrc}
            alt={feature.imageLabel}
            className="w-full h-72 lg:h-96 object-cover rounded-2xl"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);

  return (
    <section id="caracteristicas" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 lg:mb-32 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="inline-block text-xs font-mono tracking-widest text-slate-500 mb-5 uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Características Clave
          </div>
          <h2
            className="font-bold text-3xl lg:text-5xl text-white leading-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Tecnología que{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              redefine
            </span>{' '}
            el viaje
          </h2>
        </div>

        {/* Blocks */}
        <div className="flex flex-col gap-28 lg:gap-40">
          {FEATURES.map((feature, i) => (
            <FeatureBlock key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
