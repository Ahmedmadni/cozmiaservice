import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { IconBadge } from "@/components/IconBadge";
import { Rise, RiseGroup, RiseItem } from "@/components/motion";
import { Users } from "lucide-react";
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
      <PageHero
        eyebrow="الكفاءات والفرق"
        title="خبرات متنوعة تحت مظلة واحدة"
        description={description}
      />
      <section className="container-page py-20 lg:py-28">
        <RiseGroup className="grid gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {teamCapabilities.map((c) => (
            <RiseItem key={c.title}>
              <div className="panel relative h-full px-6 pb-6 pt-11 shadow-[0_18px_44px_-38px_var(--primary)]">
                <IconBadge icon={c.icon} overlap />
                <h2 className="font-display text-base font-semibold">{c.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.desc}</p>
              </div>
            </RiseItem>
          ))}
        </RiseGroup>

        <Rise delay={120}>
          <div className="panel relative mt-14 bg-surface px-7 pb-7 pt-11">
            <IconBadge icon={Users} tone="solid" overlap />
            <h2 className="font-display text-lg font-semibold">تحتاج كفاءة ضمن فريقك؟</h2>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-muted-foreground">
              نساعدك على تحديد الأدوار المطلوبة، وفي استقطاب أو توفير الكفاءات المناسبة وفق احتياج
              المشروع، إضافة إلى تدريب الفريق على الأنظمة والبرامج.
            </p>
          </div>
        </Rise>
      </section>
      <CTASection />
    </>
  );
}
