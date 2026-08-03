import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open || mega
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-background/30 backdrop-blur-sm",
      )}
    >
      <nav className="container-page flex h-16 items-center gap-4 lg:h-20">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            م
          </span>
          <span className="text-base font-bold">{site.name}</span>
        </Link>

        <ul className="mr-auto hidden items-center gap-1 lg:flex">
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
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:font-semibold data-[status=active]:text-foreground"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
              </li>
            ) : (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:font-semibold data-[status=active]:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="mr-auto flex items-center gap-2 lg:mr-0">
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/contact">ابدأ مشروعك</Link>
          </Button>
          <button
            type="button"
            aria-label="القائمة"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mega menu — سطح المكتب */}
      <div
        onMouseEnter={() => setMega(true)}
        onMouseLeave={() => setMega(false)}
        className={cn(
          "absolute inset-x-0 top-full hidden border-b border-border bg-background/98 backdrop-blur-xl transition-all duration-200 lg:block",
          mega ? "visible opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div className="container-page py-8">
          <div className="grid grid-cols-3 gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group flex gap-3 rounded-2xl border border-transparent p-4 transition-colors hover:border-border hover:bg-surface"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{s.title}</span>
                  <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                    {s.short}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              عرض جميع الخدمات
            </Link>
          </div>
        </div>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <ul className="container-page grid gap-1 py-4">
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
                        "h-4 w-4 transition-transform",
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
        </div>
      ) : null}
    </header>
  );
}
