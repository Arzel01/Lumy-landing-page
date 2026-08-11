import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Check, Shield, Truck, Zap } from 'lucide-react';
import productImg from '../assets/Product.png';
import { useCart } from '../context/CartContext';

type ColorVariantId = 'obsidian' | 'silver' | 'midnight';

type ColorVariant = {
  id: ColorVariantId;
  label: string;
  bgColor: string;
  ringColor: string;
  images?: string[];
};

const COLOR_VARIANTS: ColorVariant[] = [
  {
    id: 'obsidian',
    label: 'Obsidian Black',
    bgColor: '#141414',
    ringColor: '#2474D5',
    images: [productImg],
  },
  {
    id: 'silver',
    label: 'Arctic Silver',
    bgColor: '#9eb0c8',
    ringColor: '#9044EB',
  },
  {
    id: 'midnight',
    label: 'Midnight Blue',
    bgColor: '#102050',
    ringColor: '#C12B4D',
  },
];

const GALLERY_LABELS = [
  'LUMY en caja premium negra mate - vista frontal del empaque',
  'Dispositivo LUMY - vista lateral con puerto USB-C y botón multifunción',
  'LUMY proyectando holograma - demo de mapa 3D en uso real',
  'LUMY con estuche protector EVA incluido en la caja',
];

const VALUE_BULLETS = [
  'Sin suscripciones mensuales, sin anuncios.',
  'Traducción y mapas personalizados en tiempo real en cualquier parte del mundo.',
  'Incluye estuche protector y cable USB-C trenzado gratis.',
];

const TRUST_BADGES = [
  { Icon: Shield, text: 'Garantía 1 año' },
  { Icon: Truck, text: 'Envío gratuito' },
  { Icon: Zap, text: 'Activación inmediata' },
];

