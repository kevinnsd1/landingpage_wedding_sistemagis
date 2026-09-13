import karakterImg from "@/themes/templates/theme1/assets/karakter2.jpeg"

export interface TemplateItem {
  id: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  badgeText: string
  imageSrc?: string
  bgClass?: string
  accentBadge?: string
}

export const templateItems: TemplateItem[] = [
  {
    id: "template-1",
    title: "CLASSIC FLORAL",
    subtitle: "Tema Pernikahan Klasik & Bunga Anggun",
    description: "Sentuhan ornamen bunga lembut dengan huruf serif elegan. Cocok untuk pesta pernikahan bertema intim dan romantis.",
    buttonText: "PRATINJAU TEMA",
    badgeText: "Template 01",
    imageSrc: karakterImg,
    bgClass: "bg-gradient-to-br from-[#DCEEFE] via-[#B9E0FE] to-[#8ECDFF]"
  },
  {
    id: "template-2",
    title: "MODERN BOTANICAL",
    subtitle: "Desain Daun & Nuansa Alam Segar",
    description: "Kombinasi hijau sage dan krem hangat dengan tata letak bersih yang sangat nyaman dibaca para tamu di ponsel.",
    buttonText: "PRATINJAU TEMA",
    badgeText: "Template 02",
    imageSrc: "/assets/weddingbanner/contoh1.png",
    bgClass: "bg-gradient-to-br from-[#F0F7F4] via-[#E8F5E9] to-[#E0F2F1]",
    accentBadge: "Sage Green"
  },
  {
    id: "template-3",
    title: "RUSTIC ELEGANCE",
    subtitle: "Nuansa Kayu & Warm Terracotta",
    description: "Desain estetis bernuansa hangat dengan buku tamu interaktif, peta lokasi, dan konfirmasi RSVP cepat.",
    buttonText: "PRATINJAU TEMA",
    badgeText: "Template 03",
    imageSrc: "/assets/weddingbanner/contoh2.png",
    bgClass: "bg-gradient-to-br from-[#FFF8F0] via-[#FDF3E7] to-[#FBE9D7]",
    accentBadge: "Warm Terracotta"
  },
  {
    id: "template-4",
    title: "MINIMALIST MONOCHROME",
    subtitle: "Gaya Editorial Bersih & Anggun",
    description: "Tanpa dekorasi berlebihan. Tipografi kontras tinggi yang menghadirkan impresi mewah dan berkelas.",
    buttonText: "PRATINJAU TEMA",
    badgeText: "Template 04",
    imageSrc: "/assets/logo.png",
    bgClass: "bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]",
    accentBadge: "Minimalist Slate"
  }
]

