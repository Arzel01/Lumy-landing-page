export default function AnnouncementBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-10 hidden md:flex items-center justify-center px-4"
      style={{
        background: 'rgba(5,7,15,0.97)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <p className="text-xs text-slate-400 tracking-wide text-center">
        📦{' '}
        <span className="text-slate-300">
          Envíos globales express disponibles.
        </span>{' '}
        Compra hoy y recibe en{' '}
        <span className="font-semibold" style={{ color: '#2474D5' }}>
          3-7 días hábiles.
        </span>
      </p>
    </div>
  );
}
