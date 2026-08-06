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
      <section className="container-page py-20 lg:py-28">
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to="/knowledge/$slug"
              params={{ slug: a.slug }}
              className="group panel p-7 card-hover hover:border-accent/60"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="text-accent">{a.category}</span>
                <span>•</span>
                <span>{a.readMinutes} دقائق قراءة</span>
              </div>
              <h2 className="mt-3 font-display text-lg font-semibold">{a.title}</h2>
              <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
