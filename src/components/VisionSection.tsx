import landmarks from "@/assets/saudi-landmarks.jpg";
import vision2030 from "@/assets/vision-2030-logo.svg";
import { Reveal } from "@/components/Reveal";

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
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="text-xs font-medium tracking-wide text-accent">
              منسجمون مع رؤية المملكة
            </span>
            <h2 className="mt-3 text-2xl font-bold text-balance-ar sm:text-3xl lg:text-[2.5rem] lg:leading-[1.3]">
              نعمل من قلب السوق السعودي… ونساهم في مستهدفات
            </h2>
            <img
              src={vision2030}
              alt="شعار رؤية السعودية 2030"
              width={198}
              height={133}
              loading="lazy"
              className="mt-6 h-20 w-auto sm:h-24"
            />
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
              تمكين المنشآت الصغيرة والمتوسطة أحد أهم مستهدفات رؤية 2030. نساعد أصحاب المشاريع على
              بناء أساس نظامي منظم، وحضور رقمي احترافي، وأدوات تشغيل حديثة تدعم استدامة أعمالهم
              ونموها.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 70}>
                  <div className="border-t border-border pt-4">
                    <h3 className="text-sm font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <figure className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-50px_var(--primary)]">
              <img
                src={landmarks}
                alt="معالم المملكة العربية السعودية: أفق الرياض وبرج المملكة والفيصلية وحي الدرعية التاريخي"
                width={1920}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
