import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Check, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/SectionHeader";
import {
  DUR,
  EASE,
  STAGGER,
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
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { VisionSection } from "@/components/VisionSection";
import { site } from "@/data/site";
import { processSteps, projectStages, whyUs } from "@/data/solutions";
import { services } from "@/data/services";
import { caseStudies, faqs } from "@/data/content";
import riyadhSkyline from "@/assets/band-wide.webp";
import heroSkyline from "@/assets/hero-skyline.webp";

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
      <ChallengesSection />
      <EditorialDivider />
      <ServicesSection />
      <ProcessSection />
      <ValueSection />
      <CaseStudiesSection />
      <StagePicker />
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

/*
 * تسلسل الافتتاح — رقم واحد لكل كتلة، مشتق من فاصل القسم (0.12s).
 * وجود السلّم في مكان واحد يمنع انزلاق التوقيت عند أي تعديل لاحق:
 * تُحرّك الكتلة، لا الأرقام المتناثرة في الوسم.
 */
const HERO_BEAT = {
  badge: 0,
  titleTop: STAGGER.section,
  titleBottom: STAGGER.section * 2.4,
  underline: STAGGER.section * 4,
  lead: STAGGER.section * 4.8,
  actions: STAGGER.section * 6,
  hint: STAGGER.section * 10,
} as const;

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <img
        src={heroSkyline}
        alt=""
        width={760}
        height={1018}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.06] grayscale-[0.6] [mask-image:linear-gradient(to_bottom,transparent_5%,black_30%,black_65%,transparent_95%)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-background/80" />
      <div className="absolute right-[15%] top-[25%] h-[45vh] w-[30vw] rounded-full bg-accent-soft/30 blur-[140px]" />
      <div className="absolute bottom-[10%] left-[20%] h-[35vh] w-[25vw] rounded-full bg-sand/8 blur-[120px]" />
      <div className="absolute inset-0 arabesque opacity-[0.02] [mask-image:radial-gradient(50%_45%_at_60%_35%,black,transparent)]" />
      <div className="absolute inset-0 grain opacity-15" />
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-background">
      <HeroBackdrop />

      <div className="container-page relative z-10 grid items-center gap-12 pb-28 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-16 lg:pb-36 lg:pt-36">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-right">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: DUR.large, ease: EASE.cinematic, delay: HERO_BEAT.badge }}
            className="inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-card/50 py-1.5 pl-4 pr-3 text-xs font-medium text-muted-foreground backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            شريك حلول أعمال للشركات الناشئة والمنشآت الصغيرة
          </motion.span>

          <h1 className="mt-10 font-display text-[2.75rem] font-bold leading-[1.08] text-foreground text-balance-ar sm:text-[3.5rem] lg:mt-12 lg:text-[4.5rem] lg:leading-[1.05] xl:text-[5.25rem]">
            <SplitWords text="نبني أساس مشروعك" delay={HERO_BEAT.titleTop} />
            <br />
            <span className="relative inline-block">
              <SplitWords
                text="ونساعده على النمو"
                className="text-accent"
                delay={HERO_BEAT.titleBottom}
              />
              <motion.span
                aria-hidden
                className="absolute inset-x-0 -bottom-1.5 h-px origin-right bg-gradient-to-l from-sand via-sand/50 to-transparent"
                initial={reduced ? false : { scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: DUR.hero,
                  ease: EASE.cinematic,
                  delay: HERO_BEAT.underline,
                }}
              />
            </span>
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: DUR.hero,
              ease: EASE.cinematic,
              delay: HERO_BEAT.lead,
              filter: { duration: DUR.large, ease: EASE.ui, delay: HERO_BEAT.lead },
            }}
            className="mt-7 max-w-md text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem] lg:mt-9 lg:max-w-lg"
          >
            حلول مترابطة تشمل التصميم والحضور الرقمي والتسويق والأنظمة والتنظيم وتوفير الكفاءات ودعم
            الأعمال — ضمن مسار واحد واضح.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: DUR.hero, ease: EASE.cinematic, delay: HERO_BEAT.actions }}
            className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center lg:mt-12"
          >
            <Magnetic className="w-full sm:w-auto">
              <Button asChild size="lg" className="group w-full gap-2.5 px-10 shadow-lg sm:w-auto">
                <Link to="/" hash="services">
                  استكشف خدماتنا
                  <ArrowLeft className="h-4 w-4 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 motion-reduce:transform-none" />
                </Link>
              </Button>
            </Magnetic>
            <Link
              to="/assessment"
              className="link-sweep text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              قيّم احتياجات مشروعك
            </Link>
          </motion.div>
        </div>

        <HeroComposition className="hidden lg:block" />
      </div>

      <motion.div
        aria-hidden
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.hero, ease: EASE.ui, delay: HERO_BEAT.hint }}
        className="absolute inset-x-0 bottom-12 z-10 flex flex-col items-center gap-2 text-xs text-muted-foreground"
      >
        <motion.span
          {...(reduced ? {} : { animate: { y: [0, 6, 0] } })}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: EASE.inOut,
            delay: HERO_BEAT.hint,
          }}
        >
          <MoveDown className="h-4 w-4" />
        </motion.span>
        تابع للأسفل
      </motion.div>
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

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {services.map((service, i) => {
          const featured = i < 2 || i >= 5;
          return (
            <Rise
              as="li"
              key={service.slug}
              delay={(i % 3) * STAGGER.item * 1000}
              className={cn("h-full", featured ? "lg:col-span-3" : "lg:col-span-2")}
            >
              <ServiceGridCard service={service} index={i} />
            </Rise>
          );
        })}
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
          <h2 className="mt-5 font-display text-[1.6rem] font-bold leading-[1.32] text-balance-ar sm:text-[2rem]">
            <SplitWords text="ما الذي يعطّل المشاريع عادة؟" />
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-[1.8] text-ink-muted">
            ليست المشكلة نقص الجهد، بل تشتّته بين جهات وأدوات وأولويات غير مرتبطة.
          </p>
        </div>

        <div className="space-y-4">
          <Rise>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
              <h3 className="text-lg font-semibold sm:text-xl">{challenges[0]!.title}</h3>
              <p className="mt-3 max-w-lg text-base leading-[1.9] text-ink-muted">
                {challenges[0]!.desc}
              </p>
            </div>
          </Rise>

          <div className="grid gap-4 sm:grid-cols-2">
            {challenges.slice(1, 3).map((c, i) => (
              <Rise key={c.title} delay={(i + 1) * 60}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-sm font-semibold sm:text-base">{c.title}</h3>
                  <p className="mt-2.5 text-sm leading-[1.8] text-ink-muted">{c.desc}</p>
                </div>
              </Rise>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.4fr_0.6fr]">
            {challenges.slice(3, 5).map((c, i) => (
              <Rise key={c.title} delay={(i + 3) * 60}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-sm font-semibold sm:text-base">{c.title}</h3>
                  <p className="mt-2.5 text-sm leading-[1.8] text-ink-muted">{c.desc}</p>
                </div>
              </Rise>
            ))}
          </div>

          <Rise delay={300}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:max-w-sm">
              <h3 className="text-sm font-semibold sm:text-base">{challenges[5]!.title}</h3>
              <p className="mt-2.5 text-sm leading-[1.8] text-ink-muted">{challenges[5]!.desc}</p>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ فاصل تحريري ═══════════════════ */

function EditorialDivider() {
  return (
    <section className="container-page py-24 lg:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[1.75rem] font-bold leading-[1.4] text-balance-ar sm:text-4xl lg:text-[2.8rem] lg:leading-[1.3]">
          <SplitWords text="الحل ليس في جهود أكثر — بل في ترابط أكثر" />
        </h2>
        <Rise delay={120}>
          <span aria-hidden className="mx-auto mt-8 block h-px w-16 bg-sand" />
        </Rise>
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

          <ol className="grid gap-10">
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
                  "relative overflow-hidden rounded-2xl p-6 text-right will-change-transform transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.99] active:duration-[90ms] motion-reduce:transform-none " +
                  (isActive
                    ? "glass-strong glass-edge -translate-y-1 scale-[1.008]"
                    : "border border-border bg-card/50 hover:-translate-y-0.5 hover:border-accent/50")
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
                  transition={{ duration: DUR.normal, ease: EASE.ui }}
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
                initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
                transition={{ duration: DUR.normal, ease: EASE.ui }}
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
          <h2 className="mt-5 font-display text-[1.75rem] font-bold leading-[1.3] text-balance-ar sm:text-4xl">
            <SplitWords text="حلول مترابطة… حول احتياجات مشروعك" />
          </h2>
          <Rise delay={120}>
            <p className="mt-6 max-w-sm text-base leading-[1.85] text-muted-foreground">
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

/* ═══════════════════ 8 — قصص النجاح والثقة ═══════════════════ */

const TRUST_INDICATORS = [
  { label: "سنوات خبرة", value: "—" },
  { label: "مشروع مُنفّذ", value: "—" },
  { label: "قطاع أعمال", value: "—" },
  { label: "منطقة في المملكة", value: "—" },
];

const CLIENT_META = [
  { label: "القطاع", value: "أغذية ومنتجات" },
  { label: "الحجم", value: "—" },
  { label: "النطاق", value: "هوية + متجر + تشغيل" },
  { label: "الموقع", value: "المملكة العربية السعودية" },
];

function CaseStudiesSection() {
  const featured = caseStudies[0]!;
  const supporting = caseStudies.slice(1, 3);

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-24 lg:py-36">
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

        <div className="mt-20 grid gap-12 lg:mt-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* ── القصة الرئيسية ── */}
          <Rise>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border/30 text-[9px] font-semibold text-muted-foreground">
                  {featured.name.charAt(0)}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{featured.name}</span>
              </div>

              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[11px] text-muted-foreground/70">
                {CLIENT_META.map((m) => (
                  <div key={m.label} className="flex gap-1.5">
                    <dt className="font-medium">{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-12 lg:mt-16">
                <span
                  className="font-display text-[3.5rem] font-bold leading-none tracking-tight text-foreground lg:text-[4.5rem]"
                  dir="ltr"
                >
                  {featured.metrics[0]!.value}
                </span>
                <p className="mt-3 text-sm text-muted-foreground">{featured.metrics[0]!.label}</p>
              </div>

              <blockquote className="mt-14 border-r border-sand/30 pr-6 lg:mt-16">
                <span aria-hidden className="block font-display text-4xl leading-none text-sand/20">
                  &ldquo;
                </span>
                <p className="mt-3 text-base font-medium leading-[1.75] text-foreground/85 lg:text-lg lg:leading-[1.7]">
                  {featured.result}
                </p>
              </blockquote>

              <div className="mt-12 flex flex-wrap gap-2 lg:mt-14">
                {featured.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border/30 px-3 py-1 text-[10px] text-muted-foreground/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Rise>

          {/* ── قصص داعمة ── */}
          <div className="flex flex-col gap-10 lg:gap-12 lg:pt-10">
            {supporting.map((item, i) => (
              <Rise key={item.slug} delay={(i + 1) * STAGGER.item * 1000}>
                <div className="border-r border-border/20 pr-5">
                  <div className="flex items-center gap-2">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded border border-border/20 text-[7px] font-semibold text-muted-foreground/60">
                      {item.name.charAt(0)}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground/60">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/40">·</span>
                    <span className="text-[10px] text-muted-foreground/40">{item.sector}</span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span
                      className="font-display text-xl font-bold leading-none text-foreground/70"
                      dir="ltr"
                    >
                      {item.metrics[0]!.value}
                    </span>
                    <span className="text-[10px] text-muted-foreground/50">
                      {item.metrics[0]!.label}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-[1.8] text-muted-foreground/60">
                    {item.result}
                  </p>

                  <Link
                    to="/case-studies/$slug"
                    params={{ slug: item.slug }}
                    className="link-sweep mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-primary/70"
                  >
                    التفاصيل
                    <ArrowLeft className="h-3 w-3" />
                  </Link>
                </div>
              </Rise>
            ))}
          </div>
        </div>

        {/* ── شريط مؤشرات الثقة ── */}
        <Rise delay={STAGGER.section * 1000 * 4}>
          <div className="mt-24 border-t border-border/20 pt-10 lg:mt-32">
            <dl className="flex flex-wrap justify-between gap-y-6">
              {TRUST_INDICATORS.map((ind, i) => (
                <div key={ind.label} className="flex items-baseline gap-2.5">
                  <dd className="font-display text-lg font-semibold text-foreground/80">
                    {ind.value}
                  </dd>
                  <dt className="text-[11px] text-muted-foreground/50">{ind.label}</dt>
                  {i < TRUST_INDICATORS.length - 1 ? (
                    <span
                      aria-hidden
                      className="mr-4 hidden h-3 w-px bg-border/20 sm:inline-block lg:mr-8"
                    />
                  ) : null}
                </div>
              ))}
            </dl>
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ═══════════ الشريط البصري السعودي — أفق الرياض ═══════════ */

function CityBand() {
  const reduced = useReducedMotion();

  return (
    <section className="relative -mt-px overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-background to-transparent"
      />
      <div className="relative h-56 sm:h-72 lg:h-[26rem]">
        <motion.img
          src={riyadhSkyline}
          alt=""
          aria-hidden
          initial={reduced ? false : { scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.hero * 2.2, ease: EASE.cinematic }}
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/20" />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-background to-transparent"
      />
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
            <span aria-hidden className="h-px w-10 bg-sand" />
            <span className="eyebrow">الأسئلة الشائعة</span>
          </span>
          <h2 className="mt-5 font-display text-[1.75rem] font-bold leading-[1.3] text-balance-ar sm:text-4xl">
            <SplitWords text="أسئلة نسمعها كثيرًا" />
          </h2>
          <Rise delay={120}>
            <p className="mt-6 max-w-sm text-base leading-[1.85] text-muted-foreground">
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
