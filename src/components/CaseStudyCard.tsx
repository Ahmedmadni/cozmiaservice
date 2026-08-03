import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { CaseStudy } from "@/data/content";

export function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      to="/case-studies/$slug"
      params={{ slug: item.slug }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_22px_50px_-32px_var(--primary)]"
    >
      <span className="text-xs font-medium text-accent">{item.sector}</span>
      <h3 className="mt-2 text-lg font-bold">{item.name}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">{item.challenge}</p>
      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
        {item.metrics.map((m) => (
          <div key={m.label} className="min-w-0">
            <dt className="truncate text-[11px] text-muted-foreground">{m.label}</dt>
            <dd className="mt-1 text-sm font-bold">{m.value}</dd>
          </div>
        ))}
      </dl>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-primary transition-transform group-hover:-translate-x-1">
        اقرأ القصة
        <ArrowLeft className="h-4 w-4" />
      </span>
    </Link>
  );
}
