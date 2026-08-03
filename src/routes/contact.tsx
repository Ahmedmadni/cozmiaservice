import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { site, professionalDisclaimer } from "@/data/site";

const title = `تواصل معنا | ${site.name}`;
const description = "احجز استشارة أولية أو أرسل تفاصيل مشروعك وسنعود إليك بخطوات واضحة.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="تواصل معنا" title="لنبدأ بمحادثة قصيرة" description={description} />
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            className="space-y-5 rounded-2xl border border-border bg-card p-7"
            onSubmit={(e) => e.preventDefault()}
          >
            <Field label="الاسم" name="name" />
            <Field label="اسم المنشأة" name="company" />
            <Field label="البريد الإلكتروني" name="email" type="email" />
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
              className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              إرسال الطلب
            </button>
          </form>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-7">
              <h2 className="text-base font-semibold">معلومات التواصل</h2>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                <li>البريد: {site.email}</li>
                <li>الجوال: {site.phone}</li>
                <li>المقر: {site.location}</li>
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

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={120}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
