import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EASE } from "@/components/motion";
import { services, getService } from "@/data/services";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

/**
 * نموذج طلب الخدمات — أربع خطوات فوق مسار إرسال واحد.
 *
 * الحقول الجديدة (مرحلة المشروع، الخدمة، وقت البدء) تبقى داخل حالة
 * النموذج وتُعرض في خطوة المراجعة، ولا تُرسل إلى Supabase حتى تُطبَّق
 * الـMigration الخاصة بها على قاعدة البيانات. الإرسال يستخدم الأعمدة
 * القائمة فقط، فيبقى النموذج عاملًا مع القاعدة الحالية كما هي.
 */

const schema = z.object({
  name: z.string().trim().min(2, "يرجى إدخال الاسم الكامل."),
  email: z.string().trim().email("يرجى إدخال بريد إلكتروني صحيح."),
  phone: z
    .string()
    .trim()
    .min(9, "يرجى إدخال رقم جوال صحيح.")
    .regex(/^[\d\s+()-]+$/, "يرجى إدخال أرقام فقط."),
  company: z.string().trim(),
  projectStage: z.string().min(1, "يرجى اختيار مرحلة المشروع."),
  serviceSlug: z.string().min(1, "يرجى اختيار الخدمة المطلوبة."),
  needDetails: z.string().trim().min(20, "يرجى كتابة 20 حرفًا على الأقل عن احتياجك."),
  preferredStart: z.string(),
});

type FormValues = z.infer<typeof schema>;

const STEPS = [
  {
    label: "التواصل",
    title: "بيانات التواصل",
    desc: "لنبدأ ببيانات التواصل حتى نتمكن من متابعة طلبك.",
    fields: ["name", "email", "phone"],
  },
  {
    label: "المشروع",
    title: "عن مشروعك",
    desc: "ساعدنا على فهم المرحلة الحالية لمشروعك.",
    fields: ["company", "projectStage"],
  },
  {
    label: "الاحتياج",
    title: "الخدمة والاحتياج",
    desc: "حدّد الخدمة التي تحتاجها، وأخبرنا بما ترغب في الوصول إليه.",
    fields: ["serviceSlug", "needDetails", "preferredStart"],
  },
  {
    label: "المراجعة",
    title: "مراجعة وإرسال",
    desc: "راجع بياناتك قبل الإرسال، ويمكنك العودة لتعديل أي خطوة.",
    fields: [],
  },
] as const satisfies ReadonlyArray<{
  label: string;
  title: string;
  desc: string;
  fields: ReadonlyArray<keyof FormValues>;
}>;

const PROJECT_STAGES = [
  "لدي فكرة أو مشروع جديد",
  "أستعد للإطلاق",
  "لدي مشروع قائم",
  "أعمل على التوسع والتطوير",
];

const START_OPTIONS = [
  "في أقرب وقت",
  "خلال هذا الشهر",
  "خلال 1 إلى 3 أشهر",
  "ما زلت أدرس الخيارات",
];

