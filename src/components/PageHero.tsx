import { Rise, SplitWords } from "@/components/motion";

/**
 * ترويسة الصفحات الداخلية — نسخة مختصرة من هيرو الرئيسية:
 * نفس الشبكة الإنشائية ونفس معالجة العنوان، بارتفاع أقل،
 * حتى تُقرأ الصفحات الداخلية كامتداد للرئيسية لا كقالب آخر.
 */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 blueprint opacity-50 [mask-image:radial-gradient(72%_70%_at_78%_30%,black,transparent)]" />
        <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-accent-soft/60 blur-[100px]" />
      </div>

      <div className="container-page relative py-16 lg:py-24">
        <Rise>
          <span className="flex items-center gap-3 text-accent">
            <span aria-hidden className="h-px w-8 bg-sand" />
            <span className="eyebrow">{eyebrow}</span>
          </span>
        </Rise>

        <h1 className="mt-5 max-w-4xl text-[2rem] font-semibold leading-[1.26] text-balance-ar sm:text-4xl lg:text-[3.15rem] lg:leading-[1.2]">
          <SplitWords text={title} />
        </h1>

        {description ? (
          <Rise delay={140}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              {description}
            </p>
          </Rise>
        ) : null}
      </div>
    </section>
  );
}
