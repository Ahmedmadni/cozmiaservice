import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { site, professionalDisclaimer } from "@/data/site";
import { faqs } from "@/data/content";

const title = `الأسئلة الشائعة | ${site.name}`;
const description = "إجابات واضحة عن نطاق خدماتنا، طريقة العمل، ومدد التنفيذ.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/faq" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <>
      <PageHero eyebrow="الأسئلة الشائعة" title="أسئلة نسمعها كثيرًا" description={description} />
      <section className="container-page py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={faqs} />
          <p className="mt-10 panel rounded-xl bg-surface p-5 text-xs leading-7 text-muted-foreground">
            {professionalDisclaimer}
          </p>
        </div>
      </section>
      <CTASection />
    </>
  );
}
