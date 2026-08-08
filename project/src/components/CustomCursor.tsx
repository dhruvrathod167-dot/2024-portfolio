import { useCustomCursor } from '@/hooks/useCustomCursor';

export function CustomCursor() {
  const { dotRef, ringRef, enabled, variant, label } = useCustomCursor();

  if (!enabled) return null;

  const ringSize =
    variant === 'view' || variant === 'copy' || variant === 'open' ? 84 : variant === 'hover' ? 56 : 36;
  const ringBg =
    variant === 'view' || variant === 'copy' || variant === 'open'
      ? 'rgba(99, 102, 241, 0.15)'
      : 'transparent';

  return (
    <>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-fg pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[100] rounded-full border border-fg/30 pointer-events-none flex items-center justify-center"
        style={{
          width: ringSize,
          height: ringSize,
          backgroundColor: ringBg,
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease',
          willChange: 'transform',
        }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg/90">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
