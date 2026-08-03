import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

const title = `مقياس جاهزية المشروع | ${site.name}`;
const description = "أجب عن أسئلة قصيرة لتعرف مرحلتك الحالية وأولوياتك القادمة.";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/assessment" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/assessment" }],
  }),
  component: AssessmentPage,
});

const questions = [
  "لدي هوية بصرية وحضور رقمي واضح",
  "إجراءات العمل اليومية موثقة ومعروفة للفريق",
  "أستخدم أنظمة مناسبة لإدارة العمليات والعملاء",
  "لدي خطة تسويق ومؤشرات قياس واضحة",
  "أعرف تكلفة اكتساب العميل وقنواتي الأفضل",
];

const results = [
  { max: 5, title: "مرحلة: ابدأ", desc: "الأولوية الآن هي التأسيس وبناء الهوية والحضور الرقمي." },
  { max: 10, title: "مرحلة: نظّم", desc: "ركّز على توثيق الإجراءات واختيار الأنظمة المناسبة." },
  { max: 15, title: "مرحلة: انطلق", desc: "حان وقت بناء خطة تسويق وقنوات بيع قابلة للقياس." },
  { max: 20, title: "مرحلة: نمُ", desc: "الأساس جاهز؛ اتجه إلى التوسع وتحسين الأداء بالبيانات." },
];

function AssessmentPage() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [submitted, setSubmitted] = useState(false);
  const score = answers.reduce((a, b) => a + b, 0);
  const result = results.find((r) => score <= r.max) ?? results[results.length - 1];

  return (
    <>
      <PageHero eyebrow="أداة تفاعلية" title="مقياس جاهزية المشروع" description={description} />
      <section className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-4">
          {questions.map((q, i) => (
            <div key={q} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-medium">{q}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { v: 0, l: "لا" },
                  { v: 2, l: "جزئيًا" },
                  { v: 4, l: "نعم" },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => prev.map((a, idx) => (idx === i ? opt.v : a)))
                    }
                    className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                      answers[i] === opt.v
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-border text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            اعرض النتيجة
          </button>

          {submitted && result ? (
            <div className="rounded-2xl border border-accent/40 bg-accent-soft p-7">
              <p className="text-xs text-muted-foreground">نتيجتك: {score} من 20</p>
              <h2 className="mt-2 text-xl font-bold">{result.title}</h2>
              <p className="mt-2 text-sm leading-8 text-muted-foreground">{result.desc}</p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
