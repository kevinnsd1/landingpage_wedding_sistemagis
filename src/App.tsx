import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import LandingPage from "@/pages/landingpage"
import FeaturesPage from "@/pages/features"
import WeddingPlannerPage from "@/pages/wedding-planner"
import BukuTamuPage from "@/pages/buku-tamu"
import KontakPage from "@/pages/kontak"
import HargaPage from "@/pages/harga"
import Theme1Page from "@/themes/templates/theme1"

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      const sectionId = hash.replace("#", "")
      const element = document.getElementById(sectionId)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 150)
      } else {
        window.scrollTo(0, 0)
      }
    }
  }, [pathname, hash])

  return null
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <div key={location.pathname} className="animate-page-fade w-full min-h-screen">
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/fitur" element={<PageWrapper><FeaturesPage /></PageWrapper>} />
        <Route path="/wedding-planner" element={<PageWrapper><WeddingPlannerPage /></PageWrapper>} />
        <Route path="/wo" element={<PageWrapper><WeddingPlannerPage /></PageWrapper>} />
        <Route path="/bukutamu" element={<PageWrapper><BukuTamuPage /></PageWrapper>} />
        <Route path="/buku-tamu" element={<PageWrapper><BukuTamuPage /></PageWrapper>} />
        <Route path="/kontak" element={<PageWrapper><KontakPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><KontakPage /></PageWrapper>} />
        <Route path="/harga" element={<PageWrapper><HargaPage /></PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper><HargaPage /></PageWrapper>} />

        {/* Demo Template Theme 1 Routes */}
        <Route path="/demo/theme-1" element={<PageWrapper><Theme1Page /></PageWrapper>} />
        <Route path="/demo/theme1" element={<PageWrapper><Theme1Page /></PageWrapper>} />
        <Route path="/theme1" element={<PageWrapper><Theme1Page /></PageWrapper>} />
        <Route path="/template/theme-1" element={<PageWrapper><Theme1Page /></PageWrapper>} />
        <Route path="/contoh-1" element={<PageWrapper><Theme1Page /></PageWrapper>} />
      </Routes>
    </BrowserRouter>
  )
}

