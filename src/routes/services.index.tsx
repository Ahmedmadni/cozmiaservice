import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { IconBadge } from "@/components/IconBadge";
import { ServicePlate } from "@/components/ServicePlate";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { services, serviceProcess } from "@/data/services";
import { professionalDisclaimer, site } from "@/data/site";

const title = `الخدمات | ${site.name}`;
const description =
  "ستة مجالات خدمات مترابطة: الهوية والتصميم، المواقع والمتاجر، التسويق والحضور الرقمي، البرامج والأنظمة، دعم التنظيم والتشغيل، والكفاءات ودعم الفرق.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="الخدمات"
        title="حلول متكاملة… صُممت حول احتياجات مشروعك"
        description="سواء كنت تبدأ فكرة جديدة أو تدير مشروعًا قائمًا أو تستعد للتوسع، نساعدك على تحديد الأولويات والوصول إلى الحلول المناسبة."
      />

      <section className="border-b border-border bg-surface">
        <div className="container-page py-8">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium transition-colors hover:border-accent hover:text-accent sm:text-sm"
                >
                  <s.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {services.map((service, i) => {
        const flipped = i % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-24 ${i % 2 === 1 ? "border-y border-border bg-surface" : ""}`}
          >
            <div className="container-page py-20 lg:py-28">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={flipped ? "lg:order-2" : ""}>
                  <ServicePlate service={service} index={i} />
                </Reveal>

                <div className={flipped ? "lg:order-1" : undefined}>
                  <IconBadge icon={service.icon} size="lg" tone="solid" />
                  <h2 className="mt-5 font-display text-2xl font-semibold text-balance-ar sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-7">
                        <Check className="mt-1.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 panel p-5">
                    <h3 className="text-sm font-semibold">أبرز ما ستحصل عليه</h3>
                    <ul className="mt-3 space-y-2">
                      {service.outcomes.slice(0, 3).map((o) => (
                        <li key={o} className="flex gap-2 text-sm leading-7 text-muted-foreground">
                          <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span className="min-w-0">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="mt-7">
                    <Link to="/services/$slug" params={{ slug: service.slug }}>
                      استكشف الخدمة
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="container-page py-20 lg:py-28">
        <SectionHeader eyebrow="كيف نعمل؟" title="خمس خطوات واضحة من الاحتياج إلى النتيجة" />
        <ol className="mt-14 grid gap-6 md:grid-cols-5">
          {serviceProcess.map((step, i) => (
            <Reveal key={step.title} delay={i * 70} as="li" className="h-full panel p-5">
              <div className="contents">
                <span className="glass-strong glass-edge grid h-9 w-9 place-items-center rounded-full font-display text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-12 panel bg-surface p-5 text-xs leading-7 text-muted-foreground">
          {professionalDisclaimer}
        </p>
      </section>

      <CTASection
        title="لست متأكدًا من الخدمة المناسبة؟"
        description="ابدأ بتقييم سريع لمشروعك، وسنرشّح لك الخدمات الأنسب لمرحلتك الحالية."
        primaryLabel="ابدأ تقييم مشروعك"
        primaryTo="/assessment"
        secondaryLabel="تحدث مع فريقنا"
        secondaryTo="/contact"
      />
    </>
  );
}
