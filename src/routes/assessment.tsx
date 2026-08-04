import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site, professionalDisclaimer } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";

const title = `مقياس جاهزية المشروع | ${site.name}`;
const description = "أجب عن أسئلة قصيرة لتعرف مرحلتك الحالية وأولوياتك القادمة.";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/assessment" },
      { name: "twitter:card", content: "summary_large_image" },
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
  {
    max: 5,
    title: "مرحلة: ابدأ",
    desc: "الأولوية الآن هي التأسيس وبناء الهوية والحضور الرقمي.",
    next: ["بناء الهوية البصرية", "إطلاق موقع تعريفي", "تحديد عرض القيمة"],
  },
  {
    max: 10,
    title: "مرحلة: نظّم",
    desc: "ركّز على توثيق الإجراءات واختيار الأنظمة المناسبة.",
    next: ["توثيق دورة العمل", "ترشيح نظام إدارة مناسب", "تدريب الفريق"],
  },
  {
    max: 15,
    title: "مرحلة: انطلق",
    desc: "حان وقت بناء خطة تسويق وقنوات بيع قابلة للقياس.",
    next: ["خطة تسويق ربعية", "تفعيل قنوات البيع", "لوحة مؤشرات أداء"],
  },
  {
    max: 20,
    title: "مرحلة: نمُ",
    desc: "الأساس جاهز؛ اتجه إلى التوسع وتحسين الأداء بالبيانات.",
    next: ["تحسين تكلفة الاكتساب", "توسيع الفريق والكفاءات", "أتمتة العمليات"],
  },
];

function AssessmentPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const answered = answers.filter((a) => a >= 0).length;
  const progress = Math.round((answered / questions.length) * 100);
  const score = answers.reduce((a, b) => a + Math.max(b, 0), 0);
  const result = results.find((r) => score <= r.max) ?? results[results.length - 1]!;

  async function handleSubmit() {
    if (answered < questions.length) {
      toast.error("يرجى الإجابة عن جميع الأسئلة أولًا.");
      return;
    }
    setSaving(true);
    setSubmitted(true);
    const { error } = await supabase.from("assessment_submissions").insert({
      score,
      stage: result.title,
      answers: questions.map((q, i) => ({ question: q, value: answers[i] })),
    });
    setSaving(false);
    if (error) toast.error("عُرضت النتيجة، لكن تعذّر حفظها لدينا.");
  }

  const summary = `${result.title} — النتيجة ${score} من 20. الأولويات: ${result.next.join("، ")}.`;

  return (
    <>
      <PageHero eyebrow="أداة تفاعلية" title="مقياس جاهزية المشروع" description={description} />
      <section className="container-page py-20 lg:py-28">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="sticky top-20 z-10 panel/95 p-4 backdrop-blur">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                أجبت عن {answered} من {questions.length}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {questions.map((q, i) => (
            <div key={q} className="panel p-6">
              <p className="text-sm font-medium">
                <span className="ml-2 text-muted-foreground">{i + 1}.</span>
                {q}
              </p>
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
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            اعرض النتيجة
          </button>

          {submitted ? (
            <div className="rounded-2xl border border-accent/40 bg-accent-soft p-7">
              <p className="text-xs text-muted-foreground">نتيجتك: {score} من 20</p>
              <h2 className="mt-2 font-display text-xl font-semibold">{result.title}</h2>
              <p className="mt-2 text-sm leading-8 text-muted-foreground">{result.desc}</p>
              <ul className="mt-4 space-y-2 text-sm leading-7">
                {result.next.map((n) => (
                  <li key={n} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {n}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => navigate({ to: "/contact", search: { summary } })}
                className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                اطلب مناقشة النتائج
              </button>
              <p className="mt-5 text-xs leading-7 text-muted-foreground">
                {professionalDisclaimer}
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
