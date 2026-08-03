import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { site } from "@/data/site";
import { articles } from "@/data/content";

const title = `مركز المعرفة | ${site.name}`;
const description = "مقالات عملية عن التأسيس، تنظيم العمليات، اختيار الأنظمة، والنمو.";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/knowledge" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/knowledge" }],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  return (
    <>
      <PageHero eyebrow="مركز المعرفة" title="مقالات تختصر عليك الطريق" description={description} />
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to="/knowledge/$slug"
              params={{ slug: a.slug }}
              className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="text-accent">{a.category}</span>
                <span>•</span>
                <span>{a.readMinutes} دقائق قراءة</span>
              </div>
              <h2 className="mt-3 text-lg font-bold">{a.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
