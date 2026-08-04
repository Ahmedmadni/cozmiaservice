import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * غلاف القسم — يضبط النغمة والحشو في مكان واحد.
 *
 * إيقاع الصفحة يُبنى بتناوب النغمات: light ← surface ← light ← ink.
 * وجود النغمات في مكوّن واحد يمنع انزلاق الحشو بين الصفحات
 * (كان بعضها py-16 والبعض py-20 بلا سبب).
 */
const tones = {
  light: "bg-background",
  surface: "border-y border-border bg-surface",
  ink: "grain bg-ink text-ink-foreground",
} as const;

export function Section({
  children,
  tone = "light",
  size = "md",
  className,
  innerClassName,
  id,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  /** sm للأقسام المساندة، md للافتراضي، lg للحظات الكبرى. */
  size?: "sm" | "md" | "lg";
  className?: string;
  innerClassName?: string;
  id?: string;
}) {
  const pad =
    size === "sm" ? "py-14 lg:py-20" : size === "lg" ? "py-24 lg:py-32" : "py-20 lg:py-28";

  return (
    <section id={id} className={cn("relative overflow-hidden", tones[tone], className)}>
      {tone === "ink" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 blueprint opacity-[0.05]"
        />
      ) : null}
      <div className={cn("container-page relative", pad, innerClassName)}>{children}</div>
    </section>
  );
}
