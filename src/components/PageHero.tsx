import { Rise, SplitWords } from "@/components/motion";
import { PinnedSection } from "@/components/PinnedSection";

/**
 * ترويسة الصفحات الداخلية — نفس معالجة العنوان في الرئيسية بارتفاع أقل،
 * حتى تُقرأ الصفحات الداخلية كامتداد للرئيسية لا كقالب آخر.
 *
 * تمرير `image` يحوّلها إلى ترويسة بصورة مثبّتة خلفها: الصورة تبقى
 * ساكنة بالنسبة للنافذة والمحتوى يمرّ فوقها. تُستخدم في الصفحات التي
 * تستحق افتتاحية بصرية (التواصل، مراحل النمو)، لا في كل صفحة —
 * تكرارها على كل صفحة يُفقدها أثرها.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
}) {
  const body = (
    <>
      <Rise>
        <span className="flex items-center gap-3 text-accent">
          <span aria-hidden className="h-px w-8 bg-sand" />
          <span className="eyebrow">{eyebrow}</span>
        </span>
      </Rise>

      <h1 className="mt-5 max-w-4xl text-[2rem] font-bold leading-[1.26] text-balance-ar sm:text-4xl lg:text-[3.15rem] lg:leading-[1.2]">
        <SplitWords text={title} />
      </h1>

      {description ? (
        <Rise delay={140}>
          <p
            className={
              "mt-6 max-w-2xl text-base leading-8 " +
              (image ? "text-ink-muted" : "text-muted-foreground")
            }
          >
            {description}
          </p>
        </Rise>
      ) : null}
    </>
  );

  if (image) {
    return (
      <PinnedSection image={image} veil="strong" size="sm">
        {body}
      </PinnedSection>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 blueprint opacity-50 [mask-image:radial-gradient(72%_70%_at_78%_30%,black,transparent)]" />
        <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-accent-soft/60 blur-[100px]" />
      </div>
      <div className="container-page relative py-16 lg:py-24">{body}</div>
    </section>
  );
}
