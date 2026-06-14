import { useNavigate, Link } from 'react-router-dom';
import { LogOut, ShoppingBag, User, Trash2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/Logo.png';

export default function AccountPage() {
  const { user, logout, deleteAccount } = useAuth();
  const { items, total } = useCart();
  const navigate = useNavigate();

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

  return (
    <div
      className="min-h-screen px-4 py-16"
      style={{ background: '#05070F' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back + Logo */}
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <ArrowLeft size={15} />
            Inicio
          </Link>
          <img src={logoImg} alt="LUMY" className="h-7 w-auto" />
        </div>

        {/* Profile card */}
        <div
          className="rounded-3xl p-7 mb-6"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-center gap-5 mb-6">
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl text-white flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                boxShadow: '0 4px 20px rgba(144,68,235,0.4)',
                fontFamily: 'Sora, sans-serif',
              }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1
                className="text-white font-bold text-xl truncate"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {user.name}
              </h1>
              <p
                className="text-slate-400 text-sm truncate"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {user.email}
              </p>
              <p
                className="text-slate-600 text-xs mt-1"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Miembro desde {joinDate}
              </p>
            </div>
          </div>

          {/* Info row */}
          <div
            className="grid grid-cols-2 gap-3"
          >
            <div
              className="rounded-2xl p-4"
              style={{
                background: 'rgba(36,116,213,0.06)',
                border: '1px solid rgba(36,116,213,0.12)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <User size={13} className="text-blue-400" />
                <span
                  className="text-xs text-slate-500 uppercase tracking-wider"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Estado
                </span>
              </div>
              <span
                className="text-sm font-medium text-blue-300"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Cuenta activa
              </span>
            </div>
            <div
              className="rounded-2xl p-4"
              style={{
                background: 'rgba(144,68,235,0.06)',
                border: '1px solid rgba(144,68,235,0.12)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag size={13} className="text-purple-400" />
                <span
                  className="text-xs text-slate-500 uppercase tracking-wider"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Carrito
                </span>
              </div>
              <span
                className="text-sm font-medium text-purple-300"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {items.length > 0 ? `$${total.toFixed(2)} USD` : 'Vacío'}
              </span>
            </div>
          </div>
        </div>

        {/* Orders section */}
        <div
          className="rounded-3xl p-7 mb-6"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <h2
            className="text-white font-semibold text-base mb-5"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Mis pedidos
          </h2>
          <div className="flex flex-col items-center gap-3 py-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <ShoppingBag size={20} className="text-slate-600" />
            </div>
            <p
              className="text-slate-500 text-sm text-center"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Todavía no has realizado ningún pedido.
            </p>
            <button
              type="button"
              onClick={() => navigate('/tienda')}
              className="mt-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                boxShadow: '0 4px 16px rgba(144,68,235,0.3)',
                fontFamily: 'DM Sans, sans-serif',
              }}
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
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              fontFamily: 'DM Sans, sans-serif',
            }}
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
  );
}
