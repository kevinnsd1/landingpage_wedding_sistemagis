export interface SlideData {
  id: number
  subtitle: string
  title: string
  scriptText: string
  badgeText: string
  description?: string
  imageSrc?: string
  accentColor: string
}

export const slides: SlideData[] = [
  {
    id: 0,
    subtitle: "THE SACRED MOMENT",
    title: "WEDDING",
    scriptText: "digital invitation",
    badgeText: "Undangan Pernikahan Eksklusif & Anggun",
    description: "Hadirkan momen bahagia Anda dalam tampilan digital yang tenang, mewah, dan berkesan.",
    accentColor: "#2A2421"
  },
  {
    id: 1,
    subtitle: "ELEGANT & BOTANICAL",
    title: "THE DAY",
    scriptText: "save the date",
    badgeText: "Tema Botanis & Minimalist Modern",
    description: "Pilihan layout pernikahan bernuansa alami dengan fitur lengkap untuk hari spesial.",
    imageSrc: "/assets/weddingbanner/contoh1.png",
    accentColor: "#231B19"
  },
  {
    id: 2,
    subtitle: "FOREVER & ALWAYS",
    title: "OUR STORY",
    scriptText: "wedding gallery",
    badgeText: "Galeri Foto, Musik & Buku Tamu",
    description: "Abadikan kisah cinta Anda dilengkapi musik latar favorit dan konfirmasi kehadiran tamu.",
    imageSrc: "/assets/weddingbanner/contoh2.png",
    accentColor: "#2A2421"
  }
]
