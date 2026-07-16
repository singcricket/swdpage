import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { clinic, img, stats } from "@/lib/site-data";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Image collage */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src={img("photo-1587300003388-59208cc962cb", 1000)}
              alt="반려동물을 안고 있는 수의사"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          {/* Floating stat card */}
          <div className="animate-float absolute -bottom-6 -right-2 w-52 rounded-2xl border border-border bg-background/90 p-5 shadow-lg backdrop-blur sm:right-6">
            <p className="text-3xl font-black text-primary">15년+</p>
            <p className="mt-1 text-sm text-muted-foreground">
              한 자리에서 이어온 지역 진료
            </p>
          </div>
          {/* Decorative blob */}
          <div className="animate-blob absolute -left-8 -top-8 -z-10 size-40 bg-[color:var(--brand-soft)]" />
        </Reveal>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              About {clinic.name}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight md:text-4xl">
              동네에서 가장 가깝고
              <br />
              가장 믿음직한 병원
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {clinic.name}은 우리 동네 반려동물과 보호자를 위한 1차 진료
              동물병원입니다. 아이가 아플 때 가장 먼저 떠오르는 곳, 사소한
              궁금증도 편하게 물어볼 수 있는 곳이 되고자 합니다. 정확한 진단과
              정직한 진료, 그리고 따뜻한 마음으로 아이의 평생 건강을 함께
              돌보겠습니다.
            </p>
          </Reveal>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <p className="text-3xl font-black tracking-tight md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
