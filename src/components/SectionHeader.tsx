import { SplitWords } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * ترويسة القسم — العنصر الذي يضبط إيقاع كل الأقسام.
 * العنوان يُكشف كلمةً كلمة، والخط الرملي الرفيع هو الاستخدام
 * الوحيد المسموح للذهبي في هذا المستوى من التسلسل.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow ? (
        <span
          className={cn(
            "flex items-center gap-3 text-accent",
            centered ? "justify-center" : "justify-start",
          )}
        >
          <span aria-hidden className="h-px w-10 bg-sand" />
          <span className="eyebrow">{eyebrow}</span>
          {centered ? <span aria-hidden className="h-px w-10 bg-sand" /> : null}
        </span>
      ) : null}

      <h2 className="mt-6 text-[1.75rem] font-bold leading-[1.3] text-balance-ar sm:text-4xl lg:text-[2.6rem] lg:leading-[1.24]">
        <SplitWords text={title} />
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-6 text-base leading-[1.85] text-muted-foreground",
            centered ? "mx-auto max-w-xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
