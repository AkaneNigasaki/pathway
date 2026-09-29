import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { CommandPalette } from "./components/CommandPalette/CommandPalette";
import { Home } from "./pages/Home/Home";
import { Fields } from "./pages/Fields/Fields";
import { FieldDetail } from "./pages/Fields/FieldDetail";
import { Roadmaps } from "./pages/Roadmaps/Roadmaps";
import { RoadmapDetail } from "./pages/RoadmapDetail/RoadmapDetail";
import { Careers } from "./pages/Careers/Careers";
import { CareerDetail } from "./pages/Careers/CareerDetail";
import { Explore } from "./pages/Explore/Explore";
import { Skills } from "./pages/Skills/Skills";
import { ProgressPage } from "./pages/Progress/ProgressPage";
import { SkillDoc } from "./pages/SkillDoc/SkillDoc";
import { NotFound } from "./pages/NotFound/NotFound";
import { OverflowAudit } from "./pages/OverflowAudit/OverflowAudit";
import { useTheme } from "./hooks/useTheme";
import { useKeyboardShortcut } from "./hooks/useKeyboardShortcut";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  const { theme, toggle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useKeyboardShortcut("k", openPalette);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar theme={theme} onToggleTheme={toggle} onOpenPalette={openPalette} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/fields" element={<Fields />} />
          <Route path="/fields/:id" element={<FieldDetail />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/:slug" element={<RoadmapDetail />} />
          <Route path="/docs/:roadmapSlug/:skillId" element={<SkillDoc />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<CareerDetail />} />
          <Route path="/progression" element={<ProgressPage />} />
          <Route path="/__audit" element={<OverflowAudit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </BrowserRouter>
  );
}
