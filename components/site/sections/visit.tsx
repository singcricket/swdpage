import { Clock, MapPin, Phone, Navigation, Bell, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { clinic, notices } from "@/lib/site-data";

const mapSearch = `https://map.naver.com/v5/search/${encodeURIComponent(
  clinic.address
)}`;

export function Visit() {
  return (
    <section id="visit" className="bg-muted/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              오시는 길 · 진료시간
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              언제든 편하게 찾아오세요
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Hours + contact */}
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <Clock className="size-5 text-primary" /> 진료 시간
              </h3>
              <dl className="mt-5 divide-y divide-border">
                {clinic.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <dt className="font-medium text-muted-foreground">{h.day}</dt>
                    <dd className="text-right font-semibold">
                      {h.time}
                      {h.note && (
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {h.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                <Phone className="size-6 text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">전화 예약·상담</p>
                <a
                  href={clinic.phoneHref}
                  className="mt-1 block text-xl font-black tracking-tight hover:text-primary"
                >
                  {clinic.phone}
                </a>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                <MapPin className="size-6 text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">오시는 길</p>
                <p className="mt-1 text-sm font-semibold leading-snug">
                  {clinic.address}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Map + notices */}
          <Reveal delay={1} className="flex flex-col gap-6">
            {/* Map placeholder */}
            <a
              href={mapSearch}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-h-[220px] flex-1 items-center justify-center overflow-hidden rounded-3xl border border-border bg-[color:var(--brand-soft)] shadow-sm"
            >
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.05) 0 12px, transparent 13px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.05) 0 12px, transparent 13px)",
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="relative flex flex-col items-center gap-3 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Navigation className="size-6" />
                </span>
                <span className="text-sm font-semibold">
                  지도에서 위치 확인하기
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  네이버 지도로 열기 <ChevronRight className="size-3" />
                </span>
              </div>
            </a>

            {/* Notices */}
            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-base font-bold">
                  <Bell className="size-5 text-primary" /> 공지사항
                </h3>
                <Button variant="ghost" size="xs" className="text-muted-foreground">
                  더보기 <ChevronRight className="size-3" />
                </Button>
              </div>
              <ul className="mt-3 divide-y divide-border">
                {notices.map((n) => (
                  <li key={n.title}>
                    <a
                      href="#"
                      className="flex items-center gap-3 py-3 text-sm transition-colors hover:text-primary"
                    >
                      <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                        {n.tag}
                      </span>
                      <span className="line-clamp-1 flex-1 font-medium">
                        {n.title}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {n.date}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
