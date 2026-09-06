export interface TemplateItem {
  id: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  badgeText: string
  imageSrc?: string
}

export const templateItems: TemplateItem[] = [
  {
    id: "template-1",
    title: "CLASSIC FLORAL",
    subtitle: "Tema Pernikahan Klasik & Bunga Anggun",
    description: "Sentuhan ornamen bunga lembut dengan huruf serif elegan. Cocok untuk pesta pernikahan bertema intim dan romantis.",
    buttonText: "PRATINJAU TEMA",
    badgeText: "Template 01"
  },
  {
    id: "template-2",
    title: "MODERN BOTANICAL",
    subtitle: "Desain Daun & Nuansa Alam Segar",
    description: "Kombinasi hijau sage dan krem hangat dengan tata letak bersih yang sangat nyaman dibaca para tamu di ponsel.",
    buttonText: "PRATINJAU TEMA",
    badgeText: "Template 02"
  },
  {
    id: "template-3",
    title: "RUSTIC ELEGANCE",
    subtitle: "Nuansa Kayu & Warm Terracotta",
    description: "Desain estetis bernuansa hangat dengan buku tamu interaktif, peta lokasi, dan konfirmasi RSVP cepat.",
    buttonText: "PRATINJAU TEMA",
    badgeText: "Template 03"
  },
  {
    id: "template-4",
    title: "MINIMALIST MONOCHROME",
    subtitle: "Gaya Editorial Bersih & Anggun",
    description: "Tanpa dekorasi berlebihan. Tipografi kontras tinggi yang menghadirkan impresi mewah dan berkelas.",
    buttonText: "PRATINJAU TEMA",
    badgeText: "Template 04"
  }
]
