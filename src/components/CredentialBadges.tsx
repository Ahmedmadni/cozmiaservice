import { useState } from "react";
import { Download, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { credentials, type Credential } from "@/data/credentials";

export function CredentialBadges() {
  const [active, setActive] = useState<Credential | null>(null);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        {credentials.map((cred) => (
          <button
            key={cred.id}
            type="button"
            onClick={() => setActive(cred)}
            title={cred.title}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-3 pl-5 text-right transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_18px_40px_-30px_var(--primary)]"
          >
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-surface p-2">
              <img
                src={cred.logo}
                alt={`شعار ${cred.issuer}`}
                width={512}
                height={512}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{cred.issuer}</span>
              <span className="mt-1 block text-xs text-muted-foreground">عرض الشهادة</span>
            </span>
          </button>
        ))}
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
                    className="h-14 w-14 shrink-0 object-contain"
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
    </>
  );
}
