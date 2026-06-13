import { MessageCircle, Globe, AtSign, Send } from 'lucide-react';

type FooterLink = { label: string; href: string };
type FooterSection = { title: string; links: FooterLink[] };

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Características', href: '#caracteristicas' },
      { label: 'Hardware', href: '#hardware' },
      { label: 'Especificaciones', href: '#' },
      { label: 'Comparar', href: '#' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Centro de Ayuda', href: '#' },
      { label: 'Garantía', href: '#' },
      { label: 'Reparaciones', href: '#' },
      { label: 'Contacto', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: '#' },
      { label: 'Términos y Condiciones', href: '#' },
      { label: 'Devoluciones', href: '#' },
      { label: 'Política de Envíos', href: '#' },
    ],
  },
];

function scrollTo(href: string) {
  if (href !== '#') {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}

function LumyLogo() {
  return (
    <span
      style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.18em',
        fontSize: '1.5rem',
        color: '#fff',
      }}
    >
      L
      <span
        style={{
          background: 'linear-gradient(135deg, #2474D5, #9044EB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        U
      </span>
      M
      <span
        style={{
          background: 'linear-gradient(135deg, #9044EB, #C12B4D)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Y
      </span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer
      id="soporte"
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <LumyLogo />
            <p
              className="text-slate-500 text-sm leading-relaxed mt-4 mb-7 max-w-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              El primer navegador holográfico portátil impulsado por IA. Diseñado
              para los viajeros del futuro.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {(
                [
                  { Icon: MessageCircle, label: 'WhatsApp' },
                  { Icon: AtSign, label: 'Instagram' },
                  { Icon: Send, label: 'X (Twitter)' },
                  { Icon: Globe, label: 'Sitio Web' },
                ] as const
              ).map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => console.log(`Social: ${label}`)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white transition-all duration-200 hover:scale-110 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3
                className="text-white font-semibold text-xs tracking-widest uppercase mb-5"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="text-slate-500 hover:text-slate-200 text-sm transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div
          className="p-6 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div>
            <div
              className="font-semibold text-white text-sm mb-1"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              ¿Necesitas ayuda?
            </div>
            <div
              className="text-slate-500 text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Soporte por WhatsApp y Sitio Web. Garantía de respuesta en menos de{' '}
              <strong className="text-slate-400">24 horas hábiles.</strong>
            </div>
          </div>
          <button
            type="button"
            onClick={() => console.log('WhatsApp support')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, #2474D5, #9044EB)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <MessageCircle size={14} />
            Contactar por WhatsApp
          </button>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p
            className="text-slate-600 text-xs"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            © 2025 LUMY Technologies. Todos los derechos reservados.
          </p>
          <p
            className="text-slate-700 text-xs"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Diseñado para los viajeros del futuro · Fabricado con ❤️ para el mundo
          </p>
        </div>
      </div>
    </footer>
  );
}
