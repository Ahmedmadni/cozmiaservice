import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { EASE, Rise, useParallax } from "@/components/motion";
import { professionalDisclaimer, site } from "@/data/site";
import riyadhSkyline from "@/assets/band-wide.webp";

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

const audiences = [
  {
    title: "أصحاب الأفكار الجديدة",
    desc: "لم تبدأ بعد، وتحتاج ترتيب الخطوات الأولى قبل الصرف على التفاصيل.",
  },
  {
    title: "الشركات الناشئة",
    desc: "انطلقت فعلًا، وتحتاج هوية وحضورًا رقميًا يعكس مستوى ما تقدمه.",
  },
  {
    title: "المنشآت الصغيرة والمتوسطة",
    desc: "العمل قائم، لكن الإجراءات والأنظمة تحتاج تنظيمًا يقلّل الفوضى اليومية.",
  },
  {
    title: "منشآت تستعد للتوسع",
    desc: "تبحث عن نمو مدروس، وعن كفاءات مناسبة تسند التشغيل في المرحلة القادمة.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title="شريك واحد يرافق مشروعك من الفكرة حتى التوسع"
        description={description}
      />

      <section className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold">لسنا مكتبًا تقليديًا</h2>
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
                طريقتنا ثابتة مهما اختلف الاحتياج: نفهم وضعك الحالي، ونرتّب الأولويات، ونقترح المسار
                المناسب، ثم نوفّر الدعم أو الكفاءات التي يحتاجها التنفيذ، ونبقى معك في المتابعة
                والتنسيق.
              </p>
              <p>
                ما تحتاجه من أعمال مهنية أو نظامية تتطلب تراخيص خاصة، ننسّق فيه مع الجهات والمختصين
                المرخصين، ونبقى معك في التنسيق والمتابعة.
              </p>
            </div>
          </div>
          <AboutImage />
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-surface">
        <div aria-hidden className="pointer-events-none absolute inset-0 arabesque opacity-40 [mask-image:radial-gradient(60%_60%_at_80%_40%,black,transparent)]" />
        <div className="container-page relative py-20 lg:py-28">
          <SectionHeader eyebrow="لماذا نحن؟" title="ما الذي يشعر به عميلنا؟" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "بداية منظمة", d: "خطوات مرتبة بدل قرارات متفرقة." },
              { t: "حضور احترافي", d: "هوية وقنوات رقمية تعبّر عن قيمة مشروعك." },
              { t: "تشغيل أكثر كفاءة", d: "إجراءات وأنظمة تقلّل الفوضى اليومية." },
              { t: "نمو قابل للقياس", d: "مؤشرات واضحة تدعم قرارك التالي." },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 70}>
                <div className="h-full panel p-6">
                  <span className="font-display text-3xl font-bold text-sand/30" data-num>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{item.t}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-page py-20 lg:py-28">
          <SectionHeader eyebrow="قيمنا" title="أربع قيم تحكم طريقة عملنا" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full panel p-6">
                  <h3 className="text-base font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 lg:py-28">
        <SectionHeader
          eyebrow="من نخدم"
          title="مع من نعمل عادة؟"
          description="نعمل مع أصحاب المشاريع في المراحل التي يصنع فيها التنظيم فارقًا حقيقيًا."
        />
        <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="border-t border-border pt-5">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 panel rounded-xl bg-surface p-5 text-xs leading-7 text-muted-foreground">
          {professionalDisclaimer}
        </p>
      </section>

      <CTASection
        title="دعنا نفهم احتياج منشأتك"
        description="ابدأ بمحادثة قصيرة نتعرّف فيها على وضعك الحالي، ونوضح لك كيف يمكننا المساعدة."
        primaryLabel="تحدث مع فريقنا"
        primaryTo="/contact"
        secondaryLabel="تعرّف على خدماتنا"
        secondaryTo="/services"
      />
    </>
  );
}

function AboutImage() {
  const reduced = useReducedMotion();
  const { ref, y } = useParallax(28);

  return (
    <div ref={ref} className="relative">
      <motion.figure
        initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.15, ease: EASE.cinematic }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_100px_-60px_var(--primary)]"
      >
        <motion.img
          src={riyadhSkyline}
          alt="أفق مركز الملك عبدالله المالي في الرياض عند الغروب"
          width={1920}
          height={960}
          loading="lazy"
          style={{ y }}
          className="h-full w-full scale-110 object-cover saturate-[0.9]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"
        />
      </motion.figure>
    </div>
  );
}