export function ServiceRequestForm({
  initialServiceSlug = "",
  assessmentSummary,
}: {
  /** الخدمة القادمة من رابط الصفحة — تُختار مسبقًا ويمكن تغييرها. */
  initialServiceSlug?: string;
  /** ملخص مقياس الجاهزية إن جاء الزائر منه. */
  assessmentSummary?: string;
}) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const defaults: FormValues = {
    name: "",
    email: "",
    phone: "",
    company: "",
    projectStage: "",
    serviceSlug: getService(initialServiceSlug) ? initialServiceSlug : "",
    needDetails: "",
    preferredStart: "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    // التحقق عند الضغط على «التالي» فقط. التحقق عند الخروج من الحقل
    // كان يُخفي رسالة الخطأ لحظة الضغط على الزر، فيزيح الزر بين
    // ضغط الفأرة ورفعها وتضيع النقرة الأولى.
    mode: "onSubmit",
  });

  const current = STEPS[step]!;
  const isReview = step === STEPS.length - 1;

  async function goNext() {
    const valid = await form.trigger([...current.fields], { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onSubmit(values: FormValues) {
    setLoading(true);
    // تُرسل الأعمدة القائمة فقط — الحقول الجديدة تنتظر تطبيق الـMigration.
    const { error } = await supabase.from("contact_requests").insert({
      name: values.name,
      email: values.email,
      company: values.company || null,
      phone: values.phone || null,
      message: values.needDetails,
      assessment_summary: assessmentSummary ?? null,
    });
    setLoading(false);

    if (error) {
      toast.error("تعذّر إرسال الطلب، يرجى المحاولة مرة أخرى.");
      return;
    }

    form.reset(defaults);
    setStep(0);
    setDone(true);
    toast.success("تم استلام طلبك، سنعود إليك قريبًا.");
  }

  /**
   * كل الإرسال يمرّ من هنا صراحةً.
   *
   * زرّا «التالي» و«إرسال الطلب» يشغلان موضعًا واحدًا، فيعيد React
   * استخدام عنصر الزر نفسه ويبدّل نوعه إلى submit عند بلوغ خطوة
   * المراجعة — فتُرسل نقرة «التالي» الأخيرة النموذج قبل أوانه. لذلك
   * كلا الزرّين type="button"، ويبقى onSubmit لمعالجة مفتاح Enter.
   */
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isReview) void form.handleSubmit(onSubmit)();
    else void goNext();
  }

  const values = form.getValues();
  const selectedService = getService(values.serviceSlug);

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="panel p-6 sm:p-8">
        <Stepper step={step} />

        <motion.div
          key={step}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE.ui }}
          className="mt-8"
        >
          <h2 className="font-display text-lg font-semibold">{current.title}</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{current.desc}</p>

          <div className="mt-7 space-y-6">
            {step === 0 ? (
              <>
                <TextField name="name" label="الاسم الكامل" required form={form} />
                <TextField
                  name="email"
                  label="البريد الإلكتروني"
                  type="email"
                  required
                  form={form}
                  dir="ltr"
                />
                <TextField
                  name="phone"
                  label="رقم الجوال"
                  type="tel"
                  required
                  form={form}
                  dir="ltr"
                  placeholder="05xxxxxxxx"
                />
              </>
            ) : null}

            {step === 1 ? (
              <>
                <TextField name="company" label="اسم المنشأة" form={form} />
                <FormField
                  control={form.control}
                  name="projectStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        مرحلة المشروع
                        <span className="text-accent"> *</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid gap-3 sm:grid-cols-2"
                        >
                          {PROJECT_STAGES.map((stage) => (
                            <OptionCard
                              key={stage}
                              value={stage}
                              label={stage}
                              selected={field.value === stage}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : null}

            {step === 2 ? (
              <>
                <FormField
                  control={form.control}
                  name="serviceSlug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        الخدمة المطلوبة
                        <span className="text-accent"> *</span>
                      </FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="h-11 w-full">
                            <SelectValue placeholder="اختر الخدمة المناسبة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.slug} value={s.slug}>
                              {s.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="needDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        تفاصيل الاحتياج
                        <span className="text-accent"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea rows={5} className="min-h-32" {...field} />
                      </FormControl>
                      <FormDescription>
                        اكتب نبذة مختصرة عن احتياج منشأتك أو الهدف الذي ترغب في تحقيقه.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>متى تفضّل البدء؟</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid gap-3 sm:grid-cols-2"
                        >
                          {START_OPTIONS.map((opt) => (
                            <OptionCard
                              key={opt}
                              value={opt}
                              label={opt}
                              selected={field.value === opt}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            ) : null}

            {isReview ? (
              <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                <ReviewRow label="الاسم" value={values.name} />
                <ReviewRow label="البريد الإلكتروني" value={values.email} dir="ltr" />
                <ReviewRow label="رقم الجوال" value={values.phone} dir="ltr" />
                {values.company ? <ReviewRow label="اسم المنشأة" value={values.company} /> : null}
                <ReviewRow label="مرحلة المشروع" value={values.projectStage} />
                <ReviewRow label="الخدمة المطلوبة" value={selectedService?.title ?? "—"} />
                <ReviewRow label="تفاصيل الاحتياج" value={values.needDetails} />
                <ReviewRow label="وقت البدء المفضل" value={values.preferredStart || "لم يُحدَّد"} />
              </dl>
            ) : null}
          </div>
        </motion.div>

        <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0 || loading}
            className="w-full sm:w-auto"
          >
            <ArrowRight className="h-4 w-4" />
            السابق
          </Button>

          {isReview ? (
            <Button
              type="button"
              size="lg"
              disabled={loading}
              onClick={() => void form.handleSubmit(onSubmit)()}
              className="w-full sm:w-auto"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "جارٍ الإرسال…" : "إرسال الطلب"}
            </Button>
          ) : (
            <Button type="button" size="lg" onClick={goNext} className="w-full sm:w-auto">
              التالي
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {done ? (
          <p className="mt-6 rounded-xl border border-accent/40 bg-accent-soft p-4 text-sm leading-7">
            وصلنا طلبك بنجاح، وسيتواصل معك فريقنا خلال يوم عمل.
          </p>
        ) : null}
      </form>
    </Form>
  );
}

/* ─────────────────────────── أجزاء داخلية ─────────────────────────── */

function Stepper({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          الخطوة {step + 1} من {STEPS.length}
        </span>
        <span>{STEPS[step]!.label}</span>
      </div>

      <ol className="mt-3 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "current" : "next";
          return (
            <li key={s.label} className="flex min-w-0 flex-1 flex-col gap-2">
              <span
                className={cn(
                  "h-1.5 w-full rounded-full transition-colors duration-500",
                  state === "done" && "bg-accent",
                  state === "current" && "bg-primary",
                  state === "next" && "bg-border",
                )}
              />
              <span
                className={cn(
                  "flex items-center gap-1 truncate text-[11px] transition-colors duration-500",
                  state === "next" ? "text-muted-foreground" : "font-medium text-foreground",
                )}
              >
                {state === "done" ? (
                  <Check aria-hidden className="h-3 w-3 shrink-0 text-accent" />
                ) : null}
                <span className="truncate">{s.label}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function OptionCard({
  value,
  label,
  selected,
}: {
  value: string;
  label: string;
  selected: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors duration-300",
        selected
          ? "border-accent bg-accent-soft text-foreground"
          : "border-border text-muted-foreground hover:border-accent/50",
      )}
    >
      <RadioGroupItem value={value} className={selected ? "border-accent text-accent" : ""} />
      <span className="min-w-0 leading-6">{label}</span>
    </label>
  );
}

function ReviewRow({ label, value, dir }: { label: string; value: string; dir?: "ltr" | "rtl" }) {
  return (
    <div className="grid gap-1 bg-surface/60 px-4 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
      <dt className="text-xs text-muted-foreground sm:text-sm">{label}</dt>
      <dd className="min-w-0 break-words text-sm leading-7" dir={dir ?? "rtl"}>
        {value}
      </dd>
    </div>
  );
}

function TextField({
  name,
  label,
  form,
  type = "text",
  required,
  dir,
  placeholder,
}: {
  name: "name" | "email" | "phone" | "company";
  label: string;
  form: ReturnType<typeof useForm<FormValues>>;
  type?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
  placeholder?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required ? <span className="text-accent"> *</span> : null}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              className="h-11"
              dir={dir}
              placeholder={placeholder}
              autoComplete="off"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
