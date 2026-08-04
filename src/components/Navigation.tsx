import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE, Magnetic, ScrollProgress } from "@/components/motion";
import { navLinks, site } from "@/data/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
    setMobileServices(false);
  }, [pathname]);

  const lifted = scrolled || open || mega;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/*
       * الشريط يبدأ شفافًا تمامًا فوق الهيرو ثم يتحوّل إلى زجاج عند
       * التمرير — الانتقال نفسه هو ما يخبر المستخدم أنه غادر أعلى الصفحة.
       */}
      <div
        className={cn(
          "transition-all duration-500",
          lifted
            ? "glass-nav border-b border-border/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="container-page flex h-16 items-center gap-4 lg:h-20">
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground transition-transform duration-500 group-hover:rotate-6">
              {site.name.charAt(0)}
            </span>
            <span className="font-display text-base font-semibold">{site.name}</span>
          </Link>

          <ul className="mr-auto hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) =>
              link.to === "/services" ? (
                <li
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                >
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:font-semibold data-[status=active]:text-foreground"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        mega && "rotate-180",
                      )}
                    />
                  </Link>
                </li>
              ) : (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    activeOptions={{ exact: link.to === "/" }}
                    className="group relative rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:font-semibold data-[status=active]:text-foreground"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-3 bottom-1 h-px origin-right scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="mr-auto flex items-center gap-2 lg:mr-0">
            <Magnetic strength={0.2} className="hidden sm:inline-block">
              <Button asChild>
                <Link to="/contact">ابدأ مشروعك</Link>
              </Button>
            </Magnetic>
            <button
              type="button"
              aria-label="القائمة"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="glass glass-edge grid h-10 w-10 shrink-0 place-items-center rounded-lg lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <ScrollProgress
          className={cn("transition-opacity", lifted ? "opacity-100" : "opacity-0")}
        />
      </div>

      {/* القائمة الكبرى — سطح المكتب */}
      <AnimatePresence>
        {mega ? (
          <motion.div
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE.ui }}
            className="glass-nav absolute inset-x-0 top-full hidden border-b border-border/70 lg:block"
          >
            <div className="container-page py-8">
              <div className="grid grid-cols-3 gap-2">
                {services.map((s, i) => (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE.ui, delay: 0.04 + i * 0.035 }}
                  >
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group flex gap-3.5 rounded-2xl border border-transparent p-4 transition-colors duration-300 hover:border-border hover:bg-card/60"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <s.icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-sm font-semibold">{s.title}</span>
                        <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                          {s.short}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <Link
                  to="/services"
                  className="link-sweep inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  عرض جميع الخدمات
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* القائمة — الجوال */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE.ui }}
            className="glass-nav overflow-hidden border-t border-border/70 lg:hidden"
          >
            <ul className="container-page grid max-h-[calc(100dvh-4rem)] gap-1 overflow-y-auto py-4">
              {navLinks.map((link) =>
                link.to === "/services" ? (
                  <li key={link.to}>
                    <button
                      type="button"
                      onClick={() => setMobileServices((v) => !v)}
                      aria-expanded={mobileServices}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm text-muted-foreground"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          mobileServices && "rotate-180",
                        )}
                      />
                    </button>
                    {mobileServices ? (
                      <ul className="mb-2 grid gap-1 border-r border-border pr-3">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to="/services/$slug"
                              params={{ slug: s.slug }}
                              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground"
                            >
                              <s.icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                              <span className="min-w-0">{s.title}</span>
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            to="/services"
                            className="block rounded-lg px-3 py-3 text-sm font-medium text-primary"
                          >
                            عرض جميع الخدمات
                          </Link>
                        </li>
                      </ul>
                    ) : null}
                  </li>
                ) : (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      activeOptions={{ exact: link.to === "/" }}
                      className="block rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary data-[status=active]:font-semibold data-[status=active]:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
              <li className="pt-2">
                <Button asChild className="w-full">
                  <Link to="/contact">ابدأ مشروعك</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
