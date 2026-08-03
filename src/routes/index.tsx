import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Layers,
  ListChecks,
  Puzzle,
  Radar,
  Settings2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTASection } from "@/components/CTASection";
import { VisionSection } from "@/components/VisionSection";
import { ServiceGridCard } from "@/components/ServiceGridCard";
import heroServices from "@/assets/hero-services.jpg";
import { site } from "@/data/site";
import { processSteps, projectStages, stages, whyUs } from "@/data/solutions";
import { services, stageHighlights, stageIcons } from "@/data/services";
import { caseStudies } from "@/data/content";

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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const trustPoints = ["حلول متكاملة", "تجربة مخصصة", "فريق وخبرات متنوعة", "دعم مستمر للنمو"];
const heroNodes = ["هوية", "موقع", "نظام", "نمو"];

const challenges = [
  {
    icon: Layers,
    title: "تعدد مزودي الخدمات",
    desc: "جهة للهوية وأخرى للموقع وثالثة للتسويق… بلا تنسيق بينها.",
  },
  {
    icon: ListChecks,
    title: "عدم وضوح الأولويات",
    desc: "جهد يتوزّع على مهام كثيرة قبل إنجاز الأساسيات.",
  },
  {
    icon: Puzzle,
    title: "صعوبة اختيار الحلول",
    desc: "خيارات كثيرة وأنظمة متشابهة دون معيار واضح للمفاضلة.",
  },
  {
    icon: Radar,
    title: "تشتت الجهود التسويقية",
    desc: "نشاط متقطّع بلا خطة ولا مؤشرات قياس.",
  },
  {
    icon: Settings2,
    title: "ضعف تنظيم العمليات",
    desc: "إجراءات غير مكتوبة ومعلومات متفرقة يصعب الرجوع إليها.",
  },
  {
    icon: UserPlus,
    title: "صعوبة بناء فريق مناسب",
    desc: "تحديد الأدوار المطلوبة والوصول إلى الكفاءات المناسبة.",
  },
];

