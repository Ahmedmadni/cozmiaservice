import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { professionalDisclaimer, site } from "@/data/site";
import vision2030 from "@/assets/vision-2030-logo.svg";
import { solutionCategories } from "@/data/solutions";

const companyLinks = [
  { to: "/about", label: "من نحن" },
  { to: "/team", label: "الكفاءات والفرق" },
  { to: "/case-studies", label: "قصص النجاح" },
  { to: "/knowledge", label: "مركز المعرفة" },
  { to: "/faq", label: "الأسئلة الشائعة" },
];

const legalLinks = [
  { to: "/privacy", label: "سياسة الخصوصية" },
  { to: "/terms", label: "الشروط والأحكام" },
  { to: "/scope", label: "نطاق الخدمات" },
  { to: "/assessment", label: "مقياس جاهزية المشروع" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                م
              </span>
              <span className="text-base font-bold">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{site.tagline}</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span dir="ltr">{site.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                {site.city}
              </li>
            </ul>
          </div>

          <FooterCol title="الخدمات">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="hover:text-foreground">
                جميع الخدمات
              </Link>
            </li>
          </FooterCol>


          <FooterCol title="الشركة">
            {companyLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="روابط نظامية">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center">
          <img
            src={vision2030}
            alt="شعار رؤية السعودية 2030"
            width={198}
            height={133}
            loading="lazy"
            className="h-14 w-auto shrink-0"
          />
          <p className="text-xs leading-7 text-muted-foreground">{professionalDisclaimer}</p>
        </div>


        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.nameFull}. جميع الحقوق محفوظة.
          </span>
          <span>{site.city}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}
