import { useInView } from '../hooks/useInView';

type Review = {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  initials: string;
  avatarGradient: string;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Valentina Andrade',
    role: 'Consultora de Marketing · Viajera frecuente',
    location: 'Ciudad de México, MX',
    rating: 5,
    comment:
      'LUMY transformó por completo mis viajes de negocios. Llego a cualquier ciudad nueva y en segundos proyecto un mapa holográfico en la mesa de reuniones. Imposible impresionar más a un cliente.',
    initials: 'VA',
    avatarGradient: 'linear-gradient(135deg, #9044EB, #2474D5)',
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    role: 'Fotógrafo de Viajes · Creador de Contenido',
    location: 'Bogotá, CO',
    rating: 5,
    comment:
      'Lo usé durante 6 semanas en el sudeste asiático. En zonas sin señal, LUMY seguía funcionando perfecto gracias a la conectividad satelital. Una locura de tecnología en un cubo tan pequeño.',
    initials: 'CM',
    avatarGradient: 'linear-gradient(135deg, #2474D5, #9044EB)',
  },
  {
    id: 3,
    name: 'Sofía Reyes',
    role: 'Directora de Producto · Tech',
    location: 'Buenos Aires, AR',
    rating: 5,
    comment:
      'Como especialista en tecnología, puedo decir que LUMY es genuinamente innovador. Proyección nítida, asistente IA rápido y muy natural. La calidad del hardware justifica cada peso invertido.',
    initials: 'SR',
    avatarGradient: 'linear-gradient(135deg, #C12B4D, #9044EB)',
  },
  {
    id: 4,
    name: 'Miguel Torres',
    role: 'Guía de Turismo Aventura',
    location: 'Cusco, PE',
    rating: 5,
    comment:
      'Mis grupos quedan boquiabiertos cuando proyecto el mapa de Machu Picchu holográfico en plena naturaleza. LUMY es ahora mi herramienta de trabajo más poderosa y diferenciadora.',
    initials: 'MT',
    avatarGradient: 'linear-gradient(135deg, #9044EB, #C12B4D)',
  },
  {
    id: 5,
    name: 'Ana Jiménez',
    role: 'Nómada Digital · 40 países visitados',
    location: 'Barcelona, ES',
    rating: 5,
    comment:
      'Sin suscripciones, sin anuncios. Solo funciona. En Tokio me ayudó a traducir menús en tiempo real con holograma. Ahora no viajo sin él. El estuche protector es excelente.',
    initials: 'AJ',
    avatarGradient: 'linear-gradient(135deg, #2474D5, #C12B4D)',
  },
  {
    id: 6,
    name: 'Diego Ramírez',
    role: 'Emprendedor · Startup de IA',
    location: 'Santiago, CL',
    rating: 5,
    comment:
      'La integración de IA es impresionante. Le pido recomendaciones de restaurantes, hoteles y actividades. Todo en proyección holográfica. Es como tener un asistente personal en tu bolsillo.',
    initials: 'DR',
    avatarGradient: 'linear-gradient(135deg, #C12B4D, #2474D5)',
  },
];

export default function Reviews() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-28 lg:py-44">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="inline-block text-xs font-mono tracking-widest text-slate-500 mb-5 uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Testimonios
          </div>
          <h2
            className="font-bold text-3xl lg:text-5xl text-white mb-4"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Lo que dicen los{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              viajeros
            </span>
          </h2>
          <p
            className="text-slate-500 text-base"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            +2,400 unidades en 38 países · 98% de satisfacción verificada
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              className={`flex flex-col gap-5 p-6 rounded-2xl transition-all duration-500 hover:-translate-y-0.5 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* Comment */}
              <p
                className="text-slate-300 text-sm leading-relaxed flex-1"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                "{review.comment}"
              </p>

              {/* Author */}
              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: review.avatarGradient, fontFamily: 'Sora, sans-serif' }}
                >
                  {review.initials}
                </div>
                <div>
                  <div
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {review.name}
                  </div>
                  <div
                    className="text-slate-500 text-xs"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {review.role}
                  </div>
                  <div
                    className="text-slate-600 text-xs"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
