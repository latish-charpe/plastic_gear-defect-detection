import { useState, useRef, useCallback } from "react";
import { Navbar, HeroSection } from "./components/NavbarHero";
import { UploadWorkspace } from "./components/UploadWorkspace";
import { AnalysisResults } from "./components/AnalysisResults";
import { DetectionTable } from "./components/DetectionTable";
import { ProcessCorrection } from "./components/ProcessCorrection";
import { DefectDetailPage } from "./components/DefectDetailPage";
import { DefectClassGrid } from "./components/DefectClassGrid";
import { AboutPage } from "./components/AboutPage";
import { Footer } from "./components/Footer";
import { analyzeImage } from "./api/analyzeApi";

export default function App() {
  const [currentView, setCurrentView] = useState("inspection"); // "inspection" | "detail" | "about"
  const [selectedDefectId, setSelectedDefectId] = useState("broken");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [error, setError] = useState(null);
  const analysisRef = useRef(null);

  const handleAnalyze = useCallback(async (file) => {
    setError(null);
    setResult(null);
    setIsLoading(true);

    // Keep original preview for side-by-side display
    const previewUrl = URL.createObjectURL(file);
    setOriginalPreview(previewUrl);

    try {
      const data = await analyzeImage(file);
      setResult(data);
      // Scroll to results after a short delay
      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setOriginalPreview(null);
    setError(null);
  }, []);

  const scrollToAnalysis = () => {
    setCurrentView("inspection");
    setTimeout(() => {
      document.querySelector("#analysis")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleSelectDefect = (defectId) => {
    setSelectedDefectId(defectId);
    setCurrentView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCatalog = () => {
    setCurrentView("inspection");
    setTimeout(() => {
      document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleGoToInspection = () => {
    setCurrentView("inspection");
    setTimeout(() => {
      document.querySelector("#analysis")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleNavigate = (view) => {
    if (view === "about") {
      setCurrentView("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (view === "catalog") {
      if (currentView === "detail" || currentView === "about") {
        setCurrentView("inspection");
        setTimeout(() => {
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      } else {
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setCurrentView("inspection");
      setTimeout(() => {
        document.querySelector("#analysis")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <div className="app">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {currentView === "about" ? (
        <main className="main-content">
          <AboutPage
            onBackToInspection={() => {
              setCurrentView("inspection");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onGoToCatalog={handleBackToCatalog}
            onStartInspection={handleGoToInspection}
          />
        </main>
      ) : currentView === "detail" ? (
        <main className="main-content">
          <DefectDetailPage
            defectId={selectedDefectId}
            onBack={handleBackToCatalog}
            onSelectDefect={handleSelectDefect}
            onGoToInspection={handleGoToInspection}
          />
        </main>
      ) : (
        <>
          <HeroSection onStartAnalysis={scrollToAnalysis} />

          <main className="main-content">
            <UploadWorkspace
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              error={error}
              onReset={handleReset}
            />

            {/* Results anchor */}
            <div ref={analysisRef} />

            {result && (
              <>
                <AnalysisResults result={result} originalPreview={originalPreview} />
                <DetectionTable detections={result.detections} />
                <ProcessCorrection result={result} />
              </>
            )}

            <DefectClassGrid onSelectDefect={handleSelectDefect} />
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}
