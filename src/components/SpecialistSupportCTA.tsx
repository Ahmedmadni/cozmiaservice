import { Link } from "@tanstack/react-router";
import { ArrowLeft, UsersRound, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/IconBadge";
import { Rise } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * دعوة «توفير الكفاءات» — لوح قابل لإعادة الاستخدام داخل صفحات الخدمات.
 *
 * الغرض منه إبراز أن دور الشركة هو مساعدة العميل على تحديد احتياجه
 * وتوفير أو تنسيق الكفاءات المناسبة له، لا تقديم الأعمال المهنية
 * المرخصة مباشرة.
 *
 * كل النصوص والرابط قابلة للتخصيص عبر Props ليُستخدم لاحقًا مع خدمات
 * أخرى دون نسخ المكوّن. تُمرَّر `serviceSlug` فتُرفق بالرابط كمعامل بحث
 * ليصل الطلب ومعه معرفة الخدمة التي جاء منها الزائر.
 */
export function SpecialistSupportCTA({
  title = "فريق متخصص يدعم أعمالك",
  description = "نساعدك على توفير الكفاءات المناسبة لمتابعة وتنظيم العمليات والسجلات المحاسبية وفق احتياجات منشأتك، مع مرونة في نطاق الدعم وآلية العمل.",
  ctaLabel = "اطلب فريقًا متخصصًا",
  ctaTo = "/contact",
  helperText = "شاركنا احتياجك، وسنساعدك على تحديد الدعم المناسب وخطوات البدء.",
  serviceSlug,
  icon = UsersRound,
  className,
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
  helperText?: string;
  /** معرّف الخدمة التي انطلق منها الطلب — يُرفق بالرابط. */
  serviceSlug?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <Rise>
      <div
        className={cn(
          "glass glass-edge relative overflow-hidden rounded-3xl p-7 sm:p-10",
          className,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-accent-soft blur-3xl"
        />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="min-w-0">
            <div className="flex items-start gap-4">
              <IconBadge icon={icon} tone="soft" size="lg" />
              <div className="min-w-0">
                <span className="eyebrow text-accent">دعم متخصص</span>
                <h2 className="mt-2 font-display text-xl font-semibold text-balance-ar sm:text-2xl">
                  {title}
                </h2>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>

          <div className="shrink-0 lg:max-w-xs lg:text-left">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to={ctaTo} {...(serviceSlug ? { search: { service: serviceSlug } } : {})}>
                {ctaLabel}
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-xs leading-7 text-muted-foreground">{helperText}</p>
          </div>
        </div>
      </div>
    </Rise>
  );
}
