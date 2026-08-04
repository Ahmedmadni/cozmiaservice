import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Check, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import {
  Counter,
  EASE,
  Magnetic,
  Marquee,
  PointerGlow,
  Rise,
  RiseGroup,
  RiseItem,
  SplitWords,
  useParallax,
} from "@/components/motion";
import { HeroComposition } from "@/components/HeroComposition";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { VisionSection } from "@/components/VisionSection";
import { site } from "@/data/site";
import { processSteps, projectStages, stages, whyUs } from "@/data/solutions";
import { services, stageHighlights, stageIcons } from "@/data/services";
import { caseStudies, faqs } from "@/data/content";

const title = `${site.name} | نبني أساس مشروعك… ونساعده على النمو`;
const description =
  "من الهوية والموقع إلى تنظيم العمليات واختيار الأنظمة والتسويق، نجمع احتياجات مشروعك في رحلة واحدة واضحة ومتكاملة.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.slice(0, 5).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

/*
 * ترتيب الصفحة الرئيسية — سرد متدرّج بإيقاع متغيّر:
 *
 *  1  الهيرو            انقسام غير متماثل      عاجي
 *  2  الأرقام           شريط زجاجي على الحدّ   على الفاصل
 *  3  الشريط المتحرك    حركة أفقية             حبري
 *  4  التحديات          عنوان ثابت + صفوف      حبري  ← اللحظة الداكنة الكبرى
 *  5  الخدمات           لوح ثابت + قائمة       عاجي  ← اللحظة التفاعلية الكبرى
 *  6  رحلة المشروع      أربعة أعمدة بخط رابط   سطح
 *  7  لماذا نحن         نص تحريري بلا صناديق   عاجي  ← مساحة تنفّس
 *  8  كيف نعمل          خط زمني بتقدّم مربوط   سطح
 *  9  أين مشروعك        تبويبات زجاجية         عاجي
 * 10  قصص النجاح        شبكة غير متماثلة       سطح
 * 11  رؤية 2030         صورة بكشف وموازاة      عاجي
 * 12  الأسئلة الشائعة   طيّات، عمودان          سطح
 * 13  الدعوة للتواصل    صورة مثبّتة             حبري
 *
 * لا يتكرر نوع تخطيط مرتين متتاليتين، ولا يظهر أكثر من سطحين
 * داكنين قبل استراحة فاتحة.
 */
function Index() {
  return (
    <>
      <Hero />
      <DarkPassage />
      <ServicesShowcase />
      <JourneySection />
      <WhyUsSection />
      <ProcessSection />
      <StagePicker />
      <CaseStudiesSection />
      <VisionSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

/* ═══════════════════════ 1 — الهيرو ═══════════════════════ */

const trustPoints = ["حلول متكاملة", "تجربة مخصصة", "فريق متعدد التخصصات", "دعم مستمر للنمو"];

function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-36 lg:pb-44">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 blueprint opacity-[0.55] [mask-image:radial-gradient(78%_62%_at_72%_28%,black,transparent)]" />
        <div className="absolute -left-40 top-1/4 h-[26rem] w-[26rem] rounded-full bg-accent-soft/70 blur-[110px]" />
      </div>

      <div className="container-page relative grid gap-14 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:pt-20">
        <div>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.ui }}
            className="glass glass-edge inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            حلول أعمال ونمو للشركات الناشئة والمنشآت الصغيرة
          </motion.span>

          <h1 className="mt-7 text-[2.1rem] font-semibold leading-[1.28] text-balance-ar sm:text-5xl lg:text-[3.6rem] lg:leading-[1.2]">
            <SplitWords text="نبني أساس مشروعك" delay={0.1} />
            <br />
            <SplitWords text="ونساعده على النمو" className="text-accent" delay={0.28} />
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.cinematic, delay: 0.55 }}
            className="mt-7 max-w-xl text-base leading-8 text-muted-foreground lg:text-[1.0625rem]"
          >
            من الهوية والموقع إلى تنظيم العمليات واختيار الأنظمة والتسويق، نجمع احتياجات مشروعك في
            رحلة واحدة واضحة ومتكاملة.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.cinematic, delay: 0.68 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Magnetic>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/services">استكشف خدماتنا</Link>
              </Button>
            </Magnetic>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass glass-edge border-transparent"
            >
              <Link to="/assessment">ابدأ تقييم مشروعك</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-9 flex flex-wrap gap-x-7 gap-y-3"
          >
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.25} />
                {point}
              </li>
            ))}
          </motion.ul>

          <motion.div
            aria-hidden
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-14 hidden items-center gap-3 text-xs text-muted-foreground lg:flex"
          >
            <motion.span
              {...(reduced ? {} : { animate: { y: [0, 6, 0] } })}
              transition={{ duration: 2.4, repeat: Infinity, ease: EASE.inOut }}
            >
              <MoveDown className="h-4 w-4" />
            </motion.span>
            تابع للأسفل
          </motion.div>
        </div>

        <div className="lg:pr-4">
          <HeroComposition />
        </div>
      </div>
    </section>
  );
}

