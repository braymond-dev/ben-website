import type { PropsWithChildren, ReactNode } from "react";

type SectionProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  intro: string;
  aside?: ReactNode;
  id: string;
  dark?: boolean;
}>;

export function Section({ eyebrow, title, intro, aside, id, children, dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-32 grid gap-5 rounded-[1.6rem] p-5 shadow-soft backdrop-blur-xl md:gap-8 md:rounded-[2rem] md:p-8 md:grid-cols-[1.1fr_0.9fr] ${
        dark
          ? "border-white/10 bg-slate-950/45"
          : "border-white/60 bg-white/50"
      }`}
    >
      <div className="space-y-3 md:space-y-4">
        {eyebrow ? (
          <p className={`text-xs uppercase tracking-[0.28em] md:text-sm ${dark ? "text-sky-300" : "text-ocean"}`}>
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className={`font-display text-2xl md:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
        ) : null}
        {intro ? (
          <p className={`max-w-2xl text-base leading-7 ${dark ? "text-slate-300" : "text-slate-700"}`}>{intro}</p>
        ) : null}
      </div>
      {aside ?? <div className="hidden md:block" />}
      <div className="md:col-span-2">{children}</div>
    </section>
  );
}
