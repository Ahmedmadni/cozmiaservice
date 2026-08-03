import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { site, professionalDisclaimer } from "@/data/site";

const title = `الشروط والأحكام | ${site.name}`;
const description = "شروط استخدام الموقع، ونطاق الخدمات، وحدود المسؤولية.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/terms" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections = [
  {
    t: "قبول الشروط",
    b: "باستخدامك هذا الموقع فإنك توافق على هذه الشروط. إذا لم توافق عليها، يُرجى عدم استخدام الموقع.",
  },
  {
    t: "نطاق الخدمات",
    b: "نقدّم حلول تنظيم وتشغيل وتسويق وحضور رقمي. أي أعمال تتطلب ترخيصًا مهنيًا محددًا تُنفَّذ بالتنسيق مع جهات ومختصين مرخصين.",
  },
  {
    t: "المحتوى والملكية الفكرية",
    b: "جميع عناصر الموقع من نصوص وتصاميم وشعارات مملوكة لنا أو مرخصة لنا، ولا يجوز إعادة استخدامها دون إذن كتابي.",
  },
  {
    t: "حدود المسؤولية",
    b: "المحتوى المعروض لأغراض التعريف العام ولا يُعد استشارة مهنية ملزمة. القرارات المبنية عليه تقع على مسؤولية المستخدم.",
  },
  {
    t: "التعديلات",
    b: "قد نحدّث هذه الشروط من وقت لآخر، ويسري التحديث فور نشره على الموقع.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHero eyebrow="الصفحات النظامية" title="الشروط والأحكام" description={description} />
      <section className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.t}>
              <h2 className="text-lg font-bold">{s.t}</h2>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">{s.b}</p>
            </div>
          ))}
          <p className="rounded-xl border border-border bg-surface p-5 text-xs leading-7 text-muted-foreground">
            {professionalDisclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
