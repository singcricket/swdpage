import {
  MessageCircleHeart,
  ShieldCheck,
  PawPrint,
  CalendarHeart,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { promises } from "@/lib/site-data";

const icons: Record<string, LucideIcon> = {
  messageHeart: MessageCircleHeart,
  shieldCheck: ShieldCheck,
  pawPrint: PawPrint,
  calendarHeart: CalendarHeart,
};

export function Why() {
  return (
    <section id="why" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              신원당의 약속
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              왜 신원당동물병원일까요?
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => {
            const Icon = icons[p.icon] ?? PawPrint;
            return (
              <Reveal
                key={p.title}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="group rounded-3xl border border-border bg-background p-7 transition-colors hover:border-primary/40 hover:bg-accent/40"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Testimonial / philosophy band */}
        <Reveal className="mt-20">
          <figure className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-[color:var(--brand-2)] px-8 py-16 text-center text-primary-foreground shadow-xl md:px-16 md:py-20">
            <Quote className="mx-auto size-10 opacity-70" />
            <blockquote className="mx-auto mt-6 max-w-3xl text-2xl font-bold leading-relaxed md:text-3xl">
              &ldquo;좋은 치료 결과도 중요하지만,
              <br className="hidden sm:block" />
              치료 과정에서의 &lsquo;마음&rsquo;도 그만큼 중요합니다.&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm font-medium opacity-90">
              — 신원당동물병원 의료진 일동
            </figcaption>
            {/* decorative circles */}
            <div className="animate-float pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
            <div className="animate-blob pointer-events-none absolute -bottom-12 -left-12 size-48 bg-white/10" />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
