export interface WeddingTheme {
  id: string
  title: string
  category: "Botanical" | "Minimalist" | "Luxury" | "Rustic" | "Adat"
  description: string
  colors: string[]
  badge: string
  previewBg: string
  textColor: string
  accentColor: string
}


export const weddingThemes: WeddingTheme[] = [
  {
    id: "classic-floral",
    title: "Classic Floral Blush",
    category: "Botanical",
    description: "Sentuhan ornamen bunga sakura lembut dengan huruf serif elegan. Cocok untuk pesta pernikahan bertema intim dan romantis.",
    colors: ["#F6B4B7", "#FAF6F2", "#2A2421"],
    badge: "Terfavorit",
    previewBg: "bg-[#F7E6E8]",
    textColor: "text-[#2A2421]",
    accentColor: "border-[#F5ACB0]"
  },
  {
    id: "botanical-sage",
    title: "Sage Eucalyptus Garden",
    category: "Botanical",
    description: "Dedaunan sage green lembut bertema nuansa alam segar & tropis untuk pernikahan outdoor dan pesta garden party.",
    colors: ["#7A9A8B", "#F4F6F4", "#2D3E35"],
    badge: "Populer",
    previewBg: "bg-[#EAEFEA]",
    textColor: "text-[#2D3E35]",
    accentColor: "border-[#7A9A8B]"
  },
  {
    id: "rustic-terracotta",
    title: "Terracotta Rustic Warmth",
    category: "Rustic",
    description: "Warna warm terracotta alami bersatu dengan tekstur kayu & serat bohemian modern yang estetis.",
    colors: ["#C86D51", "#FAF3EE", "#3D2B24"],
    badge: "Trendy",
    previewBg: "bg-[#F9ECE6]",
    textColor: "text-[#3D2B24]",
    accentColor: "border-[#C86D51]"
  },
  {
    id: "luxury-obsidian-gold",
    title: "Obsidian Gold Deluxe",
    category: "Luxury",
    description: "Nuansa gelap eksklusif dipadukan dengan tipografi emas bersinar. Memberikan kesan mewah dan megah.",
    colors: ["#1A1817", "#D4AF37", "#FFFFFF"],
    badge: "Eksklusif",
    previewBg: "bg-[#1F1D1C]",
    textColor: "text-amber-200",
    accentColor: "border-amber-400"
  },
  {
    id: "minimalist-champagne",
    title: "Champagne Minimalist",
    category: "Minimalist",
    description: "Desain ultra bersih dengan aksen garis tipografi warna champagne lembut. Menonjolkan keindahan dalam kesederhanaan.",
    colors: ["#F7F3EC", "#D6C5B3", "#2A2421"],
    badge: "Minimalis",
    previewBg: "bg-[#F8F5EF]",
    textColor: "text-[#2A2421]",
    accentColor: "border-[#D6C5B3]"
  },
  {
    id: "jawa-royal-batik",
    title: "Ukiran Batik Gurdo Jawa",
    category: "Adat",
    description: "Motif batik tradisional Jawa dengan ukiran Gurdo emas modern. Anggun dan sarat akan filosofi kebudayaan.",
    colors: ["#4A3525", "#D4AF37", "#FAF6F0"],
    badge: "Tradisional",
    previewBg: "bg-[#F4ECE3]",
    textColor: "text-[#3A271B]",
    accentColor: "border-[#D4AF37]"
  },
  {
    id: "minang-maroon-royal",
    title: "Suntiang Maroon Minang",
    category: "Adat",
    description: "Kemewahan ornamen ukiran Minangkabau berlatar warna merah maroon & emas nan megah.",
    colors: ["#800020", "#E6C200", "#FDFBF7"],
    badge: "Tradisional",
    previewBg: "bg-[#F9EBEF]",
    textColor: "text-[#800020]",
    accentColor: "border-[#800020]"
  },
  {
    id: "emerald-glam",
    title: "Emerald Elegance",
    category: "Luxury",
    description: "Warna hijau jamrud tua dipadukan lis emas berkilau untuk memberikan nuansa royal nan menawan.",
    colors: ["#0F382C", "#D4AF37", "#F0F7F4"],
    badge: "Baru",
    previewBg: "bg-[#E6F0EB]",
    textColor: "text-[#0F382C]",
    accentColor: "border-[#0F382C]"
  }
]
