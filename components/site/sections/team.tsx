import { Reveal } from "@/components/site/reveal";
import { doctors } from "@/lib/site-data";

export function Team() {
  return (
    <section id="team" className="bg-muted/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              의료진 소개
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              마음까지 진료하는 사람들
            </h2>
            <p className="mt-4 text-muted-foreground">
              풍부한 임상 경험과 따뜻한 진심으로 아이를 돌봅니다.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
          {doctors.map((d, i) => (
            <Reveal
              key={d.name}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="group flex flex-col items-center rounded-3xl border border-border bg-background p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[color:var(--brand-2)] text-3xl font-black text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-105">
                {d.initial}
              </div>
              <h3 className="mt-5 text-lg font-bold">{d.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.role}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {d.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
