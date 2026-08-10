import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { DUR, EASE, STAGGER } from "@/components/motion";
import { cn } from "@/lib/utils";
import heroSkyline from "@/assets/hero-skyline.webp";

export function HeroComposition({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });
  const imgX = useTransform(sx, (v) => v * 8);
  const imgY = useTransform(sy, (v) => v * 6);

  return (
    <div
      ref={ref}
      className={cn("relative aspect-[4/5]", className)}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[1.5rem] rounded-tl-[3.5rem]"
        initial={reduced ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: DUR.hero * 1.8,
          ease: EASE.cinematic,
          delay: STAGGER.section * 2,
        }}
      >
        <motion.img
          src={heroSkyline}
          alt=""
          width={760}
          height={1018}
          fetchPriority="low"
          decoding="async"
          className="absolute inset-[-4%] h-[108%] w-[108%] object-cover"
          style={{ x: imgX, y: imgY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/20 to-transparent" />
        <div className="absolute inset-0 arabesque opacity-[0.03]" />
      </motion.div>

      <motion.span
        aria-hidden
        className="absolute -left-6 top-[18%] h-px w-14 origin-right bg-sand/40"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: DUR.hero,
          ease: EASE.cinematic,
          delay: STAGGER.section * 5,
        }}
      />

      <motion.div
        className="absolute inset-x-[6%] bottom-[5%] z-10"
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: DUR.hero,
          ease: EASE.cinematic,
          delay: STAGGER.section * 7,
        }}
      >
        <div className="flex items-center justify-between gap-3 rounded-xl bg-white/85 px-4 py-3 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-semibold text-foreground">نقطة تواصل واحدة</span>
          </div>
          <span className="text-[11px] text-muted-foreground">بدل التعامل مع عدة جهات</span>
        </div>
      </motion.div>
    </div>
  );
}
