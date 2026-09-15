export function GoldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/50 text-gold">
      {children}
    </span>
  );
}

export function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-12">
      {kicker ? (
        <p className="mb-3 font-display text-xs uppercase tracking-[0.35em] text-gold">{kicker}</p>
      ) : null}
      <h2 className="max-w-3xl text-3xl uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="mt-5 h-px w-24 bg-gold" />
    </div>
  );
}
