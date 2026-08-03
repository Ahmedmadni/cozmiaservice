import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site, professionalDisclaimer } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";

const title = `تواصل معنا | ${site.name}`;
const description = "احجز استشارة أولية أو أرسل تفاصيل مشروعك وسنعود إليك بخطوات واضحة.";

const searchSchema = z.object({
  summary: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { summary } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!name || !email) {
      toast.error("يرجى تعبئة الاسم والبريد الإلكتروني.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_requests").insert({
      name,
      email,
      company: String(data.get("company") ?? "").trim() || null,
      phone: String(data.get("phone") ?? "").trim() || null,
      message: String(data.get("message") ?? "").trim() || null,
      assessment_summary: summary ?? null,
    });
    setLoading(false);

    if (error) {
      toast.error("تعذّر إرسال الطلب، يرجى المحاولة مرة أخرى.");
      return;
    }

    form.reset();
    setDone(true);
    toast.success("تم استلام طلبك، سنعود إليك قريبًا.");
  }

  return (
    <>
      <PageHero eyebrow="تواصل معنا" title="لنبدأ بمحادثة قصيرة" description={description} />
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form className="space-y-5 rounded-2xl border border-border bg-card p-7" onSubmit={handleSubmit}>
            {summary ? (
              <div className="rounded-xl border border-accent/40 bg-accent-soft p-4 text-xs leading-7 text-muted-foreground">
                <span className="font-semibold text-foreground">ملخص نتيجة مقياس الجاهزية: </span>
                {summary}
              </div>
            ) : null}

            <Field label="الاسم" name="name" required />
            <Field label="اسم المنشأة" name="company" />
            <Field label="البريد الإلكتروني" name="email" type="email" required />
            <Field label="رقم الجوال" name="phone" />
            <div>
              <label htmlFor="message" className="text-sm font-medium">
                نبذة عن مشروعك
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "جارٍ الإرسال…" : "إرسال الطلب"}
            </button>

            {done ? (
              <p className="rounded-xl border border-accent/40 bg-accent-soft p-4 text-sm leading-7">
                وصلنا طلبك بنجاح، وسيتواصل معك فريقنا خلال يوم عمل.
              </p>
            ) : null}
          </form>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-7">
              <h2 className="text-base font-semibold">معلومات التواصل</h2>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                <li>البريد: {site.email}</li>
                <li>الجوال: {site.phone}</li>
                <li>المقر: {site.city}</li>
              </ul>
            </div>
            <p className="rounded-2xl border border-border bg-card p-6 text-xs leading-7 text-muted-foreground">
              {professionalDisclaimer}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={120}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
