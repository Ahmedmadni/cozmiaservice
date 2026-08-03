import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { professionalDisclaimer, site } from "@/data/site";
import { whyUs } from "@/data/solutions";

const title = `من نحن | ${site.name}`;
const description =
  "شريك متكامل يساعد رواد الأعمال والشركات الناشئة على تحويل أفكارهم إلى أعمال منظمة وقابلة للنمو، من التأسيس حتى التوسع.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { title: "الوضوح", desc: "نقول ما يمكننا فعله بدقة، ونوضّح ما يحتاج جهة مختصة مرخصة." },
  { title: "الترتيب", desc: "نبدأ بالأولويات، لا بأكبر نطاق ممكن." },
  { title: "الترابط", desc: "قرار التصميم يخدم التشغيل، وقرار النظام يخدم التسويق." },
  { title: "الاستمرارية", desc: "علاقة تمتد بعد التسليم، بمتابعة ومؤشرات." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title="شريك واحد يرافق مشروعك من الفكرة حتى التوسع"
        description={description}
      />

      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">لسنا مكتبًا تقليديًا</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                نحن لسنا مكتب محاسبة، ولسنا مكتب محاماة، ولسنا وكالة تسويق تقليدية. نحن منظومة حلول
                تجمع الاحتياجات الأساسية لصاحب المشروع في مكان واحد.
              </p>
              <p>
                نساعدك على تحويل فكرتك إلى عمل منظم: بناء الهوية والحضور الرقمي، وتنظيم العمليات
                واختيار الأدوات المناسبة، ثم التسويق والتوسع بخطة واضحة.
              </p>
              <p>
                ما تحتاجه من أعمال مهنية أو نظامية تتطلب تراخيص خاصة، ننسّق فيه مع الجهات والمختصين
                المرخصين، ونبقى معك في التنسيق والمتابعة.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-bold">ما الذي يشعر به عميلنا؟</h2>
            <ul className="mt-6 space-y-5">
              {[
                { t: "بداية منظمة", d: "خطوات مرتبة بدل قرارات متفرقة." },
                { t: "حضور احترافي", d: "هوية وقنوات رقمية تعبّر عن قيمة مشروعك." },
                { t: "تشغيل أكثر كفاءة", d: "إجراءات وأنظمة تقلّل الفوضى اليومية." },
                { t: "نمو قابل للقياس", d: "مؤشرات واضحة تدعم قرارك التالي." },
              ].map((item) => (
                <li key={item.t}>
                  <h3 className="text-sm font-semibold">{item.t}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-page py-16 lg:py-24">
          <SectionHeader eyebrow="قيمنا" title="أربع قيم تحكم طريقة عملنا" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <SectionHeader eyebrow="لماذا نحن؟" title="حلول مترابطة صُممت حول احتياجات مشروعك" />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 rounded-xl border border-border bg-surface p-5 text-xs leading-7 text-muted-foreground">
          {professionalDisclaimer}
        </p>
      </section>

      <CTASection />
    </>
  );
}
