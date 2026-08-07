import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import skyline from "@/assets/hero-skyline.webp";
import { site, professionalDisclaimer } from "@/data/site";

const title = `تواصل معنا | ${site.name}`;
const description = "احجز استشارة أولية أو أرسل تفاصيل مشروعك وسنعود إليك بخطوات واضحة.";

const searchSchema = z.object({
  summary: z.string().optional(),
  /** معرّف الخدمة التي جاء منها الزائر — تُختار مسبقًا في النموذج. */
  service: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { summary, service } = Route.useSearch();

  return (
    <>
      <PageHero
        eyebrow="تواصل معنا"
        title="لنبدأ بمحادثة قصيرة"
        description={description}
        image={skyline}
      />
      <section className="border-b border-border">
        <div className="container-page py-12 lg:py-16">
          <div className="relative grid grid-cols-3 gap-8 text-center sm:gap-12">
            <span
              aria-hidden
              className="absolute left-[17%] right-[17%] top-4 hidden h-px bg-border sm:block"
            />
            {[
              { n: "01", t: "أرسل تفاصيل مشروعك" },
              { n: "02", t: "نراجع احتياجاتك" },
              { n: "03", t: "نتواصل معك بخطوات واضحة" },
            ].map((step) => (
              <div key={step.n} className="relative">
                <span
                  className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background font-display text-sm font-semibold text-accent ring-1 ring-border"
                  data-num
                >
                  {step.n}
                </span>
                <p className="mt-4 text-xs leading-6 text-muted-foreground sm:text-sm">{step.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            {summary ? (
              <div className="rounded-xl border border-accent/40 bg-accent-soft p-4 text-xs leading-7 text-muted-foreground">
                <span className="font-semibold text-foreground">ملخص نتيجة مقياس الجاهزية: </span>
                {summary}
              </div>
            ) : null}

            <ServiceRequestForm
              initialServiceSlug={service ?? ""}
              {...(summary ? { assessmentSummary: summary } : {})}
            />
          </div>

          <aside className="space-y-5">
            <div className="panel bg-surface p-7">
              <h2 className="text-base font-semibold">معلومات التواصل</h2>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                <li>البريد: {site.email}</li>
                <li>الجوال: {site.phone}</li>
                <li>المقر: {site.city}</li>
              </ul>
            </div>
            <p className="panel p-6 text-xs leading-7 text-muted-foreground">
              {professionalDisclaimer}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
