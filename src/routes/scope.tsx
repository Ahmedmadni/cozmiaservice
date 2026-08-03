import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site, professionalDisclaimer } from "@/data/site";

const title = `نطاق الخدمات والتنبيهات المهنية | ${site.name}`;
const description =
  "توضيح دقيق لما نقدّمه فعليًا من حلول تنظيم وتشغيل وحضور رقمي، وما يُنفَّذ عبر جهات ومختصين مرخصين.";

export const Route = createFileRoute("/scope")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/scope" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/scope" }],
  }),
  component: ScopePage,
});

const inScope = [
  "بناء الهوية البصرية والمواد التعريفية.",
  "تصميم وتطوير المواقع والمتاجر الإلكترونية وإدارتها.",
  "تنظيم الإجراءات التشغيلية وتوثيق دورة العمل اليومية.",
  "ترشيح الأنظمة والبرامج المناسبة، وتهيئتها، وتدريب الفريق عليها.",
  "التسويق الرقمي وإدارة المحتوى والحملات وقياس الأداء.",
  "دعم الفرق بالكفاءات التشغيلية والتنسيق الإداري.",
];

const outOfScope = [
  "إعداد أو اعتماد القوائم المالية والمراجعة المحاسبية.",
  "تقديم الاستشارات أو التمثيل القانوني وصياغة المرافعات.",
  "تقديم إقرارات أو استشارات ضريبية أو زكوية ملزمة.",
  "أي عمل مهني يتطلب ترخيصًا أو اعتمادًا من جهة مختصة.",
];

function ScopePage() {
  return (
    <>
      <PageHero eyebrow="الصفحات النظامية" title="نطاق الخدمات" description={description} />
      <section className="container-page py-16 lg:py-24">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7">
            <h2 className="text-lg font-bold">ما نقدّمه مباشرة</h2>
            <ul className="mt-5 space-y-4">
              {inScope.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-7">
            <h2 className="text-lg font-bold">ما يُنفَّذ عبر مختصين مرخصين</h2>
            <ul className="mt-5 space-y-4">
              {outOfScope.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                  <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-7 text-muted-foreground">
              دورنا في هذه الحالات هو التنظيم والتنسيق وتجهيز البيانات، ثم التعاون مع الجهة أو
              المختص المرخّص لإتمام العمل وفق الأنظمة.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-border bg-card p-7">
          <p className="text-sm leading-8 text-muted-foreground">{professionalDisclaimer}</p>
          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            استفسر عن نطاق عمل مشروعك
          </Link>
        </div>
      </section>
    </>
  );
}
