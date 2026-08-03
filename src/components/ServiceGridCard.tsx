import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceGridCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_26px_60px_-38px_var(--primary)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={service.image}
          alt={service.imageAlt}
          width={1200}
          height={900}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {service.items.slice(0, 3).map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-primary transition-transform group-hover:-translate-x-1">
          استكشف الخدمة
          <ArrowLeft className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
