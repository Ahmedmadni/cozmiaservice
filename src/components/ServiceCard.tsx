import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServiceCard({
  title,
  description,
  items,
  to,
  className,
}: {
  title: string;
  description?: string;
  items?: string[];
  to?: string;
  className?: string;
}) {
  const content = (
    <div
      className={cn(
        "group h-full panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_-28px_var(--primary)]",
        className,
      )}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? (
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
      ) : null}
      {items?.length ? (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {to ? (
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-transform group-hover:-translate-x-1">
          اكتشف الحلول
          <ArrowLeft className="h-4 w-4" />
        </span>
      ) : null}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block h-full">
        {content}
      </Link>
    );
  }
  return content;
}
