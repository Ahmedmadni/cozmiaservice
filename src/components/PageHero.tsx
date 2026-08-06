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
          <span aria-hidden className="h-px w-10 bg-sand" />
          <span className="eyebrow">{eyebrow}</span>
        </span>
      </Rise>

      <h1 className="mt-7 max-w-4xl text-[2rem] font-bold leading-[1.26] text-balance-ar sm:text-4xl lg:text-[3.15rem] lg:leading-[1.2]">
        <SplitWords text={title} />
      </h1>

      {description ? (
        <Rise delay={140}>
          <p
            className={
              "mt-7 max-w-xl text-base leading-[1.85] " +
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
        <div className="absolute inset-0 arabesque opacity-60 [mask-image:radial-gradient(65%_60%_at_85%_35%,black,transparent)]" />
        <div className="absolute inset-0 blueprint opacity-30 [mask-image:radial-gradient(50%_50%_at_20%_70%,black,transparent)]" />
        <div className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-accent-soft/50 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-sand/8 blur-[100px]" />
      </div>
      <div className="container-page relative py-24 lg:py-36">{body}</div>
    </section>
  );
}