/* ═══════════ 2+3+4 — الممر الداكن: أرقام، شريط، تحديات ═══════════ */

const heroStats = [
  { value: 6, suffix: "", label: "مجالات خدمية", hint: "من الهوية إلى النمو ضمن منظومة واحدة" },
  { value: 4, suffix: "", label: "مراحل رحلة", hint: "ابدأ، نظّم، انطلق، نمُ" },
  { value: 1, suffix: "", label: "نقطة تواصل", hint: "شريك واحد بدل تعدد الجهات" },
];

const marqueeItems = [
  "الهوية البصرية",
  "المواقع والمتاجر",
  "تنظيم العمليات",
  "ترشيح الأنظمة",
  "تدريب الفرق",
  "التسويق الرقمي",
  "قياس الأداء",
  "خطط النمو",
];

const challenges = [
  { title: "تعدد مزودي الخدمات", desc: "جهة للهوية وأخرى للموقع وثالثة للتسويق… بلا تنسيق بينها." },
  { title: "عدم وضوح الأولويات", desc: "جهد يتوزّع على مهام كثيرة قبل إنجاز الأساسيات." },
  { title: "صعوبة اختيار الحلول", desc: "خيارات كثيرة وأنظمة متشابهة دون معيار واضح للمفاضلة." },
  { title: "تشتت الجهود التسويقية", desc: "نشاط متقطّع بلا خطة ولا مؤشرات قياس." },
  { title: "ضعف تنظيم العمليات", desc: "إجراءات غير مكتوبة ومعلومات متفرقة يصعب الرجوع إليها." },
  { title: "صعوبة بناء فريق مناسب", desc: "تحديد الأدوار المطلوبة والوصول إلى الكفاءات المناسبة." },
];

/**
 * ممر داكن واحد متصل: يبدأ بشريط كلمات رفيع ثم ينفتح على القسم
 * التحريري. الاستمرارية البصرية تجعل الانتقال مشهدًا واحدًا بدل قطعين.
 */
