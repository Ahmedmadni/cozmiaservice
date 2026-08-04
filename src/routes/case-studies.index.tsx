import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTASection } from "@/components/CTASection";
import { site } from "@/data/site";
import { caseStudies } from "@/data/content";

const title = `قصص النجاح | ${site.name}`;
const description = "نماذج من مشاريع عملنا معها: التحدي، الحل، الخدمات المقدمة، والنتيجة.";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/case-studies" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <>
      <PageHero eyebrow="قصص النجاح" title="نتائج نفخر بها" description={description} />
      <section className="container-page py-20 lg:py-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          البيانات المعروضة تجريبية وقابلة للاستبدال بمشاريع فعلية.
        </p>
      </section>
      <CTASection />
    </>
  );
}