export default function Ecommerce() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState<ColorVariantId>('obsidian');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<number>(0);

  const activeVariant = COLOR_VARIANTS.find((c) => c.id === selectedColor)!;

  const handleAddToCart = () => {
    addItem({
      id: `lumy-${selectedColor}`,
      name: 'LUMY® - Navegador Holográfico Inteligente',
      colorId: selectedColor,
      colorLabel: activeVariant.label,
      colorHex: activeVariant.bgColor,
      quantity,
      unitPrice: 129,
      imageLabel: GALLERY_LABELS[0],
    });
    navigate('/checkout/carrito');
  };

  const handleExpressPayment = (method: string) => {
    addItem({
      id: `lumy-${selectedColor}`,
      name: 'LUMY® - Navegador Holográfico Inteligente',
      colorId: selectedColor,
      colorLabel: activeVariant.label,
      colorHex: activeVariant.bgColor,
      quantity,
      unitPrice: 129,
      imageLabel: GALLERY_LABELS[0],
    });
    console.log(`Pago express con ${method}`);
    navigate('/checkout/envio');
  };

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => Math.min(10, q + 1));

  return (
    <section id="comprar" className="relative pt-12 lg:pt-16 pb-40 md:pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div
            className="inline-block text-xs font-mono tracking-widest text-slate-500 mb-5 uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Disponible Ahora
          </div>
          <h2
            className="font-bold text-3xl lg:text-5xl text-white"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Haz tuyo el{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              futuro
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            {activeVariant.images?.[activeImage] ? (
              <img
                src={activeVariant.images[activeImage]}
                alt={`LUMY ${activeVariant.label}`}
                className="w-full rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              />
            ) : (
              <div
                className="w-full h-80 md:h-[460px] rounded-2xl flex flex-col items-center justify-center gap-3"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span
                  className="text-3xl font-bold tracking-widest uppercase"
                  style={{
                    background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Sora, sans-serif',
                  }}
                >
                  Próximamente
                </span>
                <span
                  className="text-slate-500 text-sm"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {activeVariant.label}
                </span>
              </div>
            )}
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {GALLERY_LABELS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => activeVariant.images && setActiveImage(i)}
                  className="rounded-xl overflow-hidden transition-all duration-200 focus:outline-none"
                  style={{
                    opacity: activeVariant.images ? (activeImage === i ? 1 : 0.45) : 0.5,
                    outline: activeImage === i && activeVariant.images ? '2px solid #9044EB' : '2px solid transparent',
                    outlineOffset: '2px',
                    cursor: activeVariant.images ? 'pointer' : 'default',
                  }}
                >
                  {activeVariant.images?.[i] ? (
                    <img
                      src={activeVariant.images[i]}
                      alt={`LUMY ${activeVariant.label} ${i + 1}`}
                      className="w-full object-contain"
                    />
                  ) : (
                    <div
                      className="w-full aspect-square flex items-center justify-center"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <span
                        className="text-[9px] font-semibold tracking-widest uppercase text-center leading-tight px-1"
                        style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        Próxi&shy;mamente
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col">
            <span
              className="self-start text-xs font-medium px-3 py-1 rounded-full mb-5"
              style={{
                background: 'rgba(193,43,77,0.1)',
                border: '1px solid rgba(193,43,77,0.22)',
                color: '#fb7185',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Oferta de Lanzamiento. Quedan pocas unidades
            </span>

            <h2
              className="font-bold text-2xl lg:text-3xl text-white leading-tight mb-3"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              LUMY® Navegador Holográfico Inteligente
            </h2>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-base">★</span>
                ))}
              </div>
              <span className="text-slate-400 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                4.9 · 142 reseñas
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-bold text-4xl text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                $129.00
              </span>
              <span className="text-slate-500 text-xl line-through">$169.00</span>
              <span
                className="text-xs font-bold px-2 py-1 rounded-lg"
                style={{ background: 'rgba(193,43,77,0.12)', color: '#fb7185' }}
              >
                −24%
              </span>
            </div>

            {/* Color + Quantity row */}
            <div className="flex items-end gap-6 mb-8">
              {/* Color */}
              <div>
                <p className="text-slate-400 text-sm mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Color:{' '}
                  <span className="text-white font-medium">{activeVariant.label}</span>
                </p>
                <div className="flex gap-3">
                  {COLOR_VARIANTS.map((v) => {
                    const isSelected = v.id === selectedColor;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        title={v.label}
                        onClick={() => { setSelectedColor(v.id); setActiveImage(0); }}
                        className="w-8 h-8 rounded-full transition-transform duration-200 focus:outline-none"
                        style={{
                          background: v.bgColor,
                          border: `2px solid ${isSelected ? v.ringColor : 'transparent'}`,
                          transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                          boxShadow: isSelected
                            ? `0 0 0 2px rgba(255,255,255,0.12), 0 0 14px ${v.ringColor}60`
                            : 'none',
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="self-stretch w-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

              {/* Quantity */}
              <div>
                <p className="text-slate-400 text-sm mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Cantidad
                </p>
                <div
                  className="inline-flex items-center rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,0.09)' }}
                >
                  <button
                    type="button"
                    onClick={dec}
                    className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    <Minus size={13} />
                  </button>
                  <span
                    className="w-12 text-center font-bold text-white text-base"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={inc}
                    className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Value bullets */}
            <div
              className="flex flex-col gap-2.5 mb-8 p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {VALUE_BULLETS.map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(36,116,213,0.15)' }}
                  >
                    <Check size={10} className="text-blue-400" />
                  </div>
                  <span
                    className="text-slate-300 text-sm leading-relaxed"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Add to cart → checkout */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base text-white mb-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                boxShadow: '0 6px 30px rgba(144,68,235,0.38)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <ShoppingCart size={19} />
              AÑADIR AL CARRITO - ${(129 * quantity).toFixed(2)} USD
            </button>

            {/* Express payment */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="text-slate-600 text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  o paga rápido con
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { label: 'Apple Pay', method: 'Apple Pay' },
                    { label: 'PayPal', method: 'PayPal' },
                    { label: 'VISA/Mastercard', method: 'Credit Card' },
                  ] as const
                ).map(({ label, method }) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => handleExpressPayment(method)}
                    className="py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-all duration-200 hover:bg-white/5 focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div
              className="flex flex-wrap gap-5 mt-6 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              {TRUST_BADGES.map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-xs text-slate-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <Icon size={12} className="text-slate-600" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky buy bar — sits above the bottom nav (bottom-16 = 64px) */}
      <div
        className="fixed left-0 right-0 z-40 px-4 py-3 md:hidden"
        style={{
          bottom: '64px',
          background: 'rgba(5,7,15,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <span
              className="font-bold text-white text-lg"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              ${(129 * quantity).toFixed(2)}
            </span>
            <span
              className="text-slate-500 text-xs ml-2 line-through"
            >
              ${(169 * quantity).toFixed(2)}
            </span>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded"
            style={{ background: 'rgba(193,43,77,0.15)', color: '#fb7185' }}
          >
            −24%
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 active:scale-[0.98] focus:outline-none"
          style={{
            background: 'linear-gradient(135deg, #2474D5, #9044EB)',
            boxShadow: '0 4px 20px rgba(144,68,235,0.4)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          <ShoppingCart size={16} />
          Añadir al Carrito
        </button>
      </div>
    </section>
  );
}
