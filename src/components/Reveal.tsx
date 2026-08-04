import type { ReactNode } from "react";
import { Rise } from "@/components/motion";

/**
 * غلاف توافقي: يوجّه الاستخدامات القديمة إلى نظام الحركة الموحّد.
 *
 * كان هذا المكوّن يطبّق IntersectionObserver وانتقالات CSS خاصة به،
 * فتتحرّك الصفحات الداخلية بمنحنى وتوقيت مختلفين عن الرئيسية.
 * الاحتفاظ به كغلاف يُبقي مواقع الاستدعاء كما هي بلا تغيير واسع.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  return (
    <Rise delay={delay} as={as} {...(className ? { className } : {})}>
      {children}
    </Rise>
  );
}
