import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { GrowthStageCard } from "@/components/GrowthStageCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTASection } from "@/components/CTASection";
import { VisionSection } from "@/components/VisionSection";
import { site } from "@/data/site";
import {
  problems,
  processSteps,
  projectStages,
  stages,
  systemCategories,
  whyUs,
} from "@/data/solutions";
import { caseStudies } from "@/data/content";

const title = `${site.name} | ${site.tagline}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: site.description },
      { property: "og:title", content: title },
      { property: "og:description", content: site.description },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: site.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const trustPoints = ["حلول متكاملة", "تجربة مخصصة", "فريق وخبرات متنوعة", "دعم مستمر للنمو"];
const heroNodes = ["فكرة", "هوية", "موقع", "نظام", "تسويق", "نمو"];

function Index() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <WhyUsSection />
      <ProcessSection />
      <StagePicker />
      <VisionSection />
      <SystemsSection />

      <CaseStudiesSection />
      <CTASection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent-soft blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-primary-soft blur-3xl"
      />
      <div className="container-page relative grid gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            حلول أعمال ونمو للشركات الناشئة والمنشآت الصغيرة
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-[1.3] text-balance-ar sm:text-4xl lg:text-[3.25rem]">
            كل ما يحتاجه مشروعك للانطلاق والنمو… <span className="text-accent">في مكان واحد</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground lg:text-lg">
            نساعد الشركات الناشئة والمنشآت الصغيرة على بناء أساس منظم، وصناعة حضور احترافي، واختيار
            الحلول المناسبة، وتطوير أعمالها من خلال خدمات متكاملة تجمع بين التنظيم والتقنية والتصميم
            والتسويق ودعم التشغيل.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact">ابدأ رحلة مشروعك</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/solutions">استكشف الحلول</Link>
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
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative fade-up" style={{ animationDelay: "160ms" }} aria-hidden>
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <div className="absolute inset-6 rounded-full border border-dashed border-border" />
        <div className="absolute inset-16 rounded-full border border-dashed border-border" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-28 w-28 place-items-center rounded-2xl bg-primary text-center text-sm font-semibold leading-6 text-primary-foreground shadow-[0_24px_60px_-30px_var(--primary)]">
            مشروعك
          </div>
        </div>
        {heroNodes.map((node, i) => {
          const angle = (i / heroNodes.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 43;
          const left = 50 + radius * Math.cos(angle);
          const top = 50 + radius * Math.sin(angle);
          return (
            <div
              key={node}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold shadow-[0_12px_30px_-24px_var(--primary)] fade-up"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${240 + i * 90}ms`,
              }}
            >
              {node}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-16 lg:py-24">
        <SectionHeader
          eyebrow="المشكلة"
          title="إدارة مشروعك لا يجب أن تعني التعامل مع عشرات الجهات"
          description="بين بناء الهوية، وإنشاء الموقع، واختيار الأنظمة، وتنظيم العمليات، وإدارة التسويق، قد يضيع وقت صاحب المشروع بين جهات متعددة. نحن نساعدك على جمع احتياجات مشروعك ضمن رحلة واضحة ومنظمة."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="container-page py-16 lg:py-24">
      <SectionHeader
        eyebrow="الحل"
        title="شريك واحد… رحلة متكاملة"
        description="أربع مراحل تمثل رحلة نمو مشروعك: ابدأ ← نظّم ← انطلق ← نمُ. نبدأ من حيث أنت، لا من حيث تبدأ القوائم."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, i) => (
          <Reveal key={stage.slug} delay={i * 70}>
            <GrowthStageCard stage={stage} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-16 lg:py-24">
        <SectionHeader
          eyebrow="لماذا نحن؟"
          title="حلول مترابطة صُممت حول احتياجات مشروعك"
        />
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
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="container-page py-16 lg:py-24">
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
    </section>
  );
}

function StagePicker() {
  const [active, setActive] = useState(projectStages[0]!.id);
  const current = projectStages.find((s) => s.id === active) ?? projectStages[0]!;

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-16 lg:py-24">
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
                  {sol}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link to="/growth-stages" hash={current.stage}>
                تفاصيل هذه المرحلة
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemsSection() {
  return (
    <section className="container-page py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeader
          eyebrow="البرامج والأنظمة"
          title="اختر الأدوات المناسبة قبل أن تستثمر فيها"
          description="نساعدك على فهم احتياجات منشأتك، ومقارنة الحلول المتاحة، وترشيح البرامج المناسبة، وتأهيل فريقك لاستخدامها بكفاءة."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {systemCategories.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.desc}</p>
              </div>
            </Reveal>
          ))}
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
