import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Rise, RiseGroup, RiseItem } from "@/components/motion";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * تكوين تحريري للخدمات:
 * خدمة قائدة بعرض أفقي واسع، ثم خدمتان بصورتين، ثم بقية الخدمات
 * كقائمة نصية مقسّمة بخطوط رفيعة — بدل شبكة بطاقات متطابقة.
 */

export function FeaturedService({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Rise className="group relative">
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-shadow duration-500 hover:shadow-[var(--shadow-card)] lg:grid-cols-12"
      >
        <div className="relative overflow-hidden lg:col-span-7">
          <div className="aspect-[16/10] h-full w-full lg:aspect-auto lg:min-h-[26rem]">
            <img
              src={service.image}
              alt={service.imageAlt}
              width={1280}
              height={832}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.035]"
            />
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-primary/25"
          />
          <span className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-card/90 px-3.5 py-1.5 text-[11px] font-medium text-primary shadow-sm backdrop-blur">
            <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
            الخدمة الأبرز
          </span>
        </div>

        <div className="flex flex-col justify-center p-8 lg:col-span-5 lg:p-12">
          <h3 className="font-display text-2xl font-semibold leading-[1.3] text-balance-ar sm:text-3xl">
            {service.title}
          </h3>
          <p className="mt-5 text-base leading-[1.9] text-muted-foreground">
            {service.description}
          </p>

          <ul className="mt-7 space-y-3">
            {service.items.slice(0, 4).map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7">
                <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span className="min-w-0 text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <span className="link-sweep mt-9 inline-flex items-center gap-2 self-start text-sm font-medium text-primary">
            استكشف الخدمة
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </Rise>
  );
}

export function ServiceEditorialCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const Icon = service.icon;

  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-shadow duration-500 hover:shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={service.image}
          alt={service.imageAlt}
          width={1280}
          height={832}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.035]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/35 to-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col p-7 lg:p-8">
        <span className="inline-flex items-center gap-2 text-accent">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold">{service.title}</h3>
        <p className="mt-3 text-sm leading-[1.85] text-muted-foreground">{service.short}</p>
        <span className="link-sweep mt-auto inline-flex items-center gap-2 self-start pt-7 text-sm font-medium text-primary">
          استكشف الخدمة
          <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ServiceRow({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group flex min-h-[6.5rem] items-start gap-5 px-1 py-7 transition-colors duration-300 sm:px-2"
    >
      <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-border/70 bg-surface text-primary transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
        <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-display text-base font-semibold">{service.title}</span>
          <ArrowLeft className="h-4 w-4 shrink-0 text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 rtl:-translate-x-1" />
        </span>
        <span className="mt-2 block text-sm leading-[1.85] text-muted-foreground">
          {service.short}
        </span>
      </span>
    </Link>
  );
}

export function ServicesEditorial({ items }: { items: Service[] }) {
  const [featured, ...rest] = items;
  const spotlight = rest.slice(0, 2);
  const list = rest.slice(2);

  return (
    <div className="mt-14 space-y-6 lg:mt-16">
      {featured ? <FeaturedService service={featured} /> : null}

      {spotlight.length ? (
        <RiseGroup as="ul" className="grid gap-6 md:grid-cols-2" stagger={0.08}>
          {spotlight.map((service) => (
            <RiseItem as="li" key={service.slug} className="h-full">
              <ServiceEditorialCard service={service} />
            </RiseItem>
          ))}
        </RiseGroup>
      ) : null}

      {list.length ? (
        <Rise className="rounded-3xl border border-border/70 bg-surface/60 px-5 py-2 sm:px-8">
          <ul className="grid divide-y divide-border/70 md:grid-cols-2 md:gap-x-10 md:divide-y-0">
            {list.map((service, i) => (
              <li
                key={service.slug}
                className={cn(
                  "md:border-border/70",
                  i % 2 === 0 ? "md:border-l" : "",
                  i > 1 ? "md:border-t" : "",
                  "md:py-0",
                )}
              >
                <ServiceRow service={service} />
              </li>
            ))}
          </ul>
        </Rise>
      ) : null}
    </div>
  );
}
