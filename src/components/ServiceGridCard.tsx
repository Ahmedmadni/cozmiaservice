import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PointerGlow } from "@/components/motion";
import type { Service } from "@/data/services";

/**
 * بطاقة خدمة.
 *
 * معالجة الصورة: تُعرض كلوحة ثنائية اللون (mix-blend-luminosity فوق
 * تدرّج الهوية) بدل عرضها كرسم توضيحي صريح — فتقرأ كنسيج بصري
 * منسجم مع الهوية، ويعود لونها الكامل عند التحويم فقط.
 */
export function ServiceGridCard({ service, index }: { service: Service; index?: number }) {
  const Icon = service.icon;

  return (
    <PointerGlow className="h-full rounded-3xl">
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="group glass glass-edge flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-1.5"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-primary">
          <img
            src={service.image}
            alt={service.imageAlt}
            width={1200}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover opacity-70 mix-blend-luminosity transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:mix-blend-normal"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent transition-opacity duration-700 group-hover:opacity-40"
          />
          {typeof index === "number" ? (
            <span
              className="absolute bottom-3 left-4 font-display text-3xl font-semibold text-white/35"
              data-num
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          <span className="absolute bottom-3 right-4 grid h-11 w-11 place-items-center rounded-2xl bg-card/90 text-primary shadow-sm backdrop-blur">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-semibold">{service.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {service.items.slice(0, 3).map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
          <span className="link-sweep mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-medium text-primary">
            استكشف الخدمة
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </PointerGlow>
  );
}
