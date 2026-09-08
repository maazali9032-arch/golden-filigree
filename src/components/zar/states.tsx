import { FiligreeArch, FiligreeDivider, FiligreeFrame } from "./filigree";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="zar-page flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <FiligreeArch className="mx-auto max-w-[260px] opacity-80" />
        <FiligreeFrame delay={0.3}>{children}</FiligreeFrame>
      </div>
    </main>
  );
}

export function LoadingState() {
  return (
    <main className="zar-page flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <FiligreeDivider className="mx-auto" />
        <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.32em] text-gold-deep/70">
          Forging the invitation
        </p>
      </div>
    </main>
  );
}

export function NotFoundState() {
  return (
    <Shell>
      <h1 className="font-display text-2xl uppercase tracking-[0.24em] text-ink">Not found</h1>
      <FiligreeDivider delay={0.6} className="mx-auto my-5" />
      <p className="font-display text-base italic leading-relaxed text-ink-soft">
        This invitation link doesn&apos;t exist, or is no longer available. Please check the link
        shared with you.
      </p>
    </Shell>
  );
}

export function FallbackState() {
  return (
    <Shell>
      <h1 className="font-display text-2xl uppercase tracking-[0.22em] text-ink">Invitation</h1>
      <FiligreeDivider delay={0.6} className="mx-auto my-5" />
      <p className="font-display text-base italic leading-relaxed text-ink-soft">
        This invitation is not currently available.
      </p>
    </Shell>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Shell>
      <h1 className="font-display text-2xl uppercase tracking-[0.2em] text-ink">Unavailable</h1>
      <FiligreeDivider delay={0.6} className="mx-auto my-5" />
      <p className="font-display text-base italic leading-relaxed text-ink-soft">
        We couldn&apos;t load this invitation just now.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="zar-plaque mt-6 rounded-sm border border-gold/45 px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.26em] text-gold-deep"
      >
        Try again
      </button>
    </Shell>
  );
}
