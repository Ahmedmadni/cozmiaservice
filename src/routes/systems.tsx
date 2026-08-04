import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { site, professionalDisclaimer } from "@/data/site";
import { systemCategories } from "@/data/solutions";

const title = `البرامج والأنظمة | ${site.name}`;
const description =
  "نساعدك على فهم احتياجات منشأتك، ومقارنة الحلول المتاحة، وترشيح البرامج المناسبة، وتأهيل فريقك لاستخدامها بكفاءة.";

export const Route = createFileRoute("/systems")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/systems" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/systems" }],
  }),
  component: SystemsPage,
});

const method = [
  { t: "فهم الاحتياج", d: "ما الإجراءات التي تحتاج تحسينًا فعليًا؟ ومن سيستخدم النظام يوميًا؟" },
  { t: "المقارنة", d: "معايير واضحة للمفاضلة: الملاءمة، الكلفة الكاملة، سهولة الاستخدام، الدعم." },
  { t: "خطة التطبيق", d: "مراحل التطبيق، نقل البيانات، وتحديد المسؤوليات." },
  { t: "التدريب والدعم", d: "تأهيل الفريق ومرافقته خلال أول دورة تشغيل كاملة." },
];

function SystemsPage() {
  return (
    <>
      <PageHero
        eyebrow="البرامج والأنظمة"
        title="اختر الأدوات المناسبة قبل أن تستثمر فيها"
        description={description}
      />

      <section className="container-page py-20 lg:py-28">
        <SectionHeader eyebrow="التصنيفات" title="مجالات الأنظمة التي نساعدك في ترشيحها" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {systemCategories.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="h-full panel p-6">
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          لا نعرض أسماء منتجات محددة في هذه المرحلة. الترشيح يتم وفق احتياج منشأتك، وبمعايير مكتوبة
          يمكنك مراجعتها.
        </p>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-page py-20 lg:py-28">
          <SectionHeader eyebrow="طريقتنا" title="من الاحتياج إلى نظام يعمل فعلًا" />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((m, i) => (
              <li key={m.t} className="panel p-6">
                <span className="glass-strong glass-edge grid h-9 w-9 place-items-center rounded-full font-display text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold">{m.t}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{m.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 panel rounded-xl p-5 text-xs leading-7 text-muted-foreground">
            {professionalDisclaimer}
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
