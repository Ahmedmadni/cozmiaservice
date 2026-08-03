import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { site, professionalDisclaimer } from "@/data/site";
import { stages } from "@/data/solutions";

const title = `مراحل النمو | ${site.name}`;
const description =
  "أربع مراحل تمثل رحلة نمو المشروع: ابدأ، نظّم، انطلق، نمُ — وما تشمله كل مرحلة من حلول.";

export const Route = createFileRoute("/growth-stages")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/growth-stages" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/growth-stages" }],
  }),
  component: GrowthStagesPage,
});

function GrowthStagesPage() {
  return (
    <>
      <PageHero eyebrow="مراحل النمو" title="رحلة من أربع مراحل" description={description} />

      <section className="container-page py-16 lg:py-24">
        <div className="space-y-6">
          {stages.map((stage, i) => (
            <article
              key={stage.slug}
              id={stage.slug}
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-7 lg:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <span className="text-xs font-semibold tracking-widest text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold">{stage.title}</h2>
                  <p className="mt-2 text-base font-medium">{stage.headline}</p>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">{stage.summary}</p>
                </div>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {stage.services.map((s) => (
                    <li key={s} className="flex gap-2 text-sm leading-7 text-muted-foreground">
                      <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-border bg-surface p-5 text-xs leading-7 text-muted-foreground">
          {professionalDisclaimer}
        </p>
      </section>

      <CTASection />
    </>
  );
}
