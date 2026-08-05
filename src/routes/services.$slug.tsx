import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { IconBadge } from "@/components/IconBadge";
import { ServicePlate } from "@/components/ServicePlate";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SpecialistSupportCTA } from "@/components/SpecialistSupportCTA";
import { Reveal } from "@/components/Reveal";
import { getService, services, serviceProcess } from "@/data/services";
import { professionalDisclaimer, site } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (!getService(params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const service = getService(params.slug);
    if (!service) {
      return { meta: [{ title: "الخدمة غير متوفرة" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${service.title} | ${site.name}`;
    return {
      meta: [
        { title: t },
        { name: "description", content: service.description },
        { property: "og:title", content: t },
        { property: "og:description", content: service.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/services/${service.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: t },
        { name: "twitter:description", content: service.description },
      ],
      links: [{ rel: "canonical", href: `/services/${service.slug}` }],
      scripts: service.faqs?.length
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: service.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServiceDetail,
});

function ServiceNotFound() {
  return (
    <section className="container-page py-24 text-center">
      <h1 className="font-display text-2xl font-semibold">الخدمة غير متوفرة</h1>
      <Button asChild className="mt-6">
        <Link to="/services">عرض جميع الخدمات</Link>
      </Button>
    </section>
  );
}

function ServiceDetail() {
  const { slug } = Route.useParams();
  const service = getService(slug)!;
  const serviceIndex = services.findIndex((s) => s.slug === service.slug);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent-soft blur-3xl"
        />
        <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              الخدمات
            </span>
            <h1 className="mt-5 text-3xl font-bold text-balance-ar sm:text-4xl lg:text-[3rem] lg:leading-[1.25]">
              {service.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">اطلب مناقشة احتياجك</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">عرض جميع الخدمات</Link>
              </Button>
            </div>
          </div>

          <div className="fade-up">
            <ServicePlate service={service} index={serviceIndex} />
          </div>
        </div>
      </section>

      <section className="container-page py-20 lg:py-28">
        <SectionHeader eyebrow="كيف نساعدك؟" title={`طريقتنا في ${service.title}`} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {service.help.map((h, i) => (
            <Reveal key={h.title} delay={i * 70}>
              <div className="h-full panel p-6">
                <IconBadge icon={service.icon} />
                <h3 className="mt-4 text-base font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{h.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <SectionHeader eyebrow="الخدمات الفرعية" title="ما الذي يشمله هذا المجال؟" />
            <ul className="mt-8 grid gap-3">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 panel rounded-xl p-4 text-sm leading-7"
                >
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="النتيجة" title="ماذا ستحصل عليه؟" />
            <ul className="mt-8 grid gap-3">
              {service.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-3 panel rounded-xl p-4 text-sm leading-7 text-muted-foreground"
                >
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-sand" />
                  <span className="min-w-0">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {service.slug === "accounting-operations" ? (
        <section className="container-page pt-16 lg:pt-24">
          <SpecialistSupportCTA serviceSlug={service.slug} />
        </section>
      ) : null}

      <section className="container-page py-20 lg:py-28">
        <SectionHeader eyebrow="كيف نعمل؟" title="مسار تنفيذ واضح من البداية للنتيجة" />
        <ol className="mt-14 grid gap-6 md:grid-cols-5">
          {serviceProcess.map((step, i) => (
            <Reveal key={step.title} delay={i * 70} as="li" className="relative h-full md:pt-8">
              <div className="contents">
                <span
                  aria-hidden
                  className="absolute right-0 top-3 hidden h-px w-full bg-border md:block"
                />
                <span className="glass-strong glass-edge relative z-10 grid h-9 w-9 place-items-center rounded-full font-display text-xs font-semibold text-primary md:absolute md:-top-1.5 md:right-0">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold md:mt-2">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <SectionHeader eyebrow="الأسئلة الشائعة" title="أسئلة يتكرر طرحها حول هذه الخدمة" />
          <FAQAccordion items={service.faqs} />
        </div>
      </section>

      <section className="container-page py-20 lg:py-28">
        <SectionHeader eyebrow="خدمات ذات صلة" title="قد تحتاج أيضًا إلى" />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/services/$slug"
              params={{ slug: o.slug }}
              className="group panel p-5 transition-colors hover:border-accent/60"
            >
              <IconBadge icon={o.icon} />
              <h3 className="mt-4 text-sm font-semibold">{o.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{o.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-balance-ar sm:text-3xl">
              هل هذه الخدمة مناسبة لمشروعك؟
            </h2>
            <p className="mt-4 text-base leading-8 text-primary-foreground/80">
              أخبرنا عن وضعك الحالي، وسنوضح لك ما إذا كانت هذه الخدمة هي الخطوة الصحيحة الآن.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">
                  تحدث معنا
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/assessment">ابدأ تقييم مشروعك</Link>
              </Button>
            </div>
            <p className="mt-8 max-w-2xl text-xs leading-7 text-primary-foreground/60">
              {professionalDisclaimer}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
