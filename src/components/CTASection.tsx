import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

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
    <section className="container-page py-16 lg:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-10 h-72 w-72 rounded-full bg-sand/20 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <h2 className="text-2xl font-bold text-balance-ar sm:text-3xl lg:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-8 text-primary-foreground/80">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to={primaryTo}>{primaryLabel}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to={secondaryTo}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
