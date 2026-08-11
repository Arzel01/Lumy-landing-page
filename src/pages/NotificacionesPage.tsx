import { useNavigate } from 'react-router-dom';
import { Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../layouts/PageLayout';

type Card = {
  id: number;
  destination: string;
  type: string;
  description: string;
  gradient: string;
  icon: string;
};

const PARA_TI: Card[] = [
  { id: 1, destination: 'Malecón 2000', type: 'Paseo fluvial', description: '2.5 km a orillas del río Guayas. Jardines, museos, cine IMAX y el Mercado del Malecón.', gradient: 'linear-gradient(135deg, #2474D5, #1e5faf)', icon: '🌊' },
  { id: 2, destination: 'Cerro Santa Ana', type: 'Mirador', description: '444 escalones con vista panorámica de Guayaquil y el río Guayas. Barrio Las Peñas al pie.', gradient: 'linear-gradient(135deg, #f97316, #ea580c)', icon: '⛰️' },
  { id: 3, destination: 'Parque Histórico', type: 'Parque temático', description: 'Reserva de fauna nativa y reconstrucción de la Guayaquil colonial a orillas del Daule.', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', icon: '🌿' },
  { id: 4, destination: 'MAAC', type: 'Museo', description: 'Museo Antropológico y de Arte Contemporáneo. Entrada gratuita domingos. Vista al Malecón.', gradient: 'linear-gradient(135deg, #9044EB, #7c3aed)', icon: '🎨' },
];

const MAS_VISITADOS: Card[] = [
  { id: 5, destination: 'Isla Santay', type: 'Reserva natural', description: 'Isla ecológica a 10 min del Malecón. Avistamiento de iguanas y aves tropicales.', gradient: 'linear-gradient(135deg, #0d9488, #0f766e)', icon: '🦎' },
  { id: 6, destination: 'Plaza Olmedo', type: 'Plaza histórica', description: 'Centro cívico de Guayaquil con estatua de Francisco de Orellana. Mercados artesanales cercanos.', gradient: 'linear-gradient(135deg, #2474D5, #9044EB)', icon: '🏛️' },
  { id: 7, destination: 'Salinas', type: 'Playa', description: 'La playa más popular del Ecuador. A 2 h de Guayaquil con aguas tranquilas del Pacífico.', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', icon: '🏖️' },
  { id: 8, destination: 'Mercado Artesanal', type: 'Mercado', description: 'El mayor mercado de artesanías del Ecuador. Más de 250 locales en el centro de Guayaquil.', gradient: 'linear-gradient(135deg, #e11d48, #be123c)', icon: '🛍️' },
];

const TENDENCIAS: Card[] = [
  { id: 9, destination: 'Montañita', type: 'Surf', description: 'Destino surfer del Pacífico ecuatoriano. Olas perfectas y ambiente bohemio. A 2 h de Guayaquil.', gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)', icon: '🏄' },
  { id: 10, destination: 'Galápagos', type: 'Archipiélago', description: 'Patrimonio Natural de la UNESCO. Vuelos directos desde Guayaquil (1h30). Temporada alta activa.', gradient: 'linear-gradient(135deg, #10b981, #059669)', icon: '🐢' },
  { id: 11, destination: 'Cuenca', type: 'Ciudad colonial', description: 'Ciudad Patrimonio de la Humanidad a 4 h de Guayaquil. Festival de Arte en temporada.', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', icon: '🏰' },
  { id: 12, destination: 'Puerto López', type: 'Avistamiento', description: 'Temporada de ballenas jorobadas (jun–sep). El mejor avistamiento del Pacífico sur.', gradient: 'linear-gradient(135deg, #0284c7, #0ea5e9)', icon: '🐋' },
];

function CardItem({ card }: { card: Card }) {
  return (
    <div
      className="flex-shrink-0 w-44 rounded-2xl p-4"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-lg" style={{ background: card.gradient }}>
        {card.icon}
      </div>
      <p className="text-white text-xs font-semibold mb-0.5 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
        {card.destination}
      </p>
      <p className="text-slate-500 text-[10px] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        {card.type}
      </p>
      <p className="text-slate-400 text-[10px] leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        {card.description}
      </p>
    </div>
  );
}

function ScrollRow({ cards }: { cards: Card[] }) {
  return (
    <div
      className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
    >
      {cards.map((card) => <CardItem key={card.id} card={card} />)}
    </div>
  );
}

export default function NotificacionesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  // No devices — show CTA
  if (user.devices.length === 0) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5"
            style={{ background: 'rgba(144,68,235,0.08)', border: '1px solid rgba(144,68,235,0.15)' }}
          >
            <Cpu size={28} className="text-purple-500" />
          </div>
          <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            Añade tu dispositivo Lumy
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Para ver recomendaciones personalizadas necesitas vincular al menos un dispositivo Lumy a tu cuenta.
          </p>
          <button
            type="button"
            onClick={() => navigate('/cuenta')}
            className="px-6 py-3 rounded-2xl text-sm font-medium text-white focus:outline-none"
            style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', boxShadow: '0 4px 16px rgba(144,68,235,0.3)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Ir a mi cuenta
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-2">
          <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Lumy · Recomendaciones
          </div>
          <h1 className="text-white font-bold text-2xl" style={{ fontFamily: 'Sora, sans-serif' }}>
            Para ti, hoy
          </h1>
          <p className="text-slate-500 text-sm mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Actualizado por Lumy según temporalidad y tendencias
          </p>
        </div>

        <div
          className="inline-flex items-center gap-2 mt-3 mb-1 px-3 py-1.5 rounded-full text-[10px]"
          style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.18)', color: '#38bdf8', fontFamily: 'DM Sans, sans-serif' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          Lumy actualizado · Día normal
        </div>

        <h2 className="text-white font-semibold text-sm mb-3 mt-7" style={{ fontFamily: 'Sora, sans-serif' }}>✨ Para ti</h2>
        <ScrollRow cards={PARA_TI} />

        <h2 className="text-white font-semibold text-sm mb-3 mt-7" style={{ fontFamily: 'Sora, sans-serif' }}>🔥 Más visitados</h2>
        <ScrollRow cards={MAS_VISITADOS} />

        <h2 className="text-white font-semibold text-sm mb-3 mt-7" style={{ fontFamily: 'Sora, sans-serif' }}>📈 Tendencias de temporada</h2>
        <ScrollRow cards={TENDENCIAS} />

        <p className="text-slate-700 text-[10px] mt-8 text-center" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Las recomendaciones se actualizan automáticamente con tu dispositivo Lumy.
        </p>
      </div>
    </PageLayout>
  );
}
