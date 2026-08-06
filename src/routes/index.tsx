import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Check, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import {
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
import { Constellation } from "@/components/Constellation";
import { ServiceGridCard } from "@/components/ServiceGridCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { VisionSection } from "@/components/VisionSection";
import { site } from "@/data/site";
import { processSteps, projectStages, whyUs } from "@/data/solutions";
import { services } from "@/data/services";
import { caseStudies, faqs } from "@/data/content";
import riyadhSkyline from "@/assets/band-wide.webp";

const title = `${site.name} | نبني أساس مشروعك… ونساعده على النمو`;
const description =
  "حلول مترابطة للشركات الناشئة والمنشآت الصغيرة: الهوية والتصميم، المواقع والمتاجر، التسويق، الأنظمة، التنظيم والتشغيل، الكفاءات، ودعم العمليات.";

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
 * ترتيب الصفحة الرئيسية — الخدمات أولًا:
 *
 *  1  الهيرو            رسالة واحدة + دعوتان
 *  2  شريط رحلة المشروع ابدأ ← نظّم ← انطلق ← نمُ
 *  3  الخدمات           سبع بطاقات — أهم قسم في الصفحة
 *  4  التحديات          ممر داكن مختصر
 *  5  كيف نساعدك        خمس خطوات
 *  6  حسب مرحلة المشروع أربع حالات
 *  7  القيمة            حلول مترابطة
 *  8  قصص النجاح / رؤية 2030 / الأسئلة
 *  9  الدعوة الختامية
 */
function Index() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ChallengesSection />
      <ProcessSection />
      <StagePicker />
      <ValueSection />
      <CaseStudiesSection />
      <CityBand />
      <VisionSection />
      <FAQSection />
      <CTASection
        title="ابدأ بخطوة واضحة لمشروعك"
        description="شاركنا مرحلة مشروعك واحتياجاته، وسنساعدك على تحديد المسار المناسب وترتيب الأولويات."
        primaryLabel="تحدث مع فريقنا"
        primaryTo="/contact"
        secondaryLabel="قيّم احتياجات مشروعك"
        secondaryTo="/assessment"
      />
    </>
  );
}

/* ═══════════════════════ 1 — الهيرو ═══════════════════════ */

function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-28 lg:pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 arabesque opacity-50 [mask-image:radial-gradient(55%_50%_at_80%_25%,black,transparent)]" />
        <div className="absolute inset-0 blueprint opacity-40 [mask-image:radial-gradient(60%_55%_at_30%_60%,black,transparent)]" />
        <div className="absolute -left-40 top-1/4 h-[26rem] w-[26rem] rounded-full bg-accent-soft/70 blur-[110px]" />
        <div className="absolute -right-32 -top-16 h-72 w-72 rounded-full bg-sand/6 blur-[100px]" />
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
            شريك حلول أعمال للشركات الناشئة والمنشآت الصغيرة
          </motion.span>

          <h1 className="mt-7 text-[2.1rem] font-bold leading-[1.28] text-balance-ar sm:text-5xl lg:text-[3.6rem] lg:leading-[1.2]">
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
            حلول مترابطة تشمل التصميم والحضور الرقمي والتسويق والأنظمة والتنظيم وتوفير الكفاءات ودعم
            الأعمال — ضمن مسار واحد واضح.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.cinematic, delay: 0.68 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Magnetic>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/" hash="services">
                  استكشف خدماتنا
                </Link>
              </Button>
            </Magnetic>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass glass-edge border-transparent"
            >
              <Link to="/assessment">قيّم احتياجات مشروعك</Link>
            </Button>
          </motion.div>

          <motion.div
            aria-hidden
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-12 hidden items-center gap-3 text-xs text-muted-foreground lg:flex"
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

/* ═══════════════════ 2 — الخدمات (أهم قسم) ═══════════════════ */

function ServicesSection() {
  return (
    <section id="services" className="container-page scroll-mt-24 py-20 lg:py-28">
      <div className="grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <SectionHeader
          eyebrow="الخدمات"
          title="ما الذي نقدمه لمشروعك؟"
          description="مجالات مترابطة يمكن أن تبدأ بأيّها، وتزداد قيمتها حين ترتبط ضمن خطة واحدة."
        />
        <Link
          to="/services"
          className="link-sweep hidden items-center gap-2 pb-2 text-sm font-medium text-primary sm:inline-flex"
        >
          جميع الخدمات
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Rise as="li" key={service.slug} delay={(i % 3) * 70} className="h-full">
            <ServiceGridCard service={service} index={i} />
          </Rise>
        ))}
      </ul>

      <div className="mt-10 sm:hidden">
        <Button asChild className="w-full">
          <Link to="/services">شاهد جميع الخدمات</Link>
        </Button>
      </div>
    </section>
  );
}

/* ═══════════ 4 — التحديات (ممر داكن مختصر) ═══════════ */

const marqueeItems = [
  "الهوية البصرية",
  "المواقع والمتاجر",
  "تنظيم العمليات",
  "ترشيح الأنظمة",
  "توفير الكفاءات",
  "التسويق الرقمي",
  "دعم السجلات",
  "خطط النمو",
];

const challenges = [
  { title: "تعدد مزودي الخدمات", desc: "جهة للهوية وأخرى للموقع وثالثة للتسويق بلا تنسيق." },
  { title: "صعوبة ترتيب الأولويات", desc: "جهد يتوزّع قبل إنجاز الأساسيات." },
  { title: "صعوبة اختيار الحلول والأنظمة", desc: "خيارات كثيرة دون معيار واضح للمفاضلة." },
  { title: "تشتت العمليات", desc: "إجراءات غير مكتوبة ومعلومات يصعب الرجوع إليها." },
  { title: "ضعف الحضور الرقمي", desc: "ظهور غير منتظم لا يعكس مستوى المشروع." },
  { title: "صعوبة توفير الكفاءات", desc: "تحديد الأدوار والوصول إلى الأشخاص المناسبين." },
];

