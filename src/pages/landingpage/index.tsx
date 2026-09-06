import { useState, useEffect, useCallback } from "react"
import Navbar from "@/components/Navbar"
import { 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  LayoutGrid, 
  X, 
  Palette, 
  Eye
} from "lucide-react"
import { slides } from "./data/slides"
import { templateItems } from "./data/templates"
import { weddingThemes, type WeddingTheme } from "./data/themes"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFading, setIsFading] = useState(false)

  // Theme Gallery Modal State
  const [isThemeGalleryOpen, setIsThemeGalleryOpen] = useState(false)
  const [selectedThemeCategory, setSelectedThemeCategory] = useState<string>("Semua")
  const [activePreviewTheme, setActivePreviewTheme] = useState<WeddingTheme | null>(null)

  const changeSlide = useCallback((nextIndex: number) => {
    if (isFading) return
    setIsFading(true)
    setTimeout(() => {
      setCurrentSlide(nextIndex)
      setIsFading(false)
    }, 250)
  }, [isFading])

  const handleNext = useCallback(() => {
    const nextIndex = (currentSlide + 1) % slides.length
    changeSlide(nextIndex)
  }, [currentSlide, changeSlide])

  const handlePrev = useCallback(() => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length
    changeSlide(prevIndex)
  }, [currentSlide, changeSlide])

  // Auto-play slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [handleNext])

  const activeSlideData = slides[currentSlide]

  const filteredThemes = selectedThemeCategory === "Semua"
    ? weddingThemes
    : weddingThemes.filter(t => t.category === selectedThemeCategory)

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2A2421] font-sans flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* ================= 1. HERO SECTION (BLUSH GRADIENT) ================= */}
      <div className="min-h-screen blush-gradient flex flex-col justify-between relative">
        
        {/* TOP NAVIGATION BAR */}
        <Navbar activePage="home" />

        {/* HERO CONTENT */}
        <main className="flex-1 flex items-center justify-between px-4 sm:px-8 relative my-auto py-6 min-h-[480px] sm:min-h-[540px]">
          
          {/* Left Arrow Button */}
          <button 
            onClick={handlePrev}
            className="p-3 sm:p-5 text-[#2A2421]/60 hover:text-[#2A2421] hover:scale-125 transition-all cursor-pointer z-30 active:scale-95 shrink-0"
            aria-label="Slide Sebelumnya"
          >
            <ChevronLeft className="h-8 w-8 sm:h-12 sm:w-12 stroke-[1.5]" />
          </button>

          {/* Center Animated Typographic & Image Banner Composition */}
          <div className="flex-1 max-w-4xl mx-auto text-center relative z-10 px-2 flex flex-col items-center justify-center min-h-[440px] sm:min-h-[480px]">
            
            <div className={`w-full transition-opacity duration-300 ease-out will-change-transform ${isFading ? "opacity-0" : "opacity-100"}`}>
              
              {/* Top Subtle Serif Heading */}
              <span className="font-serif-display text-xs sm:text-sm md:text-base font-semibold tracking-[0.35em] text-white/95 uppercase block">
                {activeSlideData.subtitle}
              </span>

              {/* Main Huge Bold Serif Heading */}
              <div className="relative my-1">
                <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-[0.2em] text-white uppercase leading-none drop-shadow-xs">
                  {activeSlideData.title}
                </h1>

                {/* Overlapping Dark Cursive Calligraphy */}
                <div className="font-script text-5xl sm:text-7xl md:text-8xl lg:text-[110px] text-[#2A2421] -mt-8 sm:-mt-14 md:-mt-20 lg:-mt-24 tracking-normal transform -rotate-4 select-none font-bold relative z-20">
                  {activeSlideData.scriptText}
                </div>
              </div>

              {/* Slide Badge Pill */}
              <div className="pt-2">
                <span className="inline-block px-5 py-1.5 rounded-full bg-white text-[#2A2421] text-xs sm:text-sm font-semibold tracking-wide shadow-xs border border-[#2A2421]/10">
                  {activeSlideData.badgeText}
                </span>
              </div>

              {/* Slide Image Banner Showcase (Only rendered when imageSrc exists) */}
              {activeSlideData.imageSrc && (
                <div className="pt-5 flex justify-center items-center">
                  <div className="relative max-w-xs sm:max-w-md md:max-w-lg rounded-2xl overflow-hidden shadow-2xl border-4 border-white/70 bg-white/10 backdrop-blur-xs transform hover:scale-[1.01] transition-transform duration-300">
                    <img 
                      src={activeSlideData.imageSrc} 
                      alt={activeSlideData.title}
                      className="w-full h-auto object-cover max-h-[160px] sm:max-h-[220px]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Top-Right Dedicated Wedding Rings & Sparkle Icon Accent */}
            <div className="hidden sm:block absolute -top-6 right-4 md:right-12 opacity-80 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <svg width="68" height="68" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#2A2421]">
                <circle cx="26" cy="36" r="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="38" cy="36" r="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M26 19L29 23H23L26 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.3" />
                <path d="M26 15V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M48 14L49.5 19L54.5 20.5L49.5 22L48 27L46.5 22L41.5 20.5L46.5 19L48 14Z" fill="currentColor" fillOpacity="0.8" />
                <path d="M14 12L15 15L18 16L15 17L14 20L13 17L10 16L13 15L14 12Z" fill="currentColor" fillOpacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button 
            onClick={handleNext}
            className="p-3 sm:p-5 text-[#2A2421]/60 hover:text-[#2A2421] hover:scale-125 transition-all cursor-pointer z-30 active:scale-95 shrink-0"
            aria-label="Slide Selanjutnya"
          >
            <ChevronRight className="h-8 w-8 sm:h-12 sm:w-12 stroke-[1.5]" />
          </button>

        </main>

        {/* BOTTOM CAROUSEL DOT INDICATORS */}
        <footer className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col items-center gap-2.5 z-20 shrink-0">
          <div className="flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => changeSlide(index)}
                className={`transition-all duration-300 cursor-pointer ${
                  currentSlide === index 
                    ? "w-3 h-3 bg-[#2A2421] rotate-45 scale-110" 
                    : "w-2 h-2 rounded-full bg-[#2A2421]/35 hover:bg-[#2A2421]/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-[#3D332F]/70 tracking-widest uppercase">
            Slide {currentSlide + 1} dari {slides.length}
          </span>
        </footer>

      </div>


      {/* ================= 2. WEDDING TEMPLATE SHOWCASE SECTION (ZIG-ZAG LAYOUT) ================= */}
      <section id="template" className="bg-[#FDFCF9] py-20 sm:py-28 border-t border-[#EBE5DA] relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 space-y-16 sm:space-y-24">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
              Koleksi Desain
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2A2421]">
              Pilihan Templat Undangan
            </h2>
            <p className="text-xs sm:text-sm text-[#78736A] leading-relaxed">
              Tersedia beragam tema desain pernikahan minimalis &amp; elegan yang dapat disesuaikan secara instan.
            </p>

            {/* Button Lihat Semua Tema */}
            <div className="pt-2">
              <button 
                onClick={() => setIsThemeGalleryOpen(true)}
                className="inline-flex items-center gap-2.5 bg-[#2A2421] text-white hover:bg-[#3D332F] text-xs font-bold tracking-[0.18em] uppercase px-7 py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4 text-amber-300" /> Lihat Semua Tema (Katalog Galeri)
              </button>
            </div>
          </div>

          {/* Alternating Template Rows */}
          <div className="space-y-20 sm:space-y-28">
            {templateItems.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div 
                  key={item.id} 
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-10 lg:gap-16`}
                >
                  {/* Frame Placeholder */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div 
                      onClick={() => setIsThemeGalleryOpen(true)}
                      className="w-full max-w-md aspect-4/3 bg-[#FBF9F5] border-2 border-dashed border-[#2A2421]/20 rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-3 shadow-xs hover:border-[#2A2421]/50 transition-all group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-[#2A2421]/10 flex items-center justify-center text-[#78736A] group-hover:text-[#2A2421] group-hover:scale-110 transition-all">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-semibold tracking-wider text-[#2A2421] uppercase block">
                          [ FRAME ASSET TEMPLATE ]
                        </span>
                        <p className="text-[11px] text-[#78736A]">
                          Klik untuk melihat galeri pratinjau tema {item.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Template Detail Content */}
                  <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                    <span className="inline-block text-[11px] font-mono font-semibold tracking-widest text-[#8C5B00] uppercase bg-[#FBF3DB] px-3 py-1 rounded-full border border-[#F5E5B8]">
                      {item.badgeText}
                    </span>

                    <h3 className="font-serif-display text-3xl sm:text-4xl font-extrabold tracking-wider text-[#2A2421] uppercase">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#78736A] leading-relaxed max-w-md mx-auto md:mx-0 font-light">
                      {item.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <button 
                        onClick={() => setIsThemeGalleryOpen(true)}
                        className="inline-flex items-center gap-2 border border-[#2A2421] text-[#2A2421] text-xs font-bold tracking-[0.2em] uppercase px-7 py-3 rounded-md hover:bg-[#2A2421] hover:text-white transition-all cursor-pointer shadow-2xs active:scale-98"
                      >
                        <Eye className="w-4 h-4" /> {item.buttonText}
                      </button>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

          {/* Bottom Callout to Open Theme Gallery */}
          <div className="bg-[#F8F5EE] rounded-3xl p-8 sm:p-10 border border-[#EBE5DA] text-center space-y-4 max-w-3xl mx-auto">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2A2421]">
              Belum Menemukan Gaya yang Pas?
            </h3>
            <p className="text-xs sm:text-sm text-[#78736A] max-w-md mx-auto font-light">
              Jelajahi seluruh koleksi tema warna Botanical, Minimalist, Luxury, Rustic, hingga Adat Tradisional di galeri interaktif kami.
            </p>
            <div>
              <button 
                onClick={() => setIsThemeGalleryOpen(true)}
                className="inline-flex items-center gap-2 bg-[#2A2421] text-white text-xs font-bold tracking-[0.18em] uppercase px-8 py-3.5 rounded-xl hover:bg-[#3D332F] transition-all shadow-sm cursor-pointer"
              >
                <Palette className="w-4 h-4 text-amber-300" /> Buka Katalog Galeri Tema
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FBF9F5] border-t border-[#EBE5DA] py-8 text-center text-xs text-[#78736A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/assets/transaparanlogo.png" alt="Logo" className="h-6 w-auto brightness-0" />
            <span className="font-serif-display font-bold text-sm text-[#2A2421]">Magis Invitation</span>
          </div>
          <p>© 2026 Magis Tech. Undangan Digital Wedding Minimalis.</p>
        </div>
      </footer>


      {/* ================= 3. MODAL KATALOG GALERI TEMA UNDANGAN ================= */}
      {isThemeGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#FBF9F5] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-[#EBE5DA] shadow-2xl flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-[#EBE5DA] flex items-center justify-between sticky top-0 bg-[#FBF9F5]/95 backdrop-blur-md z-10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8C5B00] uppercase">
                  <Palette className="w-3.5 h-3.5" /> Katalog Tema Undangan
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-extrabold text-[#2A2421]">
                  Galeri Pilihan Tema Desain
                </h3>
              </div>

              <button 
                onClick={() => { setIsThemeGalleryOpen(false); setActivePreviewTheme(null); }}
                className="w-10 h-10 rounded-full bg-white border border-[#2A2421]/10 flex items-center justify-center text-[#2A2421] hover:bg-[#2A2421] hover:text-white transition-all cursor-pointer shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["Semua", "Botanical", "Minimalist", "Luxury", "Rustic", "Adat"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedThemeCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedThemeCategory === cat
                        ? "bg-[#2A2421] text-white shadow-sm scale-105"
                        : "bg-white text-[#2A2421] hover:bg-[#F2ECE1] border border-[#2A2421]/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Theme Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredThemes.map((theme) => (
                  <div 
                    key={theme.id}
                    className="bg-white rounded-2xl border border-[#EBE5DA] p-6 space-y-4 flex flex-col justify-between hover:shadow-lg transition-all group"
                  >
                    <div>
                      {/* Theme Styled Header Box */}
                      <div className={`w-full aspect-16/9 ${theme.previewBg} rounded-xl border ${theme.accentColor} p-4 flex flex-col justify-between shadow-xs mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded text-[#2A2421]">
                            {theme.category}
                          </span>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C5B00] bg-[#FBF3DB] px-2 py-0.5 rounded">
                            {theme.badge}
                          </span>
                        </div>

                        <div className="text-center my-auto space-y-1">
                          <span className="font-serif-display font-bold text-sm block tracking-widest uppercase">
                            SAVE THE DATE
                          </span>
                          <span className="font-script text-2xl block text-[#8C5B00]">
                            Romeo &amp; Juliet
                          </span>
                        </div>

                        {/* Color Swatch Dots */}
                        <div className="flex items-center justify-center gap-1.5 pt-1">
                          {theme.colors.map((c, i) => (
                            <span 
                              key={i} 
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs" 
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <h4 className="font-serif-display font-bold text-xl text-[#2A2421] mb-1">
                        {theme.title}
                      </h4>

                      <p className="text-xs text-[#78736A] font-light leading-relaxed">
                        {theme.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#F2ECE1]">
                      <button 
                        onClick={() => setActivePreviewTheme(theme)}
                        className="w-full inline-flex items-center justify-center gap-2 border border-[#2A2421] text-[#2A2421] text-xs font-bold tracking-[0.15em] uppercase py-2.5 rounded-lg hover:bg-[#2A2421] hover:text-white transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Pratinjau Tema
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#EBE5DA] bg-[#FBF9F5] text-center">
              <button 
                onClick={() => { setIsThemeGalleryOpen(false); setActivePreviewTheme(null); }}
                className="bg-[#2A2421] text-white text-xs font-bold tracking-[0.15em] uppercase px-8 py-3 rounded-xl hover:bg-[#3D332F] transition-all cursor-pointer"
              >
                Tutup Katalog
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= 4. SINGLE THEME FULL PREVIEW MODAL ================= */}
      {activePreviewTheme && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in zoom-in-95 duration-200">
          <div className="bg-[#FBF9F5] rounded-3xl max-w-2xl w-full border border-[#EBE5DA] shadow-2xl p-6 sm:p-8 space-y-6 relative">
            
            <button 
              onClick={() => setActivePreviewTheme(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border border-[#2A2421]/10 flex items-center justify-center text-[#2A2421] hover:bg-[#2A2421] hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#8C5B00] uppercase tracking-wider">
                Pratinjau Tema Desain
              </span>
              <h3 className="font-serif-display text-3xl font-extrabold text-[#2A2421]">
                {activePreviewTheme.title}
              </h3>
            </div>

            {/* Simulated Live Theme Frame Container */}
            <div className={`w-full aspect-16/10 ${activePreviewTheme.previewBg} rounded-2xl border-2 ${activePreviewTheme.accentColor} p-6 flex flex-col justify-between shadow-inner text-center relative overflow-hidden space-y-4`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase tracking-widest font-semibold">{activePreviewTheme.category}</span>
                <span className="bg-white/80 px-2 py-0.5 rounded text-[#2A2421] font-bold">{activePreviewTheme.badge}</span>
              </div>

              <div className="space-y-2 my-auto py-4">
                <span className="font-serif-display text-xs font-semibold tracking-[0.35em] block uppercase">
                  UNDANGAN PERNIKAHAN
                </span>
                <h4 className="font-serif-display text-3xl font-black tracking-widest uppercase">
                  ANDI &amp; NISA
                </h4>
                <div className="font-script text-4xl text-[#8C5B00] font-bold -mt-2">
                  Save The Date
                </div>
                <p className="text-xs font-mono pt-2 opacity-80">
                  Sabtu, 24 Oktober 2026 | Jakarta
                </p>
              </div>

              {/* Color Swatches */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="text-[10px] font-mono uppercase text-[#78736A]">Palet Warna:</span>
                {activePreviewTheme.colors.map((c, i) => (
                  <span 
                    key={i} 
                    className="w-4 h-4 rounded-full border border-black/20 shadow-xs" 
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#6A635B] leading-relaxed font-light">
              {activePreviewTheme.description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#EBE5DA]">
              <button 
                onClick={() => setActivePreviewTheme(null)}
                className="w-full sm:w-auto border border-[#2A2421] text-[#2A2421] text-xs font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-xl hover:bg-[#2A2421] hover:text-white transition-all cursor-pointer"
              >
                Kembali ke Galeri
              </button>
              <button 
                onClick={() => { setActivePreviewTheme(null); setIsThemeGalleryOpen(false); }}
                className="w-full sm:w-auto bg-[#2A2421] text-white text-xs font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-xl hover:bg-[#3D332F] transition-all cursor-pointer shadow-md"
              >
                Gunakan Tema Ini
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
