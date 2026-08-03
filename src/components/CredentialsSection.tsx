import { useState } from "react";
import { BadgeCheck, Download, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { credentials, type Credential } from "@/data/credentials";

export function CredentialsSection() {
  const [active, setActive] = useState<Credential | null>(null);

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-16 lg:py-24">
        <SectionHeader
          eyebrow="التوثيق النظامي"
          title="منشأة موثّقة ونظامية"
          description="اضغط على أي شهادة لعرضها. جميع أعمالنا تُنفَّذ ضمن إطار نظامي واضح ووفق الأنظمة المعمول بها في المملكة."
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {credentials.map((cred, i) => (
            <Reveal key={cred.id} delay={i * 80}>
              <button
                type="button"
                onClick={() => setActive(cred)}
                className="group flex h-full w-full items-center gap-4 rounded-3xl border border-border bg-card p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_22px_50px_-34px_var(--primary)]"
              >
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-border bg-surface p-2">
                  <img
                    src={cred.logo}
                    alt={`شعار ${cred.issuer}`}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{cred.title}</span>
                  <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                    {cred.issuer}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    عرض الشهادة
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          {active ? (
            <>
              <DialogHeader className="text-right">
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>{active.issuer}</DialogDescription>
              </DialogHeader>

              <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-3 border-b border-border bg-surface p-5">
                  <img
                    src={active.logo}
                    alt={`شعار ${active.issuer}`}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 object-contain"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{active.issuer}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{active.title}</p>
                  </div>
                  <span className="mr-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-[11px] font-medium text-accent">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    سارية
                  </span>
                </div>

                <dl className="divide-y divide-border">
                  {active.fields.map((field) => (
                    <div key={field.label} className="flex items-center gap-4 px-5 py-3 text-sm">
                      <dt className="min-w-0 flex-1 text-muted-foreground">{field.label}</dt>
                      <dd className="shrink-0 font-medium" dir={field.dir ?? "rtl"}>
                        {field.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="border-t border-border bg-surface p-5">
                  <p className="text-xs leading-6 text-muted-foreground">{active.note}</p>
                  {active.file ? (
                    <a
                      href={active.file}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary"
                    >
                      <Download className="h-4 w-4" />
                      تحميل نسخة الشهادة
                    </a>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
