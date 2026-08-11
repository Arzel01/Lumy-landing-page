import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShoppingBag, Trash2, Plus, KeyRound, Cpu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import PageLayout from '../layouts/PageLayout';

const formatCode = (raw = '') => raw.match(/.{1,4}/g)?.join('-') ?? raw;

function normalizeInput(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
}

export default function AccountPage() {
  const { user, logout, deleteAccount, addDevice, removeDevice } = useAuth();
  const { items, total } = useCart();
  const navigate = useNavigate();

  const [deviceCode, setDeviceCode] = useState('');
  const [deviceError, setDeviceError] = useState('');
  const [deviceLoading, setDeviceLoading] = useState(false);
  const [deviceSuccess, setDeviceSuccess] = useState(false);

  if (!user) {
    navigate('/auth');
    return null;
  }

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const joinDate = new Date(user.createdAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = () => {
    if (confirm('¿Eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      deleteAccount();
      navigate('/');
    }
  };

  const handleAddDevice = async (e: FormEvent) => {
    e.preventDefault();
    setDeviceError('');
    setDeviceSuccess(false);
    if (deviceCode.length !== 16) {
      setDeviceError('El código debe tener exactamente 16 caracteres.');
      return;
    }
    setDeviceLoading(true);
    const result = await addDevice(deviceCode);
    setDeviceLoading(false);
    if (result.error) {
      setDeviceError(result.error);
    } else {
      setDeviceCode('');
      setDeviceSuccess(true);
      setTimeout(() => setDeviceSuccess(false), 3000);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    fontFamily: 'monospace',
    letterSpacing: '0.12em',
  };
  const inputFocusStyle = {
    border: '1px solid rgba(144,68,235,0.6)',
    boxShadow: '0 0 0 3px rgba(144,68,235,0.12)',
  };

  return (
    <PageLayout>
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Profile card */}
        <div
          className="rounded-3xl p-7 mb-6"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-5 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', boxShadow: '0 4px 20px rgba(144,68,235,0.4)', fontFamily: 'Sora, sans-serif' }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-xl truncate" style={{ fontFamily: 'Sora, sans-serif' }}>
                {user.name}
              </h1>
              <p className="text-slate-600 text-xs mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Miembro desde {joinDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4" style={{ background: 'rgba(36,116,213,0.06)', border: '1px solid rgba(36,116,213,0.12)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Cpu size={13} className="text-blue-400" />
                <span className="text-xs text-slate-500 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Dispositivos
                </span>
              </div>
              <span className="text-sm font-medium text-blue-300" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {user.devices.length === 0
                  ? 'Ninguno añadido'
                  : `${user.devices.length} Lumy${user.devices.length > 1 ? 's' : ''}`}
              </span>
            </div>
            <div className="rounded-2xl p-4" style={{ background: 'rgba(144,68,235,0.06)', border: '1px solid rgba(144,68,235,0.12)' }}>
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag size={13} className="text-purple-400" />
                <span className="text-xs text-slate-500 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Carrito
                </span>
              </div>
              <span className="text-sm font-medium text-purple-300" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {items.length > 0 ? `$${total.toFixed(2)} USD` : 'Vacío'}
              </span>
            </div>
          </div>
        </div>

        {/* Dispositivos Lumy */}
        <div
          className="rounded-3xl p-7 mb-6"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-base" style={{ fontFamily: 'Sora, sans-serif' }}>
              Mis dispositivos Lumy
            </h2>
            {user.devices.length > 0 && (
              <span
                className="text-[10px] px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(14,165,233,0.1)', color: '#38bdf8', border: '1px solid rgba(14,165,233,0.2)', fontFamily: 'DM Sans, sans-serif' }}
              >
                {user.devices.length} activo{user.devices.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Device list */}
          {user.devices.length > 0 && (
            <div className="flex flex-col gap-2 mb-5">
              {user.devices.map((device) => {
                const addedDate = new Date(device.addedAt).toLocaleDateString('es-ES', {
                  day: 'numeric', month: 'short', year: 'numeric',
                });
                return (
                  <div
                    key={device.code}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', fontFamily: 'Sora, sans-serif' }}
                      >
                        L
                      </div>
                      <div>
                        <p className="text-white text-xs font-mono tracking-wider">
                          {device.code.slice(0, 4)}-****-****-{device.code.slice(12)}
                        </p>
                        <p className="text-slate-600 text-[10px] mt-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          Añadido el {addedDate}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDevice(device.code)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 transition-colors focus:outline-none"
                      aria-label="Eliminar dispositivo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add device form */}
          <form onSubmit={handleAddDevice} className="flex flex-col gap-3">
            {user.devices.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <Cpu size={20} className="text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm text-center" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Aún no has añadido ningún dispositivo Lumy.
                </p>
                <p className="text-slate-600 text-xs text-center" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Añade tu código para acceder al rastreo y las notificaciones.
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 flex items-center gap-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <KeyRound size={11} />
                Código Lumy (16 dígitos)
              </label>
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={formatCode(deviceCode)}
                maxLength={19}
                onChange={(e) => setDeviceCode(normalizeInput(e.target.value))}
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.currentTarget.style, { ...inputStyle, ...inputFocusStyle })}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
              />
              <p className="text-[10px] text-slate-600 mt-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Código incluido en la caja de tu dispositivo Lumy
              </p>
            </div>

            {deviceError && (
              <p className="text-sm px-4 py-3 rounded-xl" style={{ color: '#fb7185', background: 'rgba(193,43,77,0.08)', border: '1px solid rgba(193,43,77,0.18)', fontFamily: 'DM Sans, sans-serif' }}>
                {deviceError}
              </p>
            )}

            {deviceSuccess && (
              <p className="text-sm px-4 py-3 rounded-xl" style={{ color: '#34d399', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.18)', fontFamily: 'DM Sans, sans-serif' }}>
                ¡Dispositivo añadido correctamente!
              </p>
            )}

            <button
              type="submit"
              disabled={deviceLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] focus:outline-none disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', boxShadow: '0 4px 16px rgba(144,68,235,0.3)', fontFamily: 'DM Sans, sans-serif' }}
            >
              <Plus size={15} />
              {deviceLoading ? 'Añadiendo…' : 'Añadir dispositivo'}
            </button>
          </form>
        </div>

        {/* Orders section */}
        <div
          className="rounded-3xl p-7 mb-6"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-white font-semibold text-base mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
            Mis pedidos
          </h2>
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <ShoppingBag size={20} className="text-slate-600" />
            </div>
            <p className="text-slate-500 text-sm text-center" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Todavía no has realizado ningún pedido.
            </p>
            <button
              type="button"
              onClick={() => navigate('/tienda')}
              className="mt-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
              style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', boxShadow: '0 4px 16px rgba(144,68,235,0.3)', fontFamily: 'DM Sans, sans-serif' }}
            >
              Explorar tienda
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-medium text-white transition-all duration-200 hover:bg-white/5 focus:outline-none"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'DM Sans, sans-serif' }}
          >
            <LogOut size={15} />
            Cerrar sesión
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-2xl text-sm text-slate-500 hover:text-red-400 transition-colors focus:outline-none"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <Trash2 size={14} />
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
