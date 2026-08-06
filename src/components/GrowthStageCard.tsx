import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { Stage } from "@/data/solutions";

export function GrowthStageCard({ stage, index }: { stage: Stage; index: number }) {
  return (
    <Link
      to="/growth-stages"
      hash={stage.slug}
      className="group relative flex h-full flex-col overflow-hidden panel p-6 card-hover hover:border-accent/60"
    >
      <span className="text-xs font-semibold tracking-widest text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 font-display text-xl font-semibold">{stage.title}</h3>
      <p className="mt-2 text-sm font-medium text-foreground/80">{stage.headline}</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{stage.summary}</p>

      <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-64 group-hover:opacity-100 group-focus-visible:max-h-64 group-focus-visible:opacity-100">
        <ul className="space-y-2 border-t border-border pt-4">
          {stage.services.slice(0, 4).map((s) => (
            <li key={s} className="flex gap-2 text-xs leading-6 text-muted-foreground">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-primary transition-transform group-hover:-translate-x-1">
        اكتشف الحلول
        <ArrowLeft className="h-4 w-4" />
      </span>
    </Link>
  );
}
