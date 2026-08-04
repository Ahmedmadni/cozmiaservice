/**
 * نظام الحركة — لبنات مشتركة مبنية على Framer Motion.
 *
 * قاعدة العمل: كل حركة هنا لها وظيفة (توجيه الانتباه، كشف علاقة،
 * أو ربط حالتين). لا حركة زخرفية، ولا حركة تؤخّر القراءة.
 * كل مكوّن يحترم prefers-reduced-motion ويسقط إلى حالته النهائية.
 */
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/** منحنيات التسارع — واحدة للواجهة وواحدة للمشاهد السينمائية. */
export const EASE = {
  ui: [0.22, 1, 0.36, 1],
  cinematic: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/* ─────────────────────────── الظهور عند التمرير ─────────────── */

type RiseProps = {
  children: ReactNode;
  delay?: number;
  /** المسافة التي يصعد منها العنصر. 0 = تلاشٍ فقط. */
  distance?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

export function Rise({ children, delay = 0, distance = 18, className, as = "div" }: RiseProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.75, ease: EASE.cinematic, delay: delay / 1000 }}
    >
      {children}
    </Tag>
  );
}

/** حاوية تُدرِج أبناءها المباشرين من نوع RiseItem. */
export function RiseGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

const riseItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.cinematic } },
};

export function RiseItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={className} {...(reduced ? {} : { variants: riseItemVariants })}>
      {children}
    </Tag>
  );
}

/* ─────────────────────────── كشف العناوين ───────────────────── */

/**
 * كشف العنوان كلمةً كلمة خلف قناع.
 * القناع (overflow hidden على السطر) أنظف بصريًا من تلاشي كل كلمة على حدة،
 * ويحافظ على قابلية القراءة لأن الكلمة تصل مكانها النهائي دائمًا.
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {/*
       * المراقبة على الحاوية لا على الكلمات: الكلمة تبدأ مُزاحة خارج
       * قناعها، فلو رُوقبت هي لاعتبرها IntersectionObserver خارج الشاشة
       * ولما بدأت الحركة أصلًا. الحاوية مرئية دائمًا، ثم تنتشر الحالة
       * إلى الكلمات عبر المتغيّرات (variants).
       */}
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
            >
              <motion.span className={cn("inline-block", wordClassName)} variants={wordVariants}>
                {word}
              </motion.span>
            </span>
            {/* الفاصل خارج القناع: المسافة داخل inline-block تنهار ولا تُرسم. */}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.85, ease: EASE.cinematic } },
};

/* ─────────────────────────── تفاعلات المؤشر ─────────────────── */

/**
 * جذب مغناطيسي خفيف نحو المؤشر — يُستخدم على أزرار الإجراء الأساسية فقط.
 * معطّل على اللمس وعلى prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * إمالة ثلاثية الأبعاد خفيفة للألواح الزجاجية.
 * الميلان يبقى تحت 6 درجات حتى لا يشوّه النص.
 */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), {
    stiffness: 160,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), {
    stiffness: 160,
    damping: 20,
  });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * بقعة ضوء تتبع المؤشر داخل السطح الزجاجي.
 * هذه هي التفصيلة التي تجعل الزجاج يبدو ماديًا: الضوء ينكسر عند موضع المؤشر.
 */
export function PointerGlow({
  children,
  className,
  color = "var(--color-accent)",
  size = 340,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
} & Omit<ComponentPropsWithoutRef<"div">, "color">) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={ref}
      className={cn("group/glow relative isolate", className)}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerLeave={() => setPos(null)}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={
          pos
            ? {
                background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, ${color} 22%, transparent), transparent 70%)`,
              }
            : undefined
        }
      />
      {children}
    </div>
  );
}

/* ─────────────────────────── التمرير ────────────────────────── */

/** شريط تقدّم القراءة أعلى الصفحة. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className={cn("h-px origin-right bg-accent", className)}
      style={{ scaleX }}
    />
  );
}

/** إزاحة رأسية مرتبطة بالتمرير — تُستخدم بمقدار محدود لخلق عمق. */
export function useParallax(range = 60): {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [range, -range]);
  return { ref, y };
}

/* ─────────────────────────── الأرقام ────────────────────────── */

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const toArabicDigits = (n: number) => String(n).replace(/\d/g, (d) => arabicDigits[Number(d)]!);

/** عدّاد يبدأ عند دخول العنصر إلى الشاشة. */
export function Counter({
  to,
  duration = 1.4,
  className,
  arabic = true,
  prefix = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  className?: string;
  arabic?: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo — سريع في البداية ثم يستقر، يقرأ كـ«وصول» لا كـ«عدّ»
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {arabic ? toArabicDigits(value) : value}
      {suffix}
    </span>
  );
}

/* ─────────────────────────── شريط متحرك ─────────────────────── */

/** شريط كلمات لا نهائي — يعطي إحساس الحركة الأفقية دون خطف التمرير. */
export function Marquee({
  items,
  duration = 42,
  className,
  separator = "—",
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  separator?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex w-max marquee-track motion-reduce:animate-none"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-6 px-6">
                <span className="whitespace-nowrap">{item}</span>
                <span className="text-sand/70" aria-hidden>
                  {separator}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
