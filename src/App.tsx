import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "@/pages/landingpage"
import FeaturesPage from "@/pages/features"
import WeddingPlannerPage from "@/pages/wedding-planner"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fitur" element={<FeaturesPage />} />
        <Route path="/wedding-planner" element={<WeddingPlannerPage />} />
        <Route path="/wo" element={<WeddingPlannerPage />} />
      </Routes>
    </BrowserRouter>
  )
}
