import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "@/pages/landingpage"
import FeaturesPage from "@/pages/features"
import WeddingPlannerPage from "@/pages/wedding-planner"
import BukuTamuPage from "@/pages/buku-tamu"
import KontakPage from "@/pages/kontak"
import HargaPage from "@/pages/harga"
import Theme1Page from "@/themes/templates/theme1"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fitur" element={<FeaturesPage />} />
        <Route path="/wedding-planner" element={<WeddingPlannerPage />} />
        <Route path="/wo" element={<WeddingPlannerPage />} />
        <Route path="/bukutamu" element={<BukuTamuPage />} />
        <Route path="/buku-tamu" element={<BukuTamuPage />} />
        <Route path="/kontak" element={<KontakPage />} />
        <Route path="/contact" element={<KontakPage />} />
        <Route path="/harga" element={<HargaPage />} />
        <Route path="/pricing" element={<HargaPage />} />

        {/* Demo Template Theme 1 Routes */}
        <Route path="/demo/theme-1" element={<Theme1Page />} />
        <Route path="/demo/theme1" element={<Theme1Page />} />
        <Route path="/theme1" element={<Theme1Page />} />
        <Route path="/template/theme-1" element={<Theme1Page />} />
        <Route path="/contoh-1" element={<Theme1Page />} />
      </Routes>
    </BrowserRouter>
  )
}
