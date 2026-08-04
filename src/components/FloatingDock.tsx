import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { EASE } from "@/components/motion";
import { site } from "@/data/site";

/**
 * رصيف الإجراءات العائم: تواصل مباشر + العودة إلى الأعلى.
 *
 * زر الواتساب حاضر دائمًا لأنه قناة التواصل الأولى فعليًا لدى
 * أصحاب المشاريع هنا. زر الصعود يظهر فقط بعد مغادرة أول شاشة،
 * فلا يزاحم المحتوى في بدايته.
 */
export function FloatingDock() {
  const reduced = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsapp = `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 flex flex-col items-center gap-3">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            type="button"
            aria-label="العودة إلى أعلى الصفحة"
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.3, ease: EASE.ui }}
            className="glass-strong glass-edge pointer-events-auto grid h-11 w-11 place-items-center rounded-full text-primary transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2} />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group pointer-events-auto flex items-center gap-2.5 rounded-full bg-primary py-3 pr-3 pl-4 text-primary-foreground shadow-[0_18px_40px_-18px_var(--primary)] transition-transform duration-300 hover:-translate-y-0.5"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-accent-foreground">
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-500 group-hover:max-w-[9rem] group-hover:opacity-100 sm:max-w-[9rem] sm:opacity-100">
          تواصل واتساب
        </span>
      </a>
    </div>
  );
}
