import type { PropsWithChildren, ReactNode } from "react";

type SectionProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  intro: string;
  aside?: ReactNode;
  id: string;
}>;

export function Section({ eyebrow, title, intro, aside, id, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-32 grid gap-8 rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-soft backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.28em] text-ocean">{eyebrow}</p>
        <h2 className="font-display text-3xl text-slate-900 md:text-4xl">{title}</h2>
        {intro ? <p className="max-w-2xl text-base leading-7 text-slate-700">{intro}</p> : null}
      </div>
      {aside ?? <div />}
      <div className="md:col-span-2">{children}</div>
    </section>
  );
}
