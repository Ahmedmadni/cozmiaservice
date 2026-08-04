import { motion, useReducedMotion } from "framer-motion";
import landmarks from "@/assets/saudi-landmarks.jpg";
import vision2030 from "@/assets/vision-2030-logo.svg";
import { EASE, Rise, RiseGroup, RiseItem, SplitWords, useParallax } from "@/components/motion";

const pillars = [
  {
    title: "مجتمع حيوي",
    desc: "مشاريع تخدم جودة الحياة وتبني تجارب محلية تليق بالمجتمع السعودي.",
  },
  {
    title: "اقتصاد مزدهر",
    desc: "تمكين المنشآت الصغيرة والمتوسطة ورفع جاهزيتها للنمو والتوسع.",
  },
  {
    title: "وطن طموح",
    desc: "تحوّل رقمي وتنظيم تشغيلي يرفع كفاءة الأعمال ويقلل الهدر.",
  },
];

export function VisionSection() {
  const reduced = useReducedMotion();
  const { ref, y } = useParallax(36);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 blueprint opacity-40 [mask-image:radial-gradient(70%_60%_at_20%_50%,black,transparent)]"
      />

      <div className="container-page relative py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <span className="flex items-center gap-3 text-accent">
              <span aria-hidden className="h-px w-8 bg-sand" />
              <span className="eyebrow">منسجمون مع رؤية المملكة</span>
            </span>

            <h2 className="mt-5 text-[1.75rem] font-semibold leading-[1.3] text-balance-ar sm:text-4xl lg:text-[2.6rem] lg:leading-[1.24]">
              <SplitWords text="نعمل من قلب السوق السعودي… ونساهم في مستهدفات" />
            </h2>

            <Rise delay={100}>
              <img
                src={vision2030}
                alt="شعار رؤية السعودية 2030"
                width={198}
                height={133}
                loading="lazy"
                className="mt-7 h-20 w-auto sm:h-24"
              />
            </Rise>

            <Rise delay={160}>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">
                تمكين المنشآت الصغيرة والمتوسطة أحد أهم مستهدفات رؤية 2030. نساعد أصحاب المشاريع على
                بناء أساس نظامي منظم، وحضور رقمي احترافي، وأدوات تشغيل حديثة تدعم استدامة أعمالهم
                ونموها.
              </p>
            </Rise>

            <RiseGroup className="mt-10 grid gap-6 sm:grid-cols-3" stagger={0.08}>
              {pillars.map((p) => (
                <RiseItem key={p.title}>
                  <div className="border-t border-border pt-4 transition-colors duration-500 hover:border-accent">
                    <h3 className="font-display text-sm font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{p.desc}</p>
                  </div>
                </RiseItem>
              ))}
            </RiseGroup>
          </div>

          {/*
           * كشف بالقناع بدل التلاشي: الصورة تُفتح من الأسفل إلى الأعلى
           * بينما تنزلق داخلها بموازاة خفيفة — حركتان تخدمان بعضهما.
           */}
          <div ref={ref} className="relative">
            <motion.figure
              initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1.15, ease: EASE.cinematic }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_100px_-60px_var(--primary)]"
            >
              <motion.img
                src={landmarks}
                alt="معالم المملكة العربية السعودية: أفق الرياض وبرج المملكة والفيصلية وحي الدرعية التاريخي"
                width={1920}
                height={960}
                loading="lazy"
                style={{ y }}
                className="h-full w-full scale-110 object-cover saturate-[0.88]"
              />
              {/* تدرّج حبري خفيف: يثبّت الصورة داخل الهوية بدل تركها لوحة مستقلة. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent"
              />
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}