function Index() {
  return (
    <>
      <Hero />
      <ChallengesSection />
      <StagesSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <StagePicker />
      <VisionSection />
      <CaseStudiesSection />
      <CTASection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent-soft blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-primary-soft blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_left,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]"
      />

      <div className="container-page relative grid gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            حلول أعمال ونمو للشركات الناشئة والمنشآت الصغيرة
          </span>

          <h1 className="mt-6 text-[1.9rem] font-bold leading-[1.35] text-balance-ar sm:text-4xl lg:text-[3.25rem] lg:leading-[1.25]">
            نبني أساس مشروعك… <span className="text-accent">ونساعده على النمو</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground lg:text-lg">
            من الهوية والموقع إلى تنظيم العمليات واختيار الأنظمة والتسويق، نجمع احتياجات مشروعك في
            رحلة واحدة واضحة ومتكاملة.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link to="/services">استكشف خدماتنا</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/assessment">ابدأ تقييم مشروعك</Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 shrink-0 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>

      <div className="container-page relative pb-14 lg:pb-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-card p-6 fade-up"
              style={{ animationDelay: `${480 + i * 80}ms` }}
            >
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="mt-2 text-2xl font-bold text-primary">{stat.value}</dd>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{stat.hint}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative fade-up" style={{ animationDelay: "160ms" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-accent-soft/60 blur-3xl"
      />
      <figure className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_36px_90px_-50px_var(--primary)]">
        <img
          src={heroServices}
          alt="رسم توضيحي لخدمات الشركة: بناء الهوية، الموقع والمتجر، الأنظمة، والتسويق ونمو الأعمال"
          width={1280}
          height={1024}
          className="h-full w-full object-cover"
        />
      </figure>

      <div
        className="mt-4 grid gap-3 sm:absolute sm:-bottom-8 sm:-left-4 sm:mt-0 sm:w-56"
        style={{ animationDelay: "420ms" }}
      >
        <div className="rounded-2xl border border-border bg-card/95 p-4 shadow-[0_24px_60px_-40px_var(--primary)] backdrop-blur fade-up">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="text-xs font-semibold">رحلة واحدة متكاملة</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {heroNodes.map((node) => (
              <span
                key={node}
                className="rounded-lg border border-border bg-surface px-2 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {node}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function ChallengesSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-16 lg:py-24">
        <SectionHeader
          eyebrow="التحديات"
          title="إدارة مشروعك لا يجب أن تعني التعامل مع عشرات الجهات"
          description="أكثر ما يعطّل المشاريع الناشئة ليس نقص الجهد، بل تشتّته بين جهات وأدوات وأولويات غير مرتبطة."
          align="center"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
                  <c.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center text-center">
          <span aria-hidden className="h-10 w-px bg-border" />
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-9 text-balance-ar sm:text-xl">
            لهذا جمعنا أهم احتياجات المشروع ضمن منظومة واحدة.
          </p>
          <div aria-hidden className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {stages.map((s, i) => (
              <span key={s.slug} className="flex items-center gap-2">
                <span className="rounded-full border border-accent/40 bg-card px-4 py-1.5 text-sm font-medium">
                  {s.title}
                </span>
                {i < stages.length - 1 ? (
                  <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StagesSection() {
  return (
    <section className="container-page py-16 lg:py-24">
      <SectionHeader
        eyebrow="رحلة المشروع"
        title="حلول متكاملة لمراحل مشروعك"
        description="ابدأ ← نظّم ← انطلق ← نمُ. نبدأ من حيث أنت، لا من حيث تبدأ القوائم."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, i) => {
          const Icon = stageIcons[stage.slug]!;
          return (
            <Reveal key={stage.slug} delay={i * 70}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_22px_50px_-34px_var(--primary)]">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold">{stage.title}</h3>
                <p className="mt-2 text-sm font-medium text-foreground/80">{stage.headline}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {stageHighlights[stage.slug]}
                </p>
                <Link
                  to="/growth-stages"
                  hash={stage.slug}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-primary transition-transform hover:-translate-x-1"
                >
                  اعرف كيف نساعدك
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <SectionHeader
            eyebrow="خدماتنا"
            title="ستة مجالات مترابطة تغطي احتياجات مشروعك"
            description="كل مجال يمكن أن يبدأ مستقلًا، لكن قيمته الحقيقية تظهر حين ترتبط المجالات ببعضها ضمن خطة واحدة."
          />
          <Link
            to="/services"
            className="hidden items-center gap-2 text-sm font-medium text-primary sm:inline-flex"
          >
            جميع الخدمات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceGridCard service={service} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 sm:hidden">
          <Button asChild className="w-full">
            <Link to="/services">شاهد جميع الخدمات</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="container-page py-16 lg:py-24">
      <SectionHeader eyebrow="لماذا نحن؟" title="حلول مترابطة صُممت حول احتياجات مشروعك" />
      <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <div className="border-t border-border pt-5">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-16 lg:py-24">
        <SectionHeader eyebrow="كيف نعمل؟" title="رحلة واضحة من الاحتياج إلى التنفيذ" />
        <ol className="mt-12 grid gap-6 md:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <li className="relative h-full md:pt-8">
                <span
                  aria-hidden
                  className="absolute right-0 top-3 hidden h-px w-full bg-border md:block"
                />
                <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-accent bg-background text-xs font-bold text-accent md:absolute md:-top-1.5 md:right-0">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold md:mt-2">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StagePicker() {
  const [active, setActive] = useState(projectStages[0]!.id);
  const current = projectStages.find((s) => s.id === active) ?? projectStages[0]!;

  return (
    <section className="container-page py-16 lg:py-24">
      <SectionHeader eyebrow="أين مشروعك الآن؟" title="الحلول حسب مرحلة المشروع" />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {projectStages.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              aria-pressed={active === s.id}
              className={`rounded-2xl border p-5 text-right transition-all duration-300 ${
                active === s.id
                  ? "border-accent bg-card shadow-[0_18px_44px_-32px_var(--primary)]"
                  : "border-border bg-card/60 hover:border-accent/50"
              }`}
            >
              <h3 className="text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.desc}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <span className="text-xs font-medium text-accent">حلول مقترحة</span>
          <h3 className="mt-2 text-lg font-bold">{current.title}</h3>
          <ul className="mt-5 space-y-3">
            {current.solutions.map((sol) => (
              <li key={sol} className="flex gap-3 text-sm leading-7">
                <Check className="mt-1.5 h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0">{sol}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-6 w-full">
            <Link to="/growth-stages" hash={current.stage}>
              شاهد حلول هذه المرحلة
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <SectionHeader eyebrow="قصص النجاح" title="نتائج من مشاريع عملنا معها" />
          <Link
            to="/case-studies"
            className="hidden items-center gap-2 text-sm font-medium text-primary sm:inline-flex"
          >
            كل القصص
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((item, i) => (
            <Reveal key={item.slug} delay={i * 70}>
              <CaseStudyCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
