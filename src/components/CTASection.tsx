import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Magnetic, Rise, SplitWords } from "@/components/motion";

/**
 * خاتمة الصفحة — السطح الداكن الثاني والأخير.
 * تُغلق السرد بنفس لون القسم الذي فتح المشكلة، فتقرأ الصفحة
 * كقوس مكتمل بدل سلسلة أقسام منفصلة.
 */
export function CTASection({
  title = "هل مشروعك مستعد للمرحلة التالية؟",
  description = "ابدأ بتقييم احتياجات مشروعك، ودعنا نساعدك على ترتيب الأولويات واختيار الخطوة المناسبة.",
  primaryLabel = "احجز جلسة تعريفية",
  primaryTo = "/contact",
  secondaryLabel = "مقياس جاهزية المشروع",
  secondaryTo = "/assessment",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink text-ink-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 blueprint opacity-[0.05]" />
        <div className="absolute -right-24 -top-32 h-[30rem] w-[30rem] rounded-full bg-accent/16 blur-[120px]" />
        <div className="absolute -bottom-40 -left-20 h-[26rem] w-[26rem] rounded-full bg-sand/10 blur-[120px]" />
      </div>

      <div className="container-page relative py-24 text-center lg:py-32">
        <Rise>
          <span className="flex items-center justify-center gap-3 text-accent">
            <span aria-hidden className="h-px w-8 bg-sand" />
            <span className="eyebrow">الخطوة التالية</span>
            <span aria-hidden className="h-px w-8 bg-sand" />
          </span>
        </Rise>

        <h2 className="mx-auto mt-6 max-w-3xl text-[1.9rem] font-semibold leading-[1.28] text-balance-ar sm:text-4xl lg:text-[3rem] lg:leading-[1.22]">
          <SplitWords text={title} />
        </h2>

        <Rise delay={120}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-muted">{description}</p>
        </Rise>

        <Rise delay={200}>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Magnetic>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link to={primaryTo}>{primaryLabel}</Link>
              </Button>
            </Magnetic>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass-dark glass-edge border-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
            >
              <Link to={secondaryTo}>{secondaryLabel}</Link>
            </Button>
          </div>
        </Rise>
      </div>
    </section>
  );
}
