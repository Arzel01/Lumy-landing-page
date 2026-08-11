import { useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import productImg from '../../assets/Product.png';

const SHIPPING_COST: number = 0;

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <ShoppingBag size={32} className="text-slate-600" />
        </div>
        <h2
          className="font-bold text-2xl text-white mb-3"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Tu carrito está vacío
        </h2>
        <p
          className="text-slate-500 text-sm mb-8"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Agrega LUMY para comenzar tu pedido.
        </p>
        <Link
          to="/tienda"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
          style={{ background: 'linear-gradient(135deg, #2474D5, #9044EB)', fontFamily: 'DM Sans, sans-serif' }}
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8 pb-36 lg:pb-0">
      {/* Items list */}
      <div>
        <h1
          className="font-bold text-xl text-white mb-6"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Carrito ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})
        </h1>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <img
                  src={productImg}
                  alt={item.imageLabel}
                  className="w-24 h-24 object-cover rounded-xl"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold text-white text-sm leading-snug mb-1"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {item.name}
                </div>
                <div
                  className="flex items-center gap-2 mb-3"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: item.colorHex, border: '1px solid rgba(255,255,255,0.2)' }}
                  />
                  <span className="text-slate-500 text-xs">{item.colorLabel}</span>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  {/* Quantity */}
                  <div
                    className="inline-flex items-center rounded-lg overflow-hidden"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        item.quantity > 1
                          ? updateQty(item.id, item.quantity - 1)
                          : removeItem(item.id)
                      }
                      className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
                    >
                      <Minus size={12} />
                    </button>
                    <span
                      className="w-10 text-center text-white text-sm font-bold"
                      style={{ fontFamily: 'Sora, sans-serif' }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className="font-bold text-white text-base"
                      style={{ fontFamily: 'Sora, sans-serif' }}
                    >
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors focus:outline-none"
                      title="Eliminar"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo code (simulated) */}
        <div
          className="mt-5 flex gap-3 p-4 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Tag size={15} className="text-slate-600 flex-shrink-0 mt-0.5" />
          <input
            type="text"
            placeholder="Código promocional"
            className="flex-1 bg-transparent text-sm text-slate-400 placeholder:text-slate-700 focus:outline-none focus:text-white"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
            onKeyDown={(e) => { if (e.key === 'Enter') console.log('Promo code applied'); }}
          />
          <button
            type="button"
            className="text-xs font-semibold px-3 py-1 rounded-lg transition-colors"
            style={{ color: '#9044EB', fontFamily: 'DM Sans, sans-serif' }}
            onClick={() => console.log('Promo code applied')}
          >
            Aplicar
          </button>
        </div>
      </div>

      {/* Order summary — hidden on mobile (replaced by sticky bar) */}
      <div className="hidden lg:block">
        <div
          className="p-6 rounded-2xl sticky top-24"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h2
            className="font-bold text-base text-white mb-5"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Resumen del pedido
          </h2>

          <div className="flex flex-col gap-3 mb-5">
            <div className="flex justify-between text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="text-slate-400">
                Subtotal ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})
              </span>
              <span className="text-white font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="text-slate-400">Envío express</span>
              <span className="text-green-400 font-medium">
                {SHIPPING_COST > 0 ? `$${(SHIPPING_COST as number).toFixed(2)}` : 'Gratis'}
              </span>
            </div>
            <div
              className="flex justify-between text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}
            >
              <span className="text-slate-400">Impuestos estimados</span>
              <span className="text-white font-medium">${(total * 0.08).toFixed(2)}</span>
            </div>
          </div>

          <div
            className="flex justify-between items-center mb-6 py-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span
              className="font-bold text-white text-base"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Total
            </span>
            <span
              className="font-bold text-white text-xl"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              ${(total + total * 0.08 + SHIPPING_COST).toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout/envio')}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm text-white mb-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, #2474D5, #9044EB)',
              boxShadow: '0 4px 20px rgba(144,68,235,0.3)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Proceder al pago
            <ArrowRight size={15} />
          </button>

          <Link
            to="/tienda"
            className="block text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            ← Seguir comprando
          </Link>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      {items.length > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 lg:hidden"
          style={{
            background: 'rgba(5,7,15,0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="text-slate-400 text-xs block">
                {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'} · Envío gratis
              </span>
              <span
                className="font-bold text-white text-lg"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                ${(total + total * 0.08 + SHIPPING_COST).toFixed(2)}
              </span>
            </div>
            <span className="text-[10px] text-green-400" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              IVA incluido
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/checkout/envio')}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 active:scale-[0.98] focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, #2474D5, #9044EB)',
              boxShadow: '0 4px 20px rgba(144,68,235,0.35)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Proceder al pago
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
