import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { site } from "@/data/site";
import { teamCapabilities } from "@/data/content";

const title = `الكفاءات والفرق | ${site.name}`;
const description =
  "فريق متعدد التخصصات يجمع التصميم والتقنية والتشغيل والتسويق، مع المساعدة في توفير الكفاءات المناسبة لمشروعك.";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/team" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <>
      <PageHero eyebrow="الكفاءات والفرق" title="خبرات متنوعة تحت مظلة واحدة" description={description} />
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamCapabilities.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-surface p-7">
          <h2 className="text-lg font-bold">تحتاج كفاءة ضمن فريقك؟</h2>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-muted-foreground">
            نساعدك على تحديد الأدوار المطلوبة، وفي استقطاب أو توفير الكفاءات المناسبة وفق احتياج
            المشروع، إضافة إلى تدريب الفريق على الأنظمة والبرامج.
          </p>
        </div>
      </section>
      <CTASection />
    </>
  );
}
