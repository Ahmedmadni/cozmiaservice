/**
 * تكوين الهيرو — مبني بالكود بالكامل (SVG + طبقات زجاجية).
 *
 * الفكرة البصرية: منظومة مشروع واحدة. أربع بطاقات زجاجية على أربعة
 * أعماق مختلفة، يربطها مسار واحد يُرسم عند التحميل — لأن الرسالة
 * الأساسية للشركة هي «الترابط»، فالصورة يجب أن تقولها لا أن تزخرفها.
 *
 * الخلفية صورة معمارية عند الزرقة، بحجاب حبري كثيف: تعطي عمقًا
 * ماديًا تعجز عنه التدرجات، ويبقى النص فوقها مقروءًا. وزنها 16KB.
 */
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Compass, LineChart, MonitorSmartphone, Workflow } from "lucide-react";
import { useRef } from "react";
import { EASE } from "@/components/motion";
import skyline from "@/assets/hero-skyline.webp";
import { cn } from "@/lib/utils";

type Node = {
  id: string;
  label: string;
  caption: string;
  icon: typeof Compass;
  /** الموضع بالنسبة المئوية داخل التكوين — ترتيب غير متماثل عن قصد. */
  x: number;
  y: number;
  /** عامل العمق: 1 = الطبقة الأمامية. */
  depth: number;
};

const nodes: Node[] = [
  {
    id: "identity",
    label: "الهوية",
    caption: "أساس بصري واضح",
    icon: Compass,
    x: 46,
    y: 6,
    depth: 0.55,
  },
  {
    id: "presence",
    label: "الحضور الرقمي",
    caption: "موقع ومتجر",
    icon: MonitorSmartphone,
    x: 4,
    y: 27,
    depth: 1,
  },
  {
    id: "systems",
    label: "الأنظمة",
    caption: "تشغيل منظّم",
    icon: Workflow,
    x: 52,
    y: 52,
    depth: 0.75,
  },
  {
    id: "growth",
    label: "النمو",
    caption: "قياس ومتابعة",
    icon: LineChart,
    x: 2,
    y: 72,
    depth: 0.4,
  },
];

/** مسار الربط بين المراكز — بإحداثيات viewBox 100×100. */
const CONNECTOR = "M 62 16 C 40 20, 30 28, 24 38 C 18 50, 44 54, 68 62 C 84 68, 40 74, 22 82";

export function HeroComposition({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // موازاة المؤشر: مصدر واحد للحركة، وكل طبقة تشتق إزاحتها من عمقها.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[5/6] w-full select-none sm:aspect-[6/5] lg:aspect-[5/6]",
        className,
      )}
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
      <Backdrop x={sx} y={sy} />

      {/* المسار الرابط — يُرسم مرة واحدة، ثم يبقى ساكنًا. */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <motion.path
          d={CONNECTOR}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={0.35}
          strokeLinecap="round"
          strokeDasharray="1.6 2.2"
          vectorEffect="non-scaling-stroke"
          initial={reduced ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.1, ease: EASE.inOut, delay: 0.5 }}
        />
      </svg>

      {nodes.map((node, i) => (
        <NodeCard key={node.id} node={node} index={i} x={sx} y={sy} />
      ))}

      <ReadinessStrip x={sx} y={sy} />
    </div>
  );
}

/* ── الخلفية: طبقة عمق واحدة بلون الحبر، وليست تدرجًا ملوّنًا ── */

function Backdrop({ x, y }: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> }) {
  const tx = useTransform(x, (v) => v * -8);
  const ty = useTransform(y, (v) => v * -8);

  return (
    <motion.div
      aria-hidden
      style={{ x: tx, y: ty }}
      className="absolute inset-[-6%] grain overflow-hidden rounded-[2rem] bg-ink"
    >
      <img
        src={skyline}
        alt=""
        aria-hidden
        width={760}
        height={1018}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      {/* الحجاب: الصورة نسيج يحمل البطاقات، لا لوحة تُقرأ بذاتها. */}
      <div className="absolute inset-0 bg-ink/58" />
      <div className="absolute inset-0 blueprint opacity-[0.04]" />
      <div className="absolute inset-0 arabesque opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
      {/* ضوءان فقط: واحد تركوازي وواحد رملي — لا أكثر. */}
      <div className="absolute -right-1/4 -top-1/4 h-2/3 w-2/3 rounded-full bg-accent/22 blur-[90px]" />
      <div className="absolute -bottom-1/3 -left-1/4 h-2/3 w-2/3 rounded-full bg-sand/10 blur-[100px]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent" />
    </motion.div>
  );
}

/* ── بطاقة العقدة ─────────────────────────────────────────── */

function NodeCard({
  node,
  index,
  x,
  y,
}: {
  node: Node;
  index: number;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}) {
  const reduced = useReducedMotion();
  const Icon = node.icon;
  const tx = useTransform(x, (v) => v * 18 * node.depth);
  const ty = useTransform(y, (v) => v * 14 * node.depth);

  return (
    <motion.div
      className="absolute w-[54%] max-w-[15rem] sm:w-[46%]"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        x: tx,
        y: ty,
        zIndex: Math.round(node.depth * 10),
      }}
      initial={reduced ? false : { opacity: 0, y: 26, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: EASE.cinematic, delay: 0.25 + index * 0.13 }}
    >
      <div className="glass-dark glass-edge rounded-2xl p-4 text-ink-foreground">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/18 text-accent">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="eyebrow text-sand/80" data-num>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-3 text-sm font-semibold">{node.label}</p>
        <p className="mt-1 text-[11px] leading-5 text-ink-muted">{node.caption}</p>
        {node.id === "growth" ? <Sparkline /> : null}
      </div>
    </motion.div>
  );
}

/** خط نمو صغير — العنصر الوحيد الذي «يرسم» بيانات، فيبقى مميزًا. */
function Sparkline() {
  const reduced = useReducedMotion();
  return (
    <svg aria-hidden viewBox="0 0 100 32" className="mt-3 h-8 w-full overflow-visible">
      <motion.polyline
        points="0,28 18,24 34,25 52,15 70,17 88,6 100,3"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: EASE.inOut, delay: 1.2 }}
      />
      <motion.circle
        cx="100"
        cy="3"
        r="2.5"
        fill="var(--color-sand)"
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE.ui, delay: 2.5 }}
      />
    </svg>
  );
}

/* ── الشريط السفلي: نقطة تواصل واحدة ─────────────────────── */

function ReadinessStrip({
  x,
  y,
}: {
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}) {
  const reduced = useReducedMotion();
  const tx = useTransform(x, (v) => v * 10);
  const ty = useTransform(y, (v) => v * 8);

  return (
    <motion.div
      className="absolute inset-x-[6%] bottom-[-4%] z-20"
      style={{ x: tx, y: ty }}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE.cinematic, delay: 0.95 }}
    >
      <div className="glass-strong glass-edge flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-semibold">نقطة تواصل واحدة</span>
        </div>
        <span className="text-[11px] text-muted-foreground">بدل التعامل مع عدة جهات</span>
      </div>
    </motion.div>
  );
}