function DarkPassage() {
  return (
    <div className="relative">
      {/* شريط الأرقام الزجاجي — يجلس على الحدّ بين الفاتح والداكن */}
      {/*
       * الشريط يجلس على الحدّ بين الفاتح والداكن، مع بقاء معظم ارتفاعه
       * فوق الجانب الفاتح حتى يبقى النص الرمادي مقروءًا.
       */}
      <div className="container-page relative z-20 -mt-24 sm:pointer-events-none sm:absolute sm:inset-x-0 sm:-top-28 sm:mt-0 lg:-top-32">
        <Rise className="sm:pointer-events-auto">
          <dl className="glass-strong glass-edge grid gap-px overflow-hidden rounded-3xl sm:grid-cols-3">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  "px-6 py-6 sm:px-7 " +
                  (i > 0 ? "border-t border-border/60 sm:border-r sm:border-t-0" : "")
                }
              >
                <dt className="eyebrow text-muted-foreground">{stat.label}</dt>
                <dd className="mt-2 font-display text-3xl font-semibold text-primary">
                  <Counter to={stat.value} />
                </dd>
                <dd className="mt-2 text-xs leading-6 text-muted-foreground">{stat.hint}</dd>
              </div>
            ))}
          </dl>
        </Rise>
      </div>

      <section className="grain relative overflow-hidden bg-ink text-ink-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 blueprint opacity-[0.05]" />
          <div className="absolute -right-1/4 top-0 h-[34rem] w-[34rem] rounded-full bg-accent/12 blur-[130px]" />
        </div>

        {/* الشريط المتحرك */}
        <div className="relative border-b border-white/10 pt-24 lg:pt-28">
          <Marquee
            items={marqueeItems}
            duration={46}
            className="py-5 text-sm text-ink-muted [mask-image:linear-gradient(to_left,transparent,black_12%,black_88%,transparent)]"
          />
        </div>

        {/* التحديات — عنوان ثابت وصفوف مرقّمة، لا بطاقات متطابقة */}
        <div className="container-page relative grid gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-28">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow text-sand">التحديات</span>
            <h2 className="mt-5 text-[1.75rem] font-semibold leading-[1.3] text-balance-ar sm:text-4xl">
              <SplitWords text="إدارة مشروعك لا يجب أن تعني" />{" "}
              <SplitWords text="التعامل مع عشرات الجهات" delay={0.12} className="text-accent" />
            </h2>
            <p className="mt-6 max-w-md text-sm leading-8 text-ink-muted">
              أكثر ما يعطّل المشاريع الناشئة ليس نقص الجهد، بل تشتّته بين جهات وأدوات وأولويات غير
              مرتبطة.
            </p>
            <div aria-hidden className="mt-10 hidden h-px w-24 bg-sand/50 lg:block" />
          </div>

          <RiseGroup as="ol" className="grid" stagger={0.06}>
            {challenges.map((c, i) => (
              <RiseItem key={c.title} as="li">
                <div className="group grid grid-cols-[auto_1fr] gap-5 border-t border-white/10 py-6 transition-colors duration-500 last:border-b hover:bg-white/[0.03] sm:gap-7 sm:py-7">
                  <span
                    className="eyebrow pt-1.5 text-sand/70 transition-colors duration-500 group-hover:text-sand"
                    data-num
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold sm:text-xl">{c.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-muted">{c.desc}</p>
                  </div>
                </div>
              </RiseItem>
            ))}
          </RiseGroup>
        </div>

        {/* الانتقال إلى الحل */}
        <div className="container-page relative pb-20 lg:pb-28">
          <Rise className="glass-dark glass-edge rounded-3xl px-6 py-10 text-center sm:px-12">
            <p className="mx-auto max-w-2xl font-display text-xl font-semibold leading-9 text-balance-ar sm:text-2xl sm:leading-[1.6]">
              لهذا جمعنا أهم احتياجات المشروع ضمن منظومة واحدة.
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {stages.map((s, i) => (
                <li key={s.slug} className="flex items-center gap-2.5">
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-sm font-medium">
                    {s.title}
                  </span>
                  {i < stages.length - 1 ? (
                    <ArrowLeft aria-hidden className="h-4 w-4 text-accent/70" />
                  ) : null}
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════ 5 — الخدمات (اللحظة التفاعلية) ═══════════════════ */

/**
 * لوح ثابت + قائمة: العنصر المعروض يتبدّل مكان اللوح نفسه بدل أن
 * يُهدَم ويُبنى في مكان آخر — هذا ما يعطي إحساس «العنصر المشترك».
 * على الجوال يختفي اللوح ويظهر الوصف داخل كل صف.
 */
function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const current = services[active]!;
  const Icon = current.icon;

  return (
    <section className="container-page py-20 lg:py-28">
      <div className="grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <SectionHeader
          eyebrow="الخدمات"
          title="ستة مجالات مترابطة تغطي احتياجات مشروعك"
          description="كل مجال يمكن أن يبدأ مستقلًا، لكن قيمته الحقيقية تظهر حين ترتبط المجالات ببعضها ضمن خطة واحدة."
        />
        <Link
          to="/services"
          className="link-sweep hidden items-center gap-2 pb-2 text-sm font-medium text-primary sm:inline-flex"
        >
          جميع الخدمات
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* اللوح الزجاجي الثابت — يسار الشاشة، كما في الهيرو */}
        <div className="order-2 hidden lg:block">
          <div className="sticky top-32">
            <PointerGlow className="overflow-hidden rounded-[1.75rem]">
              <div className="glass-strong glass-edge relative min-h-[26rem] overflow-hidden rounded-[1.75rem] p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 blueprint opacity-[0.5]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent-soft/60 blur-3xl"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.42, ease: EASE.ui }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
                        <Icon className="h-6 w-6" strokeWidth={1.6} />
                      </span>
                      <span className="eyebrow text-sand" data-num>
                        {String(active + 1).padStart(2, "0")} /{" "}
                        {String(services.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-7 font-display text-2xl font-semibold">{current.title}</h3>
                    <p className="mt-4 text-sm leading-8 text-muted-foreground">
                      {current.description}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {current.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/services/$slug"
                      params={{ slug: current.slug }}
                      className="link-sweep mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      استكشف الخدمة
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </PointerGlow>
          </div>
        </div>

        {/* القائمة — العمود الأساسي، على يمين الشاشة */}
        <ul className="order-1 grid">
          {services.map((service, i) => {
            const RowIcon = service.icon;
            const isActive = i === active;
            return (
              <li key={service.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative block border-t border-border py-6 last:border-b lg:py-7"
                >
                  {/* مؤشر الحالة النشطة — خط رفيع لا خلفية ملوّنة */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 right-0 w-px bg-accent"
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    style={{ originY: 0 }}
                    transition={{ duration: 0.45, ease: EASE.ui }}
                  />
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 pr-5 sm:gap-6">
                    <span
                      className={
                        "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-500 " +
                        (isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-primary")
                      }
                    >
                      <RowIcon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold sm:text-xl">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-7 text-muted-foreground lg:hidden">
                        {service.description}
                      </p>
                      <p className="mt-1.5 hidden text-sm leading-7 text-muted-foreground lg:block">
                        {service.short}
                      </p>
                    </div>
                    <ArrowLeft
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-500 group-hover:-translate-x-1 group-hover:text-accent"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-10 sm:hidden">
        <Button asChild className="w-full">
          <Link to="/services">شاهد جميع الخدمات</Link>
        </Button>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 — رحلة المشروع ═══════════════════ */

function JourneySection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-20 lg:py-28">
        <SectionHeader
          eyebrow="رحلة المشروع"
          title="حلول متكاملة لمراحل مشروعك"
          description="ابدأ ← نظّم ← انطلق ← نمُ. نبدأ من حيث أنت، لا من حيث تبدأ القوائم."
        />

        <div className="relative mt-14">
          <RiseGroup className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
            {stages.map((stage, i) => {
              const Icon = stageIcons[stage.slug]!;
              return (
                <RiseItem key={stage.slug}>
                  <PointerGlow className="h-full rounded-2xl">
                    <Link
                      to="/growth-stages"
                      hash={stage.slug}
                      className="glass glass-edge group flex h-full flex-col rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-card text-primary shadow-sm ring-1 ring-border">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <span
                          className="font-display text-4xl font-semibold text-sand/45 transition-colors duration-500 group-hover:text-sand/80"
                          data-num
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-xl font-semibold">{stage.title}</h3>
                      <p className="mt-2 text-sm font-medium text-foreground/75">
                        {stage.headline}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {stageHighlights[stage.slug]}
                      </p>
                      <span className="link-sweep mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-medium text-primary">
                        اعرف كيف نساعدك
                        <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
                      </span>
                    </Link>
                  </PointerGlow>
                </RiseItem>
              );
            })}
          </RiseGroup>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 7 — لماذا نحن (مساحة تنفّس) ═══════════════════ */

function WhyUsSection() {
  return (
    <section className="container-page py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow text-accent">لماذا نحن؟</span>
          <h2 className="mt-5 text-[1.75rem] font-semibold leading-[1.3] text-balance-ar sm:text-4xl">
            <SplitWords text="حلول مترابطة صُممت حول احتياجات مشروعك" />
          </h2>
          <span aria-hidden className="mt-10 hidden h-px w-24 bg-sand lg:block" />
        </div>

        <RiseGroup className="grid gap-x-12 gap-y-9 sm:grid-cols-2" stagger={0.06}>
          {whyUs.map((item) => (
            <RiseItem key={item.title}>
              <div className="group border-t border-border pt-5 transition-colors duration-500 hover:border-accent">
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-7 text-muted-foreground">{item.desc}</p>
              </div>
            </RiseItem>
          ))}
        </RiseGroup>
      </div>
    </section>
  );
}

/* ═══════════════════ 8 — كيف نعمل ═══════════════════ */

/** خط زمني رأسي: التقدّم مربوط بموضع التمرير، فيقرأ كـ«مسار يُقطع». */
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1]);

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-20 lg:py-28">
        <SectionHeader
          eyebrow="كيف نعمل؟"
          title="رحلة واضحة من الاحتياج إلى التنفيذ"
          align="center"
        />

        <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
          <span aria-hidden className="absolute right-[1.0625rem] top-2 bottom-2 w-px bg-border" />
          <motion.span
            aria-hidden
            className="absolute right-[1.0625rem] top-2 bottom-2 w-px origin-top bg-accent"
            style={{ scaleY }}
          />

          <ol className="grid gap-8">
            {processSteps.map((step, i) => (
              <Rise as="li" key={step.title} delay={i * 60} className="relative pr-14">
                <span
                  className="glass-strong glass-edge absolute right-0 top-0 grid h-9 w-9 place-items-center rounded-full font-display text-xs font-semibold text-primary"
                  data-num
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.desc}</p>
              </Rise>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 9 — أين مشروعك الآن؟ ═══════════════════ */

function StagePicker() {
  const [active, setActive] = useState(projectStages[0]!.id);
  const current = projectStages.find((s) => s.id === active) ?? projectStages[0]!;

  return (
    <section className="container-page py-20 lg:py-28">
      <SectionHeader eyebrow="أين مشروعك الآن؟" title="الحلول حسب مرحلة المشروع" />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {projectStages.map((s, i) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                aria-pressed={isActive}
                className={
                  "relative overflow-hidden rounded-2xl p-5 text-right transition-all duration-500 " +
                  (isActive
                    ? "glass-strong glass-edge -translate-y-0.5"
                    : "border border-border bg-card/50 hover:border-accent/50")
                }
              >
                <span className="eyebrow text-sand" data-num>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2.5 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.desc}</p>
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-right bg-accent"
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE.ui }}
                />
              </button>
            );
          })}
        </div>

        <PointerGlow className="rounded-2xl">
          <div className="glass-strong glass-edge h-full rounded-2xl p-7">
            <span className="eyebrow text-accent">حلول مقترحة</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE.ui }}
              >
                <h3 className="mt-2.5 font-display text-lg font-semibold">{current.title}</h3>
                <ul className="mt-6 space-y-3.5">
                  {current.solutions.map((sol) => (
                    <li key={sol} className="flex gap-3 text-sm leading-7">
                      <Check className="mt-1.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.25} />
                      <span className="min-w-0">{sol}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <Button asChild variant="outline" className="mt-8 w-full">
              <Link to="/growth-stages" hash={current.stage}>
                شاهد حلول هذه المرحلة
              </Link>
            </Button>
          </div>
        </PointerGlow>
      </div>
    </section>
  );
}

/* ═══════════════════ 10 — قصص النجاح ═══════════════════ */

function CaseStudiesSection() {
  const { ref, y } = useParallax(28);

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-20 lg:py-28">
        <div className="grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
          <SectionHeader eyebrow="قصص النجاح" title="نتائج من مشاريع عملنا معها" />
          <Link
            to="/case-studies"
            className="link-sweep hidden items-center gap-2 pb-2 text-sm font-medium text-primary sm:inline-flex"
          >
            كل القصص
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {/*
         * القصة الأولى تتميّز بسطحها (زجاج أعتم + توهج) وبموازاة خفيفة،
         * لا بمساحة مضاعفة — فالمساحة المضاعفة تترك فجوة في الشبكة.
         */}
        <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((item, i) => (
            <motion.div key={item.slug} className="h-full" {...(i === 0 ? { style: { y } } : {})}>
              <Rise delay={i * 70} className="h-full">
                <CaseStudyCard item={item} featured={i === 0} />
              </Rise>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 12 — الأسئلة الشائعة ═══════════════════ */

/**
 * الأسئلة كانت تُغذّي البيانات المنظّمة (JSON-LD) دون أن تُعرض للزائر.
 * إظهارها هنا يزيل اعتراضًا شائعًا قبل الدعوة للتواصل مباشرة.
 */
function FAQSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="flex items-center gap-3 text-accent">
            <span aria-hidden className="h-px w-8 bg-sand" />
            <span className="eyebrow">الأسئلة الشائعة</span>
          </span>
          <h2 className="mt-5 text-[1.75rem] font-semibold leading-[1.3] text-balance-ar sm:text-4xl">
            <SplitWords text="أسئلة نسمعها كثيرًا" />
          </h2>
          <Rise delay={120}>
            <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
              إن لم تجد إجابتك هنا، اسألنا مباشرة — نردّ بوضوح عن النطاق والمدد وما يحتاج جهة
              مرخّصة.
            </p>
            <Link
              to="/faq"
              className="link-sweep mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              كل الأسئلة
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Rise>
        </div>

        <Rise delay={80}>
          <FAQAccordion items={faqs.slice(0, 6)} />
        </Rise>
      </div>
    </section>
  );
}
