import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { site } from "@/data/site";
import { articles, type Article } from "@/data/content";

export const Route = createFileRoute("/knowledge/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "غير متاح" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.article.title} | ${site.name}`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.article.excerpt },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.article.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/knowledge/${params.slug}` },
        { name: "twitter:title", content: t },
        { name: "twitter:description", content: loaderData.article.excerpt },
      ],
      links: [{ rel: "canonical", href: `/knowledge/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.article.title,
            datePublished: loaderData.article.date,
            description: loaderData.article.excerpt,
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };

  return (
    <>
      <PageHero eyebrow={article.category} title={article.title} />
      <article className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-2xl space-y-5 text-base leading-9 text-muted-foreground">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
      <CTASection />
    </>
  );
}
