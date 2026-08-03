import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { site, professionalDisclaimer } from "@/data/site";
import { solutionCategories, stages } from "@/data/solutions";

const title = `الحلول والخدمات | ${site.name}`;
const description =
  "أربع مجموعات من الحلول: حلول الشركات الناشئة، الحلول الرقمية، حلول التسويق والنمو، ودعم التنظيم والتشغيل.";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/solutions" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="الحلول والخدمات"
        title="حلول متكاملة تُختار حسب مرحلة مشروعك"
        description={description}
      />

      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {solutionCategories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 70}>
              <Link
                to="/solutions/$slug"
                params={{ slug: cat.slug }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_22px_50px_-32px_var(--primary)]"
              >
                <h2 className="text-xl font-bold">{cat.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{cat.short}</p>
                <ul className="mt-5 space-y-2">
                  {cat.groups[0]?.items.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-7 text-muted-foreground">
                      <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-primary transition-transform group-hover:-translate-x-1">
                  تفاصيل الحلول
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-page py-16 lg:py-24">
          <SectionHeader
            eyebrow="مراحل النمو"
            title="كل حل يرتبط بمرحلة واضحة من رحلة مشروعك"
            description="ابدأ ← نظّم ← انطلق ← نمُ. اختر المرحلة التي تصف وضعك الحالي."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {stages.map((s) => (
              <Link
                key={s.slug}
                to="/growth-stages"
                hash={s.slug}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {s.title} — {s.headline}
              </Link>
            ))}
          </div>
          <p className="mt-10 rounded-xl border border-border bg-card p-5 text-xs leading-7 text-muted-foreground">
            {professionalDisclaimer}
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
