import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clinic, img } from "@/lib/site-data";

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src={img("photo-1477884213360-7e9d7dcc1e48", 1800)}
          alt="넓은 들판을 뛰노는 반려견"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-[color:var(--brand-2)]/90" />
      </div>

      <Reveal className="mx-auto max-w-3xl px-4 text-center text-primary-foreground md:px-6">
        <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
          우리 아이, 오늘 컨디션은 어떤가요?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed opacity-90 md:text-lg">
          작은 변화도 편하게 상담하세요. 신원당동물병원이 늘 곁에 있겠습니다.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={clinic.phoneHref}
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "gap-2 text-base"
            )}
          >
            <Phone className="size-4" />
            {clinic.phone}
          </a>
          <a
            href="#visit"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "gap-2 border-white/40 bg-white/10 text-base text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
            )}
          >
            <MapPin className="size-4" />
            오시는 길
          </a>
        </div>
      </Reveal>
    </section>
  );
}
