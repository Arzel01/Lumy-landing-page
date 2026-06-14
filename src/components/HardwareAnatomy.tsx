import { useState } from 'react';
import hardwareImg from '../assets/Hardware.png';
import { useInView } from '../hooks/useInView';

type ComponentId =
  | 'sensor'
  | 'lente'
  | 'anillo'
  | 'cuerpo'
  | 'argolla'
  | 'usbc'
  | 'altavoz'
  | 'boton';

type HardwareComponent = {
  id: ComponentId;
  name: string;
  description: string;
  symbol: string;
};

const COMPONENTS: HardwareComponent[] = [
  {
    id: 'sensor',
    name: 'Sensor Espacial',
    description:
      'Analiza y mapea superficies en tiempo real para una proyección perfectamente calibrada en cualquier ángulo de inclinación.',
    symbol: '◎',
  },
  {
    id: 'lente',
    name: 'Lente de Proyección Inteligente',
    description:
      'Óptica de alta precisión que genera imágenes holográficas nítidas incluso en entornos con luz ambiente intensa.',
    symbol: '⬡',
  },
  {
    id: 'anillo',
    name: 'Anillo LED de Estado',
    description:
      'Sistema de indicadores visuales que comunica el estado del dispositivo: conectividad satelital, nivel de batería y modo activo.',
    symbol: '○',
  },
  {
    id: 'cuerpo',
    name: 'Cuerpo de Policarbonato',
    description:
      'Chasis compacto de 6×6×3 cm en policarbonato de alta resistencia a impactos. Peso total: 180g.',
    symbol: '▢',
  },
  {
    id: 'argolla',
    name: 'Argolla de Transporte',
    description:
      'Sistema de fijación integrado compatible con mosquetones y correas de mochila. Siempre listo para la aventura.',
    symbol: '◇',
  },
  {
    id: 'usbc',
    name: 'Puerto USB-C',
    description:
      'Carga rápida 30W. De 0% a 100% en menos de 90 minutos. Compatible con cualquier cargador USB-C estándar.',
    symbol: '⌗',
  },
  {
    id: 'altavoz',
    name: 'Altavoz Integrado',
    description:
      'Salida de audio de alta fidelidad para respuestas del asistente, navegación por voz y alertas sonoras en tiempo real.',
    symbol: '◈',
  },
  {
    id: 'boton',
    name: 'Botón Multifunción',
    description:
      'Control único inteligente: encendido, activación del asistente de voz y cambio entre modos con un solo toque.',
    symbol: '●',
  },
];

export default function HardwareAnatomy() {
  const [activeId, setActiveId] = useState<ComponentId>('sensor');
  const { ref, inView } = useInView(0.1);

  const active = COMPONENTS.find((c) => c.id === activeId)!;

  return (
    <section
      id="hardware"
      className="py-12 lg:py-16"
      style={{
        background:
          'linear-gradient(180deg, #05070F 0%, rgba(36,116,213,0.025) 50%, #05070F 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 lg:mb-24 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="inline-block text-xs font-mono tracking-widest text-slate-500 mb-5 uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Anatomía del Hardware
          </div>
          <h2
            className="font-bold text-3xl lg:text-5xl text-white"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Ingeniería de{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #9044EB, #C12B4D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              precisión
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
          {/* Left: device image + active callout */}
          <div className="lg:sticky lg:top-32">
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-3xl blur-3xl opacity-12"
                style={{
                  background: 'radial-gradient(circle, #9044EB 0%, #2474D5 60%, transparent 80%)',
                }}
              />
              <img
                src={hardwareImg}
                alt="Hardware LUMY"
                className="w-full object-cover rounded-2xl"
                style={{ display: 'block' }}
              />
            </div>

            {/* Active component callout */}
            <div
              className="mt-5 p-4 rounded-2xl flex items-start gap-4 transition-all duration-300"
              style={{
                background: 'rgba(144,68,235,0.07)',
                border: '1px solid rgba(144,68,235,0.18)',
              }}
            >
              <span
                className="text-2xl leading-none mt-0.5 flex-shrink-0"
                style={{ color: '#9044EB' }}
              >
                {active.symbol}
              </span>
              <div>
                <div
                  className="text-white font-semibold text-sm mb-1"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  {active.name}
                </div>
                <div
                  className="text-slate-400 text-xs leading-relaxed"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {active.description}
                </div>
              </div>
            </div>
          </div>

          {/* Right: component list */}
          <div className="flex flex-col gap-1">
            {COMPONENTS.map((component) => {
              const isActive = component.id === activeId;
              return (
                <button
                  key={component.id}
                  type="button"
                  onClick={() => setActiveId(component.id)}
                  className="group w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? 'rgba(144,68,235,0.07)' : 'transparent',
                    border: isActive
                      ? '1px solid rgba(144,68,235,0.22)'
                      : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'rgba(255,255,255,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'transparent';
                  }}
                >
                  <span
                    className="text-lg w-7 flex-shrink-0 transition-colors duration-200"
                    style={{ color: isActive ? '#9044EB' : '#475569' }}
                  >
                    {component.symbol}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-semibold text-sm transition-colors duration-200"
                      style={{
                        color: isActive ? '#ffffff' : '#94a3b8',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {component.name}
                    </div>
                  </div>
                  {isActive && (
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#9044EB' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
