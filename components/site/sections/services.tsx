import Image from "next/image";
import {
  Syringe,
  HeartPulse,
  Stethoscope,
  Scissors,
  Bone,
  ScanLine,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { services } from "@/lib/site-data";

const icons: Record<string, LucideIcon> = {
  syringe: Syringe,
  heartPulse: HeartPulse,
  stethoscope: Stethoscope,
  scissors: Scissors,
  tooth: Bone,
  scan: ScanLine,
};

export function Services() {
  return (
    <section id="services" className="bg-muted/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              진료 안내
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              아이의 모든 순간을 위한 진료
            </h2>
            <p className="mt-4 text-muted-foreground">
              예방부터 치료, 노령 케어까지. 생애주기에 맞춰 꼭 필요한 진료를
              제공합니다.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon] ?? Stethoscope;
            return (
              <Reveal
                key={s.title}
                as="article"
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="group relative overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-2xl bg-background/95 text-primary shadow-md backdrop-blur">
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