function ChallengesSection() {
  return (
    <section className="grain relative overflow-hidden bg-ink text-ink-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Constellation className="opacity-[0.14]" />
        <div className="absolute inset-0 arabesque opacity-[0.18] [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute -right-1/4 top-0 h-[34rem] w-[34rem] rounded-full bg-accent/12 blur-[130px]" />
      </div>

      <div className="relative border-b border-white/10">
        <Marquee
          items={marqueeItems}
          duration={46}
          className="py-5 text-sm text-ink-muted [mask-image:linear-gradient(to_left,transparent,black_12%,black_88%,transparent)]"
        />
      </div>

      <div className="container-page relative grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow text-sand">التحديات</span>
          <h2 className="mt-5 text-[1.6rem] font-bold leading-[1.32] text-balance-ar sm:text-[2rem]">
            <SplitWords text="ما الذي يعطّل المشاريع عادة؟" />
          </h2>
          <p className="mt-5 max-w-md text-sm leading-8 text-ink-muted">
            ليست المشكلة نقص الجهد، بل تشتّته بين جهات وأدوات وأولويات غير مرتبطة.
          </p>
        </div>

        <RiseGroup as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.05}>
          {challenges.map((c) => (
            <RiseItem key={c.title} as="li">
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-sm font-semibold sm:text-base">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-[1.8] text-ink-muted">{c.desc}</p>
              </div>
            </RiseItem>
          ))}
        </RiseGroup>
      </div>
    </section>
  );
}

/* ═══════════════════ 5 — كيف نساعدك ═══════════════════ */

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
          eyebrow="كيف نساعدك؟"
          title="خمس خطوات من الاحتياج إلى النتيجة"
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
                <p className="mt-2.5 text-sm leading-[1.8] text-muted-foreground">{step.desc}</p>
              </Rise>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 — أين مشروعك الآن؟ ═══════════════════ */

function StagePicker() {
  const [active, setActive] = useState(projectStages[0]!.id);
  const current = projectStages.find((s) => s.id === active) ?? projectStages[0]!;

  return (
    <section className="container-page py-20 lg:py-28">
      <div className="grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <SectionHeader eyebrow="أين مشروعك الآن؟" title="الحلول حسب مرحلة المشروع" />
        <Link
          to="/growth-stages"
          className="link-sweep hidden items-center gap-2 pb-2 text-sm font-medium text-primary sm:inline-flex"
        >
          تفاصيل المراحل
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

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
                  "relative overflow-hidden rounded-2xl p-6 text-right transition-all duration-500 " +
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
                <ul className="mt-6 space-y-4">
                  {current.solutions.map((sol) => (
                    <li key={sol} className="flex gap-3 text-sm leading-[1.8]">
                      <Check className="mt-1.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.25} />
                      <span className="min-w-0">{sol}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <Button asChild variant="outline" className="mt-8 w-full">
              <Link to="/growth-stages" hash={current.stage}>
                اعرف المزيد عن هذه المرحلة
              </Link>
            </Button>
          </div>
        </PointerGlow>
      </div>
    </section>
  );
}

/* ═══════════════════ 7 — القيمة ═══════════════════ */

function ValueSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow text-accent">القيمة</span>
          <h2 className="mt-5 text-[1.75rem] font-bold leading-[1.3] text-balance-ar sm:text-4xl">
            <SplitWords text="حلول مترابطة… حول احتياجات مشروعك" />
          </h2>
          <Rise delay={120}>
            <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
              بدل تنسيق العمل بين جهات متعددة لكل احتياج، تُدار احتياجات مشروعك ضمن خطة واحدة وفريق
              يعرف سياق عملك.
            </p>
          </Rise>
          <span aria-hidden className="mt-10 hidden h-px w-24 bg-sand lg:block" />
        </div>

        <RiseGroup className="grid gap-x-14 gap-y-10 sm:grid-cols-2" stagger={0.06}>
          {whyUs.map((item) => (
            <RiseItem key={item.title}>
              <div className="group border-t border-border pt-6 transition-colors duration-500 hover:border-accent">
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{item.desc}</p>
              </div>
            </RiseItem>
          ))}
        </RiseGroup>
      </div>
    </section>
  );
}

/* ═══════════════════ 8 — قصص النجاح ═══════════════════ */

function CaseStudiesSection() {
  const { ref, y } = useParallax(28);

  return (
    <section className="container-page py-20 lg:py-28">
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

      <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {caseStudies.map((item, i) => (
          <motion.div key={item.slug} className="h-full" {...(i === 0 ? { style: { y } } : {})}>
            <Rise delay={i * 70} className="h-full">
              <CaseStudyCard item={item} featured={i === 0} />
            </Rise>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════ الشريط البصري السعودي — أفق الرياض ═══════════ */

function CityBand() {
  const reduced = useReducedMotion();

  return (
    <section className="relative h-56 overflow-hidden sm:h-72 lg:h-[26rem]">
      <motion.img
        src={riyadhSkyline}
        alt=""
        aria-hidden
        initial={reduced ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE.cinematic }}
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/30" />
    </section>
  );
}

/* ═══════════════════ 9 — الأسئلة الشائعة ═══════════════════ */

function FAQSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="flex items-center gap-3 text-accent">
            <span aria-hidden className="h-px w-8 bg-sand" />
            <span className="eyebrow">الأسئلة الشائعة</span>
          </span>
          <h2 className="mt-5 text-[1.75rem] font-bold leading-[1.3] text-balance-ar sm:text-4xl">
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
