import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { site, professionalDisclaimer } from "@/data/site";
import { solutionCategories } from "@/data/solutions";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const category = solutionCategories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "غير متاح" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.category.title} | ${site.name}`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.category.intro },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.category.intro },
        { property: "og:url", content: `/solutions/${params.slug}` },
        { name: "twitter:title", content: t },
        { name: "twitter:description", content: loaderData.category.intro },
      ],
      links: [{ rel: "canonical", href: `/solutions/${params.slug}` }],
    };
  },
  component: SolutionDetail,
});

function SolutionDetail() {
  const { category } = Route.useLoaderData();
  const others = solutionCategories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <PageHero eyebrow="الحلول" title={category.title} description={category.intro} />

      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {category.groups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-border bg-card p-7">
              <h2 className="text-lg font-bold">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-border bg-surface p-5 text-xs leading-7 text-muted-foreground">
          {professionalDisclaimer}
        </p>

        <div className="mt-14">
          <h2 className="text-lg font-bold">حلول أخرى قد تهمك</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/solutions/$slug"
                params={{ slug: c.slug }}
                className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/60"
              >
                <h3 className="text-sm font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary transition-transform group-hover:-translate-x-1">
                  التفاصيل
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
