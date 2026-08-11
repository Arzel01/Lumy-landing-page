import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Battery, Wifi, MapPin, Volume2, Lock, Unlock, Cpu, ChevronDown } from 'lucide-react';
import { useAuth, type LumyDevice } from '../context/AuthContext';
import PageLayout from '../layouts/PageLayout';

const LAST_SEEN_LABEL = 'Guayaquil, Ecuador · Actualizado hace 2 horas';

const DEVICE_STATS = {
  battery: 72,
  signal: 'Excelente',
  lat: -2.1962,
  lng: -79.8862,
  isOnline: true,
};

function EmptyState({ onGoToAccount }: { onGoToAccount: () => void }) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-10">
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
        Para rastrear tu dispositivo necesitas vincularlo a tu cuenta desde el apartado de cuenta.
      </p>
      <button
        type="button"
        onClick={onGoToAccount}
        className="px-6 py-3 rounded-2xl text-sm font-medium text-white focus:outline-none"
        style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', boxShadow: '0 4px 16px rgba(144,68,235,0.3)', fontFamily: 'DM Sans, sans-serif' }}
      >
        Ir a mi cuenta
      </button>
    </div>
  );
}

function DeviceView({ device }: { device: LumyDevice }) {
  const [isSounding, setIsSounding] = useState(false);
  const [lostMode, setLostMode] = useState(false);

  const batteryColor =
    DEVICE_STATS.battery > 50 ? '#22c55e' : DEVICE_STATS.battery > 20 ? '#f59e0b' : '#ef4444';

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${DEVICE_STATS.lng - 0.005},${DEVICE_STATS.lat - 0.005},${DEVICE_STATS.lng + 0.005},${DEVICE_STATS.lat + 0.005}&layer=mapnik&marker=${DEVICE_STATS.lat},${DEVICE_STATS.lng}`;

  const handleSound = () => {
    setIsSounding(true);
    setTimeout(() => setIsSounding(false), 3000);
  };

  return (
    <>
      {lostMode && (
        <div
          className="mb-4 px-4 py-3 rounded-2xl flex items-center gap-3"
          style={{ background: 'rgba(193,43,77,0.1)', border: '1px solid rgba(193,43,77,0.25)' }}
        >
          <Lock size={14} style={{ color: '#f43f5e', flexShrink: 0 }} />
          <p className="text-sm text-rose-300" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Modo perdido activo — tu Lumy está bloqueado y mostrando tus datos de contacto.
          </p>
        </div>
      )}

      {/* Status card */}
      <div
        className="rounded-3xl p-6 mb-4"
        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base text-white"
              style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', fontFamily: 'Sora, sans-serif' }}
            >
              L
            </div>
            <div>
              <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                Mi Lumy
              </p>
              <p className="text-slate-600 text-[10px] font-mono tracking-wider">
                {device.code.slice(0, 4)}-****-****-{device.code.slice(12)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>En línea</span>
          </div>
        </div>

        {/* Battery */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Battery size={13} style={{ color: batteryColor }} />
              <span className="text-xs text-slate-400" style={{ fontFamily: 'DM Sans, sans-serif' }}>Batería</span>
            </div>
            <span className="text-xs font-semibold" style={{ color: batteryColor, fontFamily: 'DM Sans, sans-serif' }}>
              {DEVICE_STATS.battery}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div
              className="h-1.5 rounded-full"
              style={{ width: `${DEVICE_STATS.battery}%`, background: batteryColor, boxShadow: `0 0 8px ${batteryColor}60` }}
            />
          </div>
        </div>

        {/* Signal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Wifi size={13} className="text-slate-500" />
            <span className="text-xs text-slate-400" style={{ fontFamily: 'DM Sans, sans-serif' }}>Señal</span>
          </div>
          <span className="text-xs text-slate-300" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {DEVICE_STATS.signal}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={handleSound}
          disabled={isSounding}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-medium text-white transition-all duration-200 focus:outline-none disabled:opacity-70"
          style={{ background: 'rgba(36,116,213,0.1)', border: '1px solid rgba(36,116,213,0.2)', fontFamily: 'DM Sans, sans-serif' }}
        >
          <Volume2 size={15} className={isSounding ? 'animate-pulse text-blue-400' : 'text-blue-400'} />
          {isSounding ? 'Sonando...' : 'Hacer sonar'}
        </button>
        <button
          type="button"
          onClick={() => setLostMode((v) => !v)}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-medium text-white transition-all duration-200 focus:outline-none"
          style={{
            background: lostMode ? 'rgba(193,43,77,0.12)' : 'rgba(144,68,235,0.1)',
            border: lostMode ? '1px solid rgba(193,43,77,0.25)' : '1px solid rgba(144,68,235,0.2)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          {lostMode ? <><Unlock size={15} className="text-rose-400" /> Desactivar</> : <><Lock size={15} className="text-purple-400" /> Modo perdido</>}
        </button>
      </div>

      {/* Mini map */}
      <div className="rounded-2xl overflow-hidden relative mb-3" style={{ height: '220px' }}>
        <iframe
          title="Ubicación Lumy"
          src={mapSrc}
          className="w-full h-full border-0"
          style={{ filter: 'invert(90%) hue-rotate(190deg) brightness(85%) contrast(90%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 rounded-full relative z-10" style={{ background: '#3b82f6', boxShadow: '0 0 0 2px rgba(59,130,246,0.4)' }} />
            <div className="absolute w-4 h-4 rounded-full bg-blue-500 opacity-40 animate-ping" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-1">
        <MapPin size={12} className="text-slate-600 flex-shrink-0" />
        <p className="text-slate-500 text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>{LAST_SEEN_LABEL}</p>
      </div>
    </>
  );
}

export default function RastrearPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!user) {
    navigate('/auth');
    return null;
  }

  const devices = user.devices;

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Lumy · Rastreo
          </div>
          <h1 className="text-white font-bold text-2xl" style={{ fontFamily: 'Sora, sans-serif' }}>
            Rastrear dispositivo
          </h1>
          <p className="text-slate-500 text-sm mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Localiza y gestiona tu Lumy en tiempo real
          </p>
        </div>

        {devices.length === 0 ? (
          <EmptyState onGoToAccount={() => navigate('/cuenta')} />
        ) : (
          <>
            {/* Device selector (only if multiple) */}
            {devices.length > 1 && (
              <div className="mb-4 relative">
                <select
                  value={selectedIdx}
                  onChange={(e) => setSelectedIdx(Number(e.target.value))}
                  className="w-full px-4 py-3 pr-10 rounded-2xl text-white text-sm appearance-none focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {devices.map((d, i) => (
                    <option key={d.code} value={i} style={{ background: '#05070F' }}>
                      Lumy {i + 1} — {d.code.slice(0, 4)}-****-{d.code.slice(12)}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            )}
            <DeviceView device={devices[selectedIdx] ?? devices[0]} />
          </>
        )}
      </div>
    </PageLayout>
  );
}
