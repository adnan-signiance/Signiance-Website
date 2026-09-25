// Shared inner markup for .btn-hero-primary / .btn-hero-outline so every
// button using either class gets the exact same arrow-in/arrow-out hover
// choreography already established by the nav CTA (.btn-primary), instead of
// each call site inventing its own animation.
export default function CtaArrow({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="btn-primary-arrow-in">
        <svg width="8" height="10" viewBox="0 0 10 12" fill="none" aria-hidden="true">
          <path d="M3 2.5 7 6 3 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="btn-primary-label">{children}</span>
      <span className="btn-primary-arrow-out">
        <svg width="8" height="10" viewBox="0 0 10 12" fill="none" aria-hidden="true">
          <path d="M3 2.5 7 6 3 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );
}
