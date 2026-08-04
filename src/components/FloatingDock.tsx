import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { EASE } from "@/components/motion";
import { site } from "@/data/site";

/**
 * رصيف الإجراءات العائم.
 *
 * الترتيب مأخوذ عن مواقع خدمات الأعمال السعودية: قنوات التواصل
 * المباشر على الحافة اليمنى، وزر الصعود أسفلها، ولسان «احجز استشارة»
 * على الحافة المقابلة حتى لا تتزاحم الإجراءات في ركن واحد.
 *
 * زر الصعود يظهر بعد أول شاشة فقط، فلا يزاحم المحتوى في بدايته.
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
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
      <div className="pointer-events-none fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3">
        <a
          href={tel}
          aria-label="اتصال هاتفي"
          className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_16px_36px_-16px_var(--primary)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Phone className="h-5 w-5" strokeWidth={1.75} />
        </a>

        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="مراسلة عبر واتساب"
          className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_16px_36px_-16px_var(--accent)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
        </a>

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
              className="glass-strong glass-edge pointer-events-auto grid h-10 w-10 place-items-center rounded-full text-primary transition-transform duration-300 hover:-translate-y-0.5"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2} />
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      {/* لسان الاستشارة — على الحافة المقابلة، ومخفي على الشاشات الضيقة */}
      <Link
        to="/contact"
        className="glass-strong glass-edge fixed bottom-24 left-0 z-40 hidden rounded-l-none rounded-r-full py-3 pl-4 pr-5 text-xs font-semibold text-primary shadow-[0_16px_36px_-20px_var(--primary)] transition-transform duration-300 hover:translate-x-1 sm:block"
      >
        احجز استشارة مجانية
      </Link>
    </>
  );
}
