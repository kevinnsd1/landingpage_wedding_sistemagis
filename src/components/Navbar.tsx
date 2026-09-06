import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, MessageCircle, ArrowRight } from "lucide-react"

interface NavbarProps {
  activePage?: "template" | "fitur" | "wedding-planner" | "harga" | "bukutamu" | "kontak" | "home"
}

export default function Navbar({ activePage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const whatsappNumber = "62895351878050"
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo Magis Invitation, saya berminat membuat undangan digital. Mohon informasi selengkapnya.")}`

  const isLinkActive = (path: string, key?: string) => {
    if (activePage && key === activePage) return true
    if (path === "/" && location.pathname === "/") return true
    return location.pathname === path
  }

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "")
      if (location.pathname === "/") {
        e.preventDefault()
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  const navLinks = [
    { label: "TEMPLATE", href: "/#template", key: "template" },
    { label: "FITUR", href: "/fitur", key: "fitur" },
    { label: "WEDDING PLANNER", href: "/wedding-planner", key: "wedding-planner" },
    { label: "HARGA", href: "/harga", key: "harga" },
    { label: "BUKU TAMU", href: "/bukutamu", key: "bukutamu" },
    { label: "KONTAK", href: "/kontak", key: "kontak" },
  ]

  return (
    <header className="w-full bg-transparent sticky top-0 z-50 transition-all overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-5 flex items-center justify-between">
        
        {/* Mobile Header: Logo + Hamburger Button */}
        <div className="flex items-center justify-between w-full md:hidden">
          <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src="/assets/transaparanlogo.png" 
              alt="Logo Magis" 
              className="h-8 sm:h-10 w-auto object-contain brightness-0 shrink-0"
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#2A2421] hover:bg-[#EBE5DA]/50 rounded-lg transition-colors focus:outline-none shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Split Navigation */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left Nav */}
          <nav className="flex items-center gap-6 lg:gap-8 text-[11px] font-bold tracking-[0.2em] lg:tracking-[0.25em] uppercase text-[#3D332F]">
            <Link 
              to="/#template" 
              onClick={(e) => handleNavClick("/#template", e)}
              className={`hover:opacity-80 transition-opacity ${isLinkActive("/#template", "template") ? "border-b-2 border-[#2A2421] text-[#2A2421] font-extrabold pb-0.5" : ""}`}
            >
              TEMPLATE
            </Link>
            <Link 
              to="/fitur" 
              className={`hover:opacity-80 transition-opacity ${isLinkActive("/fitur", "fitur") ? "border-b-2 border-[#2A2421] text-[#2A2421] font-extrabold pb-0.5" : ""}`}
            >
              FITUR
            </Link>
            <Link 
              to="/wedding-planner" 
              className={`hover:opacity-80 transition-opacity ${isLinkActive("/wedding-planner", "wedding-planner") ? "border-b-2 border-[#2A2421] text-[#2A2421] font-extrabold pb-0.5" : ""}`}
            >
              WEDDING PLANNER
            </Link>
          </nav>

          {/* Center Logo */}
          <Link to="/" className="flex items-center justify-center group shrink-0 mx-4">
            <img 
              src="/assets/transaparanlogo.png" 
              alt="Logo Magis" 
              className="h-12 lg:h-16 w-auto object-contain brightness-0 group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Right Nav */}
          <nav className="flex items-center gap-6 lg:gap-8 text-[11px] font-bold tracking-[0.2em] lg:tracking-[0.25em] uppercase text-[#3D332F]">
            <Link 
              to="/harga" 
              className={`hover:opacity-80 transition-opacity ${isLinkActive("/harga", "harga") ? "border-b-2 border-[#2A2421] text-[#2A2421] font-extrabold pb-0.5" : ""}`}
            >
              HARGA
            </Link>
            <Link 
              to="/bukutamu" 
              className={`hover:opacity-80 transition-opacity ${isLinkActive("/bukutamu", "bukutamu") ? "border-b-2 border-[#2A2421] text-[#2A2421] font-extrabold pb-0.5" : ""}`}
            >
              BUKU TAMU
            </Link>
            <Link 
              to="/kontak" 
              className={`hover:opacity-80 transition-opacity ${isLinkActive("/kontak", "kontak") ? "border-b-2 border-[#2A2421] text-[#2A2421] font-extrabold pb-0.5" : ""}`}
            >
              KONTAK
            </Link>
          </nav>
        </div>

      </div>

      {/* Mobile Slide-down Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden blush-gradient border-b border-[#EBE5DA] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-xs font-bold tracking-widest uppercase text-[#2A2421]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                  isLinkActive(link.href, link.key) 
                    ? "bg-[#2A2421] text-white font-extrabold" 
                    : "hover:bg-[#EBE5DA]/50 text-[#3D332F]"
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#EBE5DA]">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold tracking-wider uppercase py-3 rounded-xl transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" /> Hubungi WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
