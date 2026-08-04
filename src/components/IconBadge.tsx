import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * وعاء الأيقونة الموحّد.
 *
 * كل أيقونة في الموقع تجلس داخل هذا الوعاء — لا مربعات مرتجلة.
 * النغمة تحدّد الوزن البصري لا اللون العشوائي:
 *   soft    الحالة الافتراضية داخل بطاقة فاتحة
 *   solid   العنصر النشط أو المميّز في مجموعته
 *   glass   فوق صورة أو سطح داكن
 *   outline ثانوي، لا يزاحم المحتوى
 */
const tones = {
  soft: "bg-secondary text-primary",
  solid: "bg-primary text-primary-foreground",
  glass: "panel-ink text-ink-foreground",
  outline: "border border-border bg-card/60 text-primary",
} as const;

const sizes = {
  sm: { box: "h-9 w-9 rounded-lg", icon: "h-4 w-4" },
  md: { box: "h-11 w-11 rounded-xl", icon: "h-5 w-5" },
  lg: { box: "h-14 w-14 rounded-2xl", icon: "h-6 w-6" },
} as const;

export function IconBadge({
  icon: Icon,
  tone = "soft",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center transition-colors duration-500",
        s.box,
        tones[tone],
        className,
      )}
    >
      <Icon className={s.icon} strokeWidth={1.75} />
    </span>
  );
}
