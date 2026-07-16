import Image from "next/image";
import { Play } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { gallery, img } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Facility() {
  return (
    <section id="facility" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              시설 안내
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              아이가 편안한 공간
            </h2>
            <p className="mt-4 text-muted-foreground">
              청결하고 아늑한 진료 환경, 스트레스를 줄이는 동선으로 설계했습니다.
            </p>
          </Reveal>
        </div>

        {/* Video tour */}
        <Reveal className="mt-16">
          <div className="group relative aspect-video w-full overflow-hidden rounded-[2rem] shadow-xl">
            {/*
              병원 소개 영상 파일을 public/videos/clinic-tour.mp4 로 넣으면
              자동으로 재생 버튼이 동작합니다. (poster 는 대표 이미지)
            */}
            <video
              className="h-full w-full object-cover"
              poster={img("photo-1628009368231-7bb7cfcb0def", 1600)}
              controls
              preload="none"
              playsInline
            >
              <source src="/videos/clinic-tour.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 transition-opacity duration-300 group-hover:opacity-0">
              <span className="flex size-20 items-center justify-center rounded-full bg-background/95 text-primary shadow-lg">
                <Play className="ml-1 size-8 fill-current" />
              </span>
              <span className="rounded-full bg-background/90 px-4 py-1.5 text-sm font-semibold">
                병원 둘러보기 영상
              </span>
            </div>
          </div>
        </Reveal>

        {/* Bento gallery */}
        <div className="mt-6 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal
              key={g.src}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className={cn(
                "group relative overflow-hidden rounded-2xl shadow-sm",
                g.span && "row-span-2"
              )}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
