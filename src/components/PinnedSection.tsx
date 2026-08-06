import type { ReactNode } from "react";
import { Constellation } from "@/components/Constellation";
import { cn } from "@/lib/utils";

/**
 * قسم بصورة مثبّتة خلفه.
 *
 * الصورة ثابتة بالنسبة للنافذة (background-attachment: fixed)، فيمرّ
 * المحتوى فوقها أثناء التمرير ويتولّد إحساس العمق دون أي جافاسكربت.
 *
 * ملاحظتان تقنيّتان:
 * — التثبيت معطّل على الشاشات الصغيرة: متصفحات الجوال تتعامل معه
 *   بشكل متقطّع، فيتحوّل التأثير إلى اهتزاز. تعود الصورة ثابتة عاديًا.
 * — الطبقة الحبرية فوق الصورة كثيفة عمدًا: الصورة هنا نسيج بصري
 *   يحمل النص، وليست لوحة تُقرأ بذاتها.
 */
export function PinnedSection({
  image,
  children,
  className,
  innerClassName,
  size = "md",
  /** شدّة الحجاب الحبري: كلما زاد النص فوق الصورة زادت الحاجة إليه. */
  veil = "strong",
  id,
}: {
  image: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  size?: "sm" | "md" | "lg";
  veil?: "soft" | "strong";
  id?: string;
}) {
  const pad =
    size === "sm" ? "py-16 lg:py-24" : size === "lg" ? "py-28 lg:py-40" : "py-24 lg:py-32";

  return (
    <section
      id={id}
      className={cn("grain relative overflow-hidden bg-ink text-ink-foreground", className)}
    >
      <div
        aria-hidden
        role="presentation"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          /*
           * الحجاب كثيف: الصورة هنا نسيج يحمل نصًا كبيرًا، والنص
           * يسبق الصورة في الأولوية. تظهر المعالم كطيف لا كلوحة.
           */
          veil === "strong" ? "bg-ink/92" : "bg-gradient-to-t from-ink/96 via-ink/86 to-ink/90",
        )}
      />
      <Constellation className="opacity-[0.12]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 arabesque opacity-[0.1] [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]"
      />

      <div className={cn("container-page relative", pad, innerClassName)}>{children}</div>
    </section>
  );
}
