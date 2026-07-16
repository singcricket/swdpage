import Link from "next/link";
import { PawPrint, Phone, MapPin, Clock, Mail } from "lucide-react";
import { clinic, nav } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <PawPrint className="size-5" />
              </span>
              <span className="text-lg font-extrabold">{clinic.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              보호자와 반려동물의 마음까지 살피는 동네 주치의.
              <br />
              {clinic.slogan}
            </p>
            <div className="mt-5 flex gap-2">
              {["Instagram", "YouTube", "블로그"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold">바로가기</h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold">진료 안내</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={clinic.phoneHref} className="hover:text-foreground">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{clinic.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  평일 09:30–20:00 · 토 09:30–17:00
                  <br />
                  일·공휴일 10:00–14:00
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`mailto:${clinic.email}`} className="hover:text-foreground">
                  {clinic.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {2026} {clinic.name}. All rights reserved.
          </p>
          <p>사업자등록번호 000-00-00000 · 대표 김O수</p>
        </div>
      </div>
    </footer>
  );
}
