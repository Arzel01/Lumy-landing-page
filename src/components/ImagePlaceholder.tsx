interface ImagePlaceholderProps {
  label: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function ImagePlaceholder({
  label,
  width = 'w-full',
  height = 'h-64',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${width} ${height} ${className} bg-slate-900 border border-slate-800/80 rounded-2xl flex flex-col items-center justify-center gap-3 p-5`}
    >
      <div className="w-10 h-10 rounded-xl border border-dashed border-slate-700 flex items-center justify-center flex-shrink-0">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-slate-600"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <p className="text-slate-600 text-xs text-center leading-relaxed max-w-[200px]">
        {label}
      </p>
    </div>
  );
}
