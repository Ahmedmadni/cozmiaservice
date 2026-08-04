import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { site } from "@/data/site";
import { caseStudies, type CaseStudy } from "@/data/content";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const item = caseStudies.find((c) => c.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "غير متاح" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.item.name} | قصص النجاح | ${site.name}`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.item.challenge },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.item.challenge },
        { property: "og:url", content: `/case-studies/${params.slug}` },
        { name: "twitter:title", content: t },
        { name: "twitter:description", content: loaderData.item.challenge },
      ],
      links: [{ rel: "canonical", href: `/case-studies/${params.slug}` }],
    };
  },
  component: CaseStudyDetail,
});

function CaseStudyDetail() {
  const { item } = Route.useLoaderData() as { item: CaseStudy };

  return (
    <>
      <PageHero eyebrow={item.sector} title={item.name} />
      <section className="container-page py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <Block title="التحدي" body={item.challenge} />
            <Block title="الحل" body={item.solution} />
            <Block title="النتيجة" body={item.result} />
          </div>
          <aside className="space-y-6">
            <div className="panel p-6">
              <h2 className="text-sm font-semibold">الخدمات المقدمة</h2>
              <ul className="mt-4 space-y-2">
                {item.services.map((s) => (
                  <li key={s} className="flex gap-2 text-sm leading-7 text-muted-foreground">
                    <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <h2 className="text-sm font-semibold">المؤشرات</h2>
              <dl className="mt-4 space-y-4">
                {item.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs text-muted-foreground">{m.label}</dt>
                    <dd className="mt-1 font-display text-xl font-semibold">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
      <CTASection />
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="mt-3 text-base leading-8 text-muted-foreground">{body}</p>
    </div>
  );
}
