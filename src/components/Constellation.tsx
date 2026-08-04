import { cn } from "@/lib/utils";

/**
 * غلاف رقيق فوق أداة `constellation` في نظام التصميم.
 *
 * النسيج ساكن تمامًا: خلفية متحركة تسرق الانتباه من النص فوقها.
 * التحكّم في شدّته يتم بـ opacity من موقع الاستدعاء.
 */
export function Constellation({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("constellation pointer-events-none absolute inset-0", className)}
    />
  );
}
