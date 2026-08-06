import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PointerGlow } from "@/components/motion";
import type { Service } from "@/data/services";

/**
 * بطاقة خدمة.
 *
 * معالجة الصورة: تُعرض بألوانها ووضوحها الكاملين. تدرّج خفيف أسفل
 * الصورة فقط يؤمّن تباين الرقم والأيقونة، دون تعتيم الصورة كلها.
 */
export function ServiceGridCard({ service, index }: { service: Service; index?: number }) {
  const Icon = service.icon;

  return (
    <PointerGlow className="h-full rounded-3xl">
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="group glass glass-edge flex h-full flex-col overflow-hidden rounded-3xl card-hover"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-primary">
          <img
            src={service.image}
            alt={service.imageAlt}
            width={1200}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover saturate-[0.92] transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/50 via-primary/20 to-transparent"
          />
          {typeof index === "number" ? (
            <span
              className="absolute bottom-4 left-4 font-display text-3xl font-semibold text-white/22"
              data-num
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-xl bg-card/92 text-primary shadow-sm backdrop-blur">
            <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-display text-lg font-semibold">{service.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-[1.75] text-muted-foreground">
            {service.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {service.items.slice(0, 3).map((item) => (
              <li
                key={item}
                className="rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
          <span className="link-sweep mt-auto inline-flex items-center gap-2 self-start pt-7 text-sm font-medium text-primary">
            استكشف الخدمة
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </PointerGlow>
  );
}
