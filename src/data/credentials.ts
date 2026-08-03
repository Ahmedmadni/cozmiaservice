import badgeBusinessCenterAsset from "@/assets/saudi-business-center.png.asset.json";
import badgeZakatVatAsset from "@/assets/zatca.png.asset.json";

const badgeBusinessCenter = badgeBusinessCenterAsset.url;
const badgeZakatVat = badgeZakatVatAsset.url;

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  logo: string;
  /** رابط ملف الشهادة (PDF أو صورة) — اتركه فارغًا حتى تتوفر النسخة الرسمية */
  file?: string;
  note: string;
  fields: { label: string; value: string; dir?: "ltr" | "rtl" }[];
};

/**
 * بيانات التوثيق النظامي — عدّل الأرقام والتواريخ وأضف روابط ملفات الشهادات الرسمية.
 */
export const credentials: Credential[] = [
  {
    id: "business-center",
    title: "توثيق المركز السعودي للأعمال",
    issuer: "المركز السعودي للأعمال",
    logo: badgeBusinessCenter,
    note: "البيانات المعروضة توضيحية ضمن النسخة التجريبية من الموقع، ويجري تحديثها بالنسخة الرسمية الصادرة من الجهة المختصة.",
    fields: [
      { label: "رقم السجل التجاري", value: "١٠١٠٠٠٠٠٠٠", dir: "ltr" },
      { label: "الكيان النظامي", value: "شركة ذات مسؤولية محدودة" },
      { label: "النشاط الرئيسي", value: "حلول ودعم الأعمال" },
      { label: "المدينة", value: "الرياض" },
      { label: "الحالة", value: "قائمة وسارية" },
    ],
  },
  {
    id: "zakat-vat",
    title: "شهادة الزكاة وضريبة القيمة المضافة",
    issuer: "هيئة الزكاة والضريبة والجمارك",
    logo: badgeZakatVat,
    note: "تُصدر الشهادة إلكترونيًا من الجهة المختصة، والبيانات هنا توضيحية ضمن النسخة التجريبية من الموقع.",
    fields: [
      { label: "الرقم الضريبي", value: "٣٠٠٠٠٠٠٠٠٠٠٠٠٠٣", dir: "ltr" },
      { label: "نوع التسجيل", value: "ضريبة القيمة المضافة" },
      { label: "تاريخ التسجيل", value: "٠١/٠١/١٤٤٦هـ" },
      { label: "الفترة الضريبية", value: "ربع سنوية" },
      { label: "الحالة", value: "مسجّلة" },
    ],
  },
];
