import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../layouts/PageLayout';

function generateResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('museo') || q.includes('arte') || q.includes('cultura') || q.includes('historia'))
    return 'Cerca de ti en Guayaquil: Museo Antropológico y de Arte Contemporáneo MAAC (1.2 km), Museo Municipal de Guayaquil (2.0 km). El MAAC tiene entrada gratuita los domingos. ¿Activo la proyección de la ruta?';
  if (q.includes('comer') || q.includes('restaurante') || q.includes('comida') || q.includes('cenar') || q.includes('encebollado') || q.includes('mariscos'))
    return 'He encontrado 14 restaurantes bien valorados en un radio de 600 m. Destaca "Lo Nuestro" en el Malecón con mariscos frescos y vista al río Guayas. También hay cevicherías populares en la Zona Rosa.';
  if (q.includes('hotel') || q.includes('dormir') || q.includes('alojamiento') || q.includes('hostal'))
    return 'Hay 10 hoteles disponibles esta noche cerca del Malecón 2000. El Hotel Wyndham y el NH Collection tienen las mejores valoraciones. Precio medio: $85 USD/noche.';
  if (q.includes('playa') || q.includes('mar') || q.includes('costa') || q.includes('salinas') || q.includes('montañita'))
    return 'La playa más cercana es Salinas a 2h en bus o 1h30 en carro. Montañita (surf) está a 2h. Playas del Pacífico con temperatura del agua de 25 °C todo el año.';
  if (q.includes('aeropuerto') || q.includes('vuelo') || q.includes('avión'))
    return 'El Aeropuerto Internacional José Joaquín de Olmedo (GYE) está a 5 km del centro. Tiempo estimado: 15 min en taxi. Tarifa aproximada: $4–6 USD.';
  if (q.includes('malecón') || q.includes('malecon') || q.includes('río') || q.includes('guayas'))
    return 'El Malecón 2000 está a 1.8 km de tu posición. Es el principal paseo fluvial de Guayaquil: 2.5 km a orillas del río Guayas con museos, jardines, cine IMAX y el Mercado del Malecón. ¿Proyecto la ruta?';
  if (q.includes('cerro') || q.includes('santa ana') || q.includes('las peñas'))
    return 'El Cerro Santa Ana y Las Peñas están a 2.3 km. Subida de 444 escalones con vista panorámica a toda la ciudad y el río Guayas. Mercado de artesanías al pie del cerro.';
  if (q.includes('ecuador'))
    return 'Ecuador tiene 4 mundos en uno: Costa, Sierra, Amazonía y Galápagos. Tu posición actual está en Guayaquil, la ciudad más grande del país y puerta de entrada al Pacífico. Destinos destacados cercanos: Galápagos (vuelo 1h30), Salinas (2h), Montañita (2h) y Cuenca (4h). ¿A cuál te dirijo?';
  return `He analizado tu búsqueda "${query}". En Guayaquil hay alta actividad turística en esta zona. Hay 4 puntos de interés destacados a menos de 1.5 km de tu posición actual. ¿Activo la proyección holográfica de la ruta?`;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)' }}
      >
        <span className="text-[11px] text-white font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>L</span>
      </div>
      <span className="text-slate-400 text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        Lumy está buscando...
      </span>
      <div className="flex gap-1 ml-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function MapaPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const hasDevices = (user?.devices?.length ?? 0) > 0;

  if (user && !hasDevices) {
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
            Vincula tu dispositivo Lumy
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Para acceder al mapa con Lumy AI necesitas tener al menos un dispositivo Lumy vinculado a tu cuenta.
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

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }
    if (!query.trim()) return;
    setResponse(null);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setResponse(generateResponse(query));
    }, 2200);
  };

  return (
    <PageLayout>
      <div
        className="relative"
        style={{ height: 'calc(100vh - 48px - 80px)' }}
      >
        {/* OpenStreetMap iframe — dark filter */}
        <iframe
          title="Mapa Lumy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-80.020,-2.270,-79.820,-2.110&layer=mapnik"
          className="w-full h-full border-0"
          style={{
            filter: 'invert(90%) hue-rotate(190deg) brightness(85%) contrast(90%)',
          }}
        />

        {/* Search overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          {/* Response card */}
          {(isSearching || response) && (
            <div
              className="mb-2 rounded-2xl p-4"
              style={{
                background: 'rgba(5,7,15,0.94)',
                border: '1px solid rgba(144,68,235,0.2)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {isSearching ? (
                <TypingIndicator />
              ) : (
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)' }}
                  >
                    <span className="text-[11px] text-white font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>L</span>
                  </div>
                  <p
                    className="text-slate-300 text-xs leading-relaxed"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {response}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Search bar */}
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder={
                  user
                    ? '¿A dónde quieres ir? Pregunta a Lumy...'
                    : 'Inicia sesión para usar Lumy AI...'
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-3.5 pl-4 pr-12 rounded-2xl text-white text-sm focus:outline-none placeholder-slate-500"
                style={{
                  background: 'rgba(5,7,15,0.92)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(16px)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-xl transition-opacity focus:outline-none"
                style={{ color: '#9044EB' }}
              >
                <Search size={16} />
              </button>
            </div>
          </form>

          {!user && (
            <p
              className="text-center text-[10px] text-slate-600 mt-1.5"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <button
                type="button"
                onClick={() => navigate('/auth')}
                className="text-purple-500 hover:text-purple-400 transition-colors focus:outline-none"
              >
                Inicia sesión
              </button>{' '}
              para activar la búsqueda con Lumy AI
            </p>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
