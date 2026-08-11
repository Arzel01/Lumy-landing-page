import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Truck, Zap } from 'lucide-react';
import { useCheckout, type ShippingInfo, type MetodoEnvio } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';
import productImg from '../../assets/Product.png';

const PAISES = ['México', 'Colombia', 'Argentina', 'Chile', 'España', 'Perú', 'Venezuela', 'Ecuador', 'Otro'];

type Field = keyof Omit<ShippingInfo, 'metodoEnvio'>;

const FIELDS: { key: Field; label: string; placeholder: string; half?: boolean }[] = [
  { key: 'nombre', label: 'Nombre', placeholder: 'Valentina', half: true },
  { key: 'apellido', label: 'Apellido', placeholder: 'Andrade', half: true },
  { key: 'email', label: 'Correo electrónico', placeholder: 'tu@email.com' },
  { key: 'telefono', label: 'Teléfono', placeholder: '+52 55 1234 5678' },
  { key: 'direccion', label: 'Dirección', placeholder: 'Calle, Número, Colonia' },
  { key: 'ciudad', label: 'Ciudad', placeholder: 'Ciudad de México', half: true },
  { key: 'estado', label: 'Estado / Provincia', placeholder: 'CDMX', half: true },
  { key: 'cp', label: 'Código Postal', placeholder: '06600', half: true },
];

export default function ShippingPage() {
  const navigate = useNavigate();
  const { shipping, setShipping } = useCheckout();
  const { items, total } = useCart();

  const [form, setForm] = useState<Partial<Omit<ShippingInfo, 'metodoEnvio'>>>({
    nombre: shipping.nombre ?? '',
    apellido: shipping.apellido ?? '',
    email: shipping.email ?? '',
    telefono: shipping.telefono ?? '',
    direccion: shipping.direccion ?? '',
    ciudad: shipping.ciudad ?? '',
    estado: shipping.estado ?? '',
    pais: shipping.pais ?? 'México',
    cp: shipping.cp ?? '',
  });
  const [metodo, setMetodo] = useState<MetodoEnvio>(shipping.metodoEnvio ?? 'express');

  const update = (key: Field, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleContinue = () => {
    setShipping({ ...form, metodoEnvio: metodo } as Partial<ShippingInfo>);
    navigate('/checkout/pago');
  };

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-8 pb-4">
      {/* Left: form */}
      <div>
        <h1
          className="font-bold text-xl text-white mb-6"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Dirección de envío
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {FIELDS.map((f) => (
            <div key={f.key} className={f.half ? '' : 'sm:col-span-2'}>
              <label
                className="block text-xs font-medium text-slate-400 mb-1.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {f.label}
              </label>
              <input
                type={f.key === 'email' ? 'email' : 'text'}
                placeholder={f.placeholder}
                value={(form[f.key] as string) ?? ''}
                onChange={(e) => update(f.key, e.target.value)}
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
          ))}

          {/* Country select */}
          <div className="sm:col-span-2">
            <label
              className="block text-xs font-medium text-slate-400 mb-1.5"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              País
            </label>
            <select
              value={form.pais ?? 'México'}
              onChange={(e) => update('pais', e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all duration-200 appearance-none"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {PAISES.map((p) => (
                <option key={p} value={p} style={{ background: '#0d1117' }}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Delivery method */}
        <h2
          className="font-bold text-base text-white mb-4"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Método de envío
        </h2>
        <div className="flex flex-col gap-3 mb-8">
          {(
            [
              {
                id: 'express' as MetodoEnvio,
                label: 'Express Internacional',
                detail: '3-7 días hábiles',
                price: 'Gratis',
                Icon: Zap,
                color: '#9044EB',
              },
              {
                id: 'standard' as MetodoEnvio,
                label: 'Estándar',
                detail: '10-15 días hábiles',
                price: 'Gratis',
                Icon: Truck,
                color: '#2474D5',
              },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setMetodo(opt.id)}
              className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 focus:outline-none"
              style={{
                background: metodo === opt.id ? `rgba(${opt.id === 'express' ? '144,68,235' : '36,116,213'},0.07)` : 'rgba(255,255,255,0.02)',
                border: metodo === opt.id
                  ? `1px solid rgba(${opt.id === 'express' ? '144,68,235' : '36,116,213'},0.3)`
                  : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(${opt.id === 'express' ? '144,68,235' : '36,116,213'},0.12)` }}
              >
                <opt.Icon size={15} style={{ color: opt.color }} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {opt.label}
                </div>
                <div className="text-slate-500 text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {opt.detail}
                </div>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: '#4ade80', fontFamily: 'DM Sans, sans-serif' }}
              >
                {opt.price}
              </span>
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  border: metodo === opt.id ? 'none' : '2px solid rgba(255,255,255,0.12)',
                  background: metodo === opt.id
                    ? `linear-gradient(135deg, ${opt.color}, ${opt.color})`
                    : 'transparent',
                }}
              >
                {metodo === opt.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Nav buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/checkout/carrito')}
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
            onClick={handleContinue}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.01] focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, #2474D5, #9044EB)',
              boxShadow: '0 4px 20px rgba(144,68,235,0.25)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Continuar al pago
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Right: order summary — hidden on mobile */}
      <div className="hidden lg:block">
        <OrderSummary items={items} total={total} />
      </div>
    </div>
  );
}

function OrderSummary({
  items,
  total,
}: {
  items: ReturnType<typeof useCart>['items'];
  total: number;
}) {
  return (
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
              <div className="text-slate-500 text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {item.colorLabel}
              </div>
            </div>
            <span className="text-white text-sm font-bold flex-shrink-0" style={{ fontFamily: 'Sora, sans-serif' }}>
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div
        className="pt-4 flex flex-col gap-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex justify-between text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          <span className="text-slate-500">Subtotal</span>
          <span className="text-white">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          <span className="text-slate-500">Envío</span>
          <span className="text-green-400">Gratis</span>
        </div>
        <div className="flex justify-between text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          <span className="text-slate-500">Impuestos</span>
          <span className="text-white">${(total * 0.08).toFixed(2)}</span>
        </div>
        <div
          className="flex justify-between pt-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Sora, sans-serif' }}
        >
          <span className="font-bold text-white text-sm">Total</span>
          <span className="font-bold text-white text-sm">
            ${(total * 1.08).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
