import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PointerGlow } from "@/components/motion";
import type { CaseStudy } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * بطاقة قصة نجاح. الصيغة المميّزة (featured) تُستخدم لقصة واحدة فقط
 * في الشبكة — التفاوت في الحجم هو ما يكسر رتابة الصفوف المتطابقة.
 */
export function CaseStudyCard({ item, featured = false }: { item: CaseStudy; featured?: boolean }) {
  return (
    <PointerGlow className="h-full rounded-2xl">
      <Link
        to="/case-studies/$slug"
        params={{ slug: item.slug }}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 card-hover",
          featured ? "glass-strong glass-edge lg:p-8" : "glass glass-edge",
        )}
      >
        {featured ? (
          <span
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-accent-soft/60 blur-3xl"
          />
        ) : null}

        <span className="relative eyebrow text-accent">{item.sector}</span>
        <h3
          className={cn(
            "relative mt-3 font-display font-semibold",
            featured ? "text-xl lg:text-2xl" : "text-lg",
          )}
        >
          {item.name}
        </h3>
        <p
          className={cn(
            "relative mt-3 text-sm leading-7 text-muted-foreground",
            featured ? "line-clamp-none" : "line-clamp-3",
          )}
        >
          {item.challenge}
        </p>

        {featured ? (
          <p className="relative mt-4 text-sm leading-7 text-foreground/80">{item.result}</p>
        ) : null}

        {/*
         * المؤشرات كقائمة رأسية لا كأعمدة: التسميات العربية أطول من أن
         * تتّسع في ثلث عرض البطاقة، والأعمدة كانت تقتطعها.
         */}
        <dl className="relative mt-6 border-t border-border/70 pt-4">
          {item.metrics.map((m) => (
            <div
              key={m.label}
              className="flex items-baseline justify-between gap-4 border-b border-border/50 py-2.5 last:border-b-0"
            >
              <dt className="min-w-0 text-[11px] leading-5 text-muted-foreground">{m.label}</dt>
              <dd
                // القيم الرقمية الصِرفة (−45%، ×3) تُعزل كـ LTR حتى لا يقلب
                // محرّك الاتجاه موضع الإشارة. القيم التي تحوي عربية تُترك كما هي.
                {...(/[؀-ۿ]/.test(m.value) ? {} : { dir: "ltr" as const })}
                className={cn(
                  "shrink-0 font-display font-semibold tabular-nums",
                  featured ? "text-base" : "text-sm",
                )}
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        <span className="link-sweep relative mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-medium text-primary">
          اقرأ القصة
          <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
        </span>
      </Link>
    </PointerGlow>
  );
}
