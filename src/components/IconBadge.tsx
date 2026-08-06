import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * وعاء الأيقونة الموحّد.
 *
 * الشكل الافتراضي دائرة بحلقة خارجية — وهو النمط السائد في مواقع
 * خدمات الأعمال السعودية، ويقرأ كـ«ختم» لا كزرّ. المربّع متاح للحالات
 * التي تجلس فيها الأيقونة داخل صفّ نصّي ضيّق.
 *
 * النغمة تحدّد الوزن البصري لا اللون العشوائي:
 *   plate   الحالة الافتراضية: قرص محايد وأيقونة رصينة
 *   soft    داخل بطاقة فاتحة تحتاج حضورًا أوضح قليلًا
 *   solid   العنصر النشط أو المميّز في مجموعته
 *   glass   فوق صورة أو سطح داكن
 */
const tones = {
  plate: "bg-secondary text-primary/80 ring-secondary/70",
  soft: "bg-accent-soft text-accent ring-accent-soft/60",
  solid: "bg-primary text-primary-foreground ring-primary/15",
  glass: "panel-ink text-ink-foreground ring-white/10",
} as const;

const sizes = {
  sm: { box: "h-9 w-9", icon: "h-4 w-4", ring: "ring-4" },
  md: { box: "h-12 w-12", icon: "h-5 w-5", ring: "ring-[6px]" },
  lg: { box: "h-16 w-16", icon: "h-7 w-7", ring: "ring-8" },
} as const;

export function IconBadge({
  icon: Icon,
  tone = "plate",
  size = "md",
  shape = "circle",
  /**
   * يجعل الوعاء يتجاوز حافة البطاقة الحاوية.
   * الحاوية يجب أن تكون relative وبها حشو علوي كافٍ.
   */
  overlap = false,
  className,
}: {
  icon: LucideIcon;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  shape?: "circle" | "square";
  overlap?: boolean;
  className?: string;
}) {
  const s = sizes[size];
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center transition-colors duration-500",
        shape === "circle" ? "rounded-full" : "rounded-xl",
        s.box,
        // الحلقة الخارجية بلون الخلفية تفصل القرص عن البطاقة تحته
        overlap && `${s.ring} ring-background`,
        overlap && "absolute -top-6 right-6 shadow-[0_10px_28px_-14px_var(--primary)]",
        tones[tone],
        className,
      )}
    >
      <Icon className={s.icon} strokeWidth={1.75} />
    </span>
  );
}
