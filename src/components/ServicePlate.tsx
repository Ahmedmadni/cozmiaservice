import { motion, useReducedMotion } from "framer-motion";
import { Constellation } from "@/components/Constellation";
import { IconBadge } from "@/components/IconBadge";
import { DUR, EASE, STAGGER } from "@/components/motion";
import skyline from "@/assets/hero-skyline.webp";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * لوحة الخدمة — بديل مصمَّم عن الرسم التوضيحي.
 *
 * الرسوم التوضيحية المسطّحة هي أوضح ما يجعل الموقع يُقرأ كأنه مولَّد
 * آليًا. اللوحة هنا تبني الصورة من عناصر الخدمة نفسها: رقمها الفهرسي،
 * أيقونتها، وبنودها — فوق نسيج معماري داكن مشترك بين الخدمات الست.
 *
 * النسيج واحد لكل الخدمات عن قصد: التمييز يأتي من المحتوى لا من صورة
 * مختلفة لكل بطاقة، فيبقى القسم متماسكًا بصريًا.
 */
export function ServicePlate({
  service,
  index,
  className,
}: {
  service: Service;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "grain relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink text-ink-foreground",
        className,
      )}
    >
      <img
        src={skyline}
        alt=""
        aria-hidden
        width={760}
        height={1018}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/78" />
      <Constellation className="opacity-[0.13]" />
      <div
        aria-hidden
        className="absolute -left-1/4 top-1/3 h-2/3 w-2/3 rounded-full bg-accent/18 blur-[90px]"
      />

      <div className="relative flex h-full flex-col justify-between p-7 lg:p-9">
        <div className="flex items-start justify-between">
          <IconBadge icon={service.icon} tone="glass" size="lg" />
          <span
            className="font-display text-5xl font-bold leading-none text-sand/35 lg:text-6xl"
            data-num
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div>
          <span aria-hidden className="block h-px w-16 bg-sand/60" />
          <p className="mt-5 max-w-xs text-sm leading-7 text-ink-muted">{service.short}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {service.items.slice(0, 4).map((item, i) => (
              <motion.li
                key={item}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{
                  duration: DUR.large,
                  ease: EASE.cinematic,
                  delay: 0.08 + i * STAGGER.item,
                }}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] text-ink-foreground/85 backdrop-blur-sm"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
