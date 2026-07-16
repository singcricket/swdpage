import Image from "next/image";
import { Phone, MapPin, ArrowRight, PawPrint, Star, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clinic, img } from "@/lib/site-data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[color:var(--brand-soft)] via-background to-background"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -left-24 top-10 size-72 bg-primary/10" />
        <div className="animate-blob absolute right-10 top-40 size-80 bg-[color:var(--brand-2)]/10 [animation-delay:3s]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-28 pb-20 md:px-6 md:pt-32 lg:grid-cols-2 lg:gap-8 lg:pt-36 lg:pb-28">
        {/* Copy */}
        <div className="max-w-xl">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <PawPrint className="size-4" />
            {clinic.name} · 고양시 덕양구
          </span>

          <h1 className="animate-fade-up delay-1 mt-6 text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl xl:text-6xl">
            우리 아이의
            <br />
            <span className="text-gradient">평생 주치의</span>가
            <br />
            되어드릴게요
          </h1>

          <p className="animate-fade-up delay-2 mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            치료 결과만큼 치료 과정의 &lsquo;마음&rsquo;도 소중하니까요.
            <br className="hidden sm:block" />
            보호자와 반려동물의 마음까지 살피는 정성 진료를 약속합니다.
          </p>

          <div className="animate-fade-up delay-3 mt-9 flex flex-wrap gap-3">
            <a
              href={clinic.phoneHref}
              className={cn(buttonVariants({ size: "lg" }), "gap-2 text-base")}
            >
              <Phone className="size-4" />
              전화 예약 · 상담
            </a>
            <a
              href="#visit"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "gap-2 text-base"
              )}
            >
              <MapPin className="size-4" />
              오시는 길
              <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="animate-fade-up delay-4 mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-[color:var(--brand-warm)] text-[color:var(--brand-warm)]"
                  />
                ))}
              </span>
              보호자 만족도 4.9 / 5.0
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span>연중무휴 진료 · 편안한 주차</span>
          </div>
        </div>

        {/* Image */}
        <div className="animate-fade-up delay-2 relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-black/5">
            <Image
              src={img("photo-1559190394-df5a28aab5c5", 1400)}
              alt="차창 밖으로 얼굴을 내민 행복한 강아지"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="animate-kenburns object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </div>

          {/* Floating hours card */}
          <div className="animate-float absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-border bg-background/95 px-5 py-4 shadow-lg backdrop-blur sm:-left-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">오늘 진료</p>
              <p className="text-sm font-bold">09:30 – 20:00</p>
            </div>
          </div>

          {/* Floating paw badge */}
          <div className="animate-float absolute -right-3 -top-3 flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg [animation-delay:1.5s] sm:-right-5">
            <PawPrint className="size-7" />
          </div>
        </div>
      </div>
    </section>
  );
}
