import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard, Check } from 'lucide-react';
import { useCheckout, type MetodoPago } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';
import productImg from '../../assets/Product.png';

function formatCard(val: string): string {
  return val
    .replace(/\D/g, '')
    .substring(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(val: string): string {
  const clean = val.replace(/\D/g, '').substring(0, 4);
  if (clean.length >= 3) return `${clean.slice(0, 2)}/${clean.slice(2)}`;
  return clean;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { payment, setPayment, confirmOrder } = useCheckout();
  const { items, total, clearCart } = useCart();

  const [metodo, setMetodo] = useState<MetodoPago>(
    (payment.metodo as MetodoPago) ?? 'card'
  );
  const [card, setCard] = useState({
    numero: payment.cardNumero ?? '',
    nombre: payment.cardNombre ?? '',
    expiry: payment.cardExpiry ?? '',
    cvv: payment.cardCvv ?? '',
  });
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setPayment({
      metodo,
      cardNumero: card.numero,
      cardNombre: card.nombre,
      cardExpiry: card.expiry,
      cardCvv: card.cvv,
    });
    setLoading(true);
    setTimeout(() => {
      confirmOrder();
      clearCart();
      navigate('/checkout/confirmacion');
    }, 2000);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-8">
      {/* Left: payment form */}
      <div>
        <h1
          className="font-bold text-xl text-white mb-6"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Método de pago
        </h1>

        {/* Method tabs */}
        <div
          className="flex gap-2 p-1.5 rounded-xl mb-6 w-fit"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {(
            [
              { id: 'card' as MetodoPago, label: '💳 Tarjeta' },
              { id: 'paypal' as MetodoPago, label: '🔵 PayPal' },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setMetodo(id)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none"
              style={{
                background: metodo === id ? 'rgba(144,68,235,0.2)' : 'transparent',
                color: metodo === id ? '#e2e8f0' : '#475569',
                border: metodo === id ? '1px solid rgba(144,68,235,0.3)' : '1px solid transparent',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {metodo === 'card' ? (
          <div className="flex flex-col gap-4 mb-8">
            {/* Card number */}
            <div>
              <label
                className="block text-xs font-medium text-slate-400 mb-1.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Número de tarjeta
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={card.numero}
                  onChange={(e) =>
                    setCard((p) => ({ ...p, numero: formatCard(e.target.value) }))
                  }
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white placeholder:text-slate-700 focus:outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(144,68,235,0.4)';
                    e.currentTarget.style.background = 'rgba(144,68,235,0.05)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                />
                <CreditCard
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                />
              </div>
            </div>

            {/* Cardholder name */}
            <div>
              <label
                className="block text-xs font-medium text-slate-400 mb-1.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Nombre en la tarjeta
              </label>
              <input
                type="text"
                placeholder="VALENTINA ANDRADE"
                value={card.nombre}
                onChange={(e) =>
                  setCard((p) => ({ ...p, nombre: e.target.value.toUpperCase() }))
                }
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-700 focus:outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontFamily: 'DM Sans, sans-serif',
                  letterSpacing: '0.05em',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(144,68,235,0.4)';
                  e.currentTarget.style.background = 'rgba(144,68,235,0.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              />
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs font-medium text-slate-400 mb-1.5"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Vencimiento
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={card.expiry}
                  onChange={(e) =>
                    setCard((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))
                  }
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-700 focus:outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(144,68,235,0.4)';
                    e.currentTarget.style.background = 'rgba(144,68,235,0.05)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium text-slate-400 mb-1.5"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="•••"
                  maxLength={4}
                  value={card.cvv}
                  onChange={(e) =>
                    setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) }))
                  }
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-700 focus:outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(144,68,235,0.4)';
                    e.currentTarget.style.background = 'rgba(144,68,235,0.05)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                />
              </div>
            </div>

            {/* Security note */}
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}
            >
              <Lock size={11} />
              Tus datos están cifrados con SSL de 256 bits. No almacenamos información bancaria.
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center gap-4 py-12 mb-8 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(36,116,213,0.12)' }}
            >
              🔵
            </div>
            <div className="text-center">
              <div className="font-semibold text-white text-sm mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Pagar con PayPal
              </div>
              <div className="text-slate-500 text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Serás redirigido a PayPal para completar tu pago de forma segura.
              </div>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/checkout/envio')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm text-slate-400 hover:text-white transition-colors focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <ArrowLeft size={14} />
            Volver
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 focus:outline-none disabled:opacity-80"
            style={{
              background: loading
                ? 'linear-gradient(135deg, #1a5ea8, #6b2fb5)'
                : 'linear-gradient(135deg, #2474D5, #9044EB)',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(144,68,235,0.25)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {loading ? (
              <>
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                />
                Procesando…
              </>
            ) : (
              <>
                <Lock size={14} />
                Confirmar pedido — ${(total * 1.08).toFixed(2)} USD
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right: summary */}
      <div
        className="p-5 rounded-2xl sticky top-24 h-fit"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <h3
          className="font-bold text-sm text-white mb-4"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Resumen
        </h3>
        <div className="flex flex-col gap-3 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <div className="relative flex-shrink-0">
                <img src={productImg} alt={item.imageLabel} className="w-14 h-14 object-cover rounded-xl" />
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: '#9044EB', fontFamily: 'Sora, sans-serif' }}
                >
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-semibold truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {item.name}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: item.colorHex, border: '1px solid rgba(255,255,255,0.2)' }}
                  />
                  <span className="text-slate-500 text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.colorLabel}
                  </span>
                </div>
              </div>
              <span className="text-white text-sm font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div
          className="pt-4 flex flex-col gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { label: 'Subtotal', val: `$${total.toFixed(2)}`, color: '#fff' },
            { label: 'Envío', val: 'Gratis', color: '#4ade80' },
            { label: 'Impuestos', val: `$${(total * 0.08).toFixed(2)}`, color: '#fff' },
          ].map(({ label, val, color }) => (
            <div key={label} className="flex justify-between text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="text-slate-500">{label}</span>
              <span style={{ color }}>{val}</span>
            </div>
          ))}
          <div
            className="flex justify-between pt-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="font-bold text-white text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>Total</span>
            <span className="font-bold text-white text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
              ${(total * 1.08).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Security badges */}
        <div
          className="mt-4 pt-4 flex flex-wrap gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {['SSL 256bit', 'Compra segura', 'Garantía 1 año'].map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-1 text-xs"
              style={{ color: '#334155', fontFamily: 'DM Sans, sans-serif' }}
            >
              <Check size={10} className="text-green-700" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
