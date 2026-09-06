import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "@/pages/landingpage"
import FeaturesPage from "@/pages/features"
import WeddingPlannerPage from "@/pages/wedding-planner"
import BukuTamuPage from "@/pages/buku-tamu"

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
      </Routes>
    </BrowserRouter>
  )
}
