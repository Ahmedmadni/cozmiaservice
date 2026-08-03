import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

const title = `سياسة الخصوصية | ${site.name}`;
const description = "كيف نجمع بيانات الزوار ونستخدمها ونحميها عند التواصل معنا.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    t: "البيانات التي نجمعها",
    b: "نجمع البيانات التي تزودنا بها طوعًا عبر نماذج التواصل: الاسم، اسم المنشأة، البريد الإلكتروني، رقم الجوال، ووصف الاحتياج.",
  },
  {
    t: "الغرض من الاستخدام",
    b: "نستخدم البيانات للرد على طلبك، وتقديم عرض مناسب، والتواصل بشأن الخدمة المطلوبة فقط.",
  },
  {
    t: "المشاركة مع الغير",
    b: "لا نبيع بياناتك. قد نشاركها مع مزودي خدمات تقنية يساعدوننا في تشغيل الموقع، وبالحد اللازم فقط.",
  },
  {
    t: "الاحتفاظ والحماية",
    b: "نحتفظ بالبيانات للمدة اللازمة لغرض جمعها، ونطبق إجراءات تقنية وتنظيمية معقولة لحمايتها.",
  },
  {
    t: "حقوقك",
    b: "يمكنك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها عبر مراسلتنا على البريد الموضح في صفحة التواصل.",
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="الصفحات النظامية" title="سياسة الخصوصية" description={description} />
      <section className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.t}>
              <h2 className="text-lg font-bold">{s.t}</h2>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">{s.b}</p>
            </div>
          ))}
          <p className="text-xs leading-7 text-muted-foreground">
            هذه الصفحة نموذج أولي قابل للمراجعة من مختص نظامي قبل الاعتماد النهائي.
          </p>
        </div>
      </section>
    </>
  );
}
