import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Magnetic, Rise, SplitWords } from "@/components/motion";
import { PinnedSection } from "@/components/PinnedSection";
import landmarks from "@/assets/saudi-landmarks.jpg";

/**
 * خاتمة الصفحة — صورة معالم المملكة مثبّتة خلف القسم.
 *
 * الصورة ثابتة والمحتوى يمرّ فوقها، فتُقرأ الخاتمة كمشهد واحد
 * مستقر يُغلق السرد، لا كبطاقة إضافية في نهاية القائمة.
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
    <PinnedSection image={landmarks} veil="soft" size="lg" innerClassName="text-center">
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
            className="rounded-md border-white/30 bg-white/10 text-ink-foreground backdrop-blur-md hover:border-white/50 hover:bg-white/20 hover:text-ink-foreground"
          >
            <Link to={secondaryTo}>{secondaryLabel}</Link>
          </Button>
        </div>
      </Rise>
    </PinnedSection>
  );
}
