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
      className={`${width} ${height} ${className} rounded-2xl`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    />
  );
}
