import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"
import { slides } from "./data/slides"
import { templateItems } from "./data/templates"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFading, setIsFading] = useState(false)

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

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2A2421] font-sans flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* ================= 1. HERO SECTION (BLUSH GRADIENT) ================= */}
      <div className="min-h-screen blush-gradient flex flex-col justify-between relative">
        
        {/* TOP NAVIGATION BAR */}
        <header className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between z-20 shrink-0">
          
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.25em] uppercase text-[#3D332F]">
            <a href="#template" className="border-b border-[#2A2421] pb-0.5 hover:opacity-80 transition-opacity">
              TEMPLATE
            </a>
            <Link to="/fitur" className="hover:opacity-80 transition-opacity">
              FITUR
            </Link>
            <Link to="/wedding-planner" className="hover:opacity-80 transition-opacity">
              WEDDING PLANNER
            </Link>
          </nav>

          {/* Center Logo Image */}
          <Link to="/" className="mx-auto md:mx-0 flex items-center justify-center">
            <img 
              src="/assets/transaparanlogo.png" 
              alt="Logo Magis" 
              className="h-12 sm:h-16 lg:h-20 w-auto object-contain brightness-0 cursor-pointer hover:opacity-85 transition-all"
            />
          </Link>

          {/* Right Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.25em] uppercase text-[#3D332F]">
            <a href="#harga" className="hover:opacity-80 transition-opacity">
              HARGA
            </a>
            <a href="#bukutamu" className="hover:opacity-80 transition-opacity">
              BUKU TAMU
            </a>
            <a href="#kontak" className="hover:opacity-80 transition-opacity">
              KONTAK
            </a>
          </nav>
        </header>

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
                {/* Left Interlocking Wedding Ring */}
                <circle cx="26" cy="36" r="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                {/* Right Interlocking Wedding Ring */}
                <circle cx="38" cy="36" r="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                {/* Diamond Gem Top */}
                <path d="M26 19L29 23H23L26 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.3" />
                <path d="M26 15V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Sparkle Star 1 */}
                <path d="M48 14L49.5 19L54.5 20.5L49.5 22L48 27L46.5 22L41.5 20.5L46.5 19L48 14Z" fill="currentColor" fillOpacity="0.8" />
                {/* Sparkle Star 2 (Small) */}
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
        <div className="max-w-6xl mx-auto px-6 sm:px-12 space-y-24 sm:space-y-32">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
              Koleksi Desain
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2A2421]">
              Pilihan Templat Undangan
            </h2>
            <p className="text-xs sm:text-sm text-[#78736A] leading-relaxed">
              Tersedia beragam tema desain pernikahan minimalis &amp; elegan yang dapat disesuaikan secara instan.
            </p>
          </div>

          {/* Alternating Template Rows */}
          {templateItems.map((item, index) => {
            const isEven = index % 2 === 0
            return (
              <div 
                key={item.id} 
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-10 lg:gap-16`}
              >
                {/* Empty Asset Frame Placeholder */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-full max-w-md aspect-4/3 bg-[#FBF9F5] border-2 border-dashed border-[#2A2421]/20 rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-3 shadow-xs hover:border-[#2A2421]/40 transition-colors group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#2A2421]/10 flex items-center justify-center text-[#78736A] group-hover:text-[#2A2421] transition-colors">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-semibold tracking-wider text-[#2A2421] uppercase block">
                        [ FRAME ASSET TEMPLATE ]
                      </span>
                      <p className="text-[11px] text-[#78736A]">
                        Frame kosong — siap diisi gambar screenshot templat {item.title}
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

                  <div className="pt-2">
                    <button className="border border-[#2A2421] text-[#2A2421] text-xs font-bold tracking-[0.2em] uppercase px-7 py-3 rounded-md hover:bg-[#2A2421] hover:text-white transition-all cursor-pointer shadow-2xs active:scale-98">
                      {item.buttonText}
                    </button>
                  </div>
                </div>

              </div>
            )
          })}

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

    </div>
  )
}
