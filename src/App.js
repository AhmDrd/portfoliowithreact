import Navbar from "./scenes/Navbar";
import Landing from "./scenes/Landing";
import DotGroup from "./scenes/DotGroup";
import MySkills from "./scenes/MySkills";
import LineGradient from "./components/LineGradient";
import Projects from "./scenes/Projects";
import Contact from "./scenes/Contact";
import Footer from "./scenes/Footer";
import useMediaQuery from "./hooks/useMediaQuery";
import { useEffect, useState } from "react";
import Testimonials from "./scenes/Testimonials";

const sectionIds = ["home", "skills", "projects", "testimonials", "contact"];
const sectionActivationLine = 140;

const SectionTracker = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);

function App() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 1060px)");

  useEffect(() => {
    let frameId = null;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setIsTopOfPage(scrollY === 0);

      if (scrollY === 0) {
        setSelectedPage((prev) => (prev === "home" ? prev : "home"));
        frameId = null;
        return;
      }

      let activeSection = "home";
      let fallbackSection = "home";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top <= sectionActivationLine) {
          fallbackSection = sectionId;
        }

        if (
          rect.top <= sectionActivationLine &&
          rect.bottom > sectionActivationLine
        ) {
          activeSection = sectionId;
          break;
        }
      }

      if (activeSection === "home" && fallbackSection !== "home") {
        activeSection = fallbackSection;
      }

      setSelectedPage((prev) =>
        prev === activeSection ? prev : activeSection
      );
      frameId = null;
    };

    const handleScroll = () => {
      if (frameId != null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScrollState);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId != null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="app bg-deep-blue">
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <SectionTracker className="w-5/6 mx-auto md:h-full">
        {isDesktop && (
          <DotGroup
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        )}
        <Landing setSelectedPage={setSelectedPage} />
      </SectionTracker>
      <LineGradient />
      <SectionTracker className="w-5/6 mx-auto md:h-full">
        <MySkills />
      </SectionTracker>
      <LineGradient />
      <SectionTracker className="w-5/6 mx-auto">
        <Projects />
      </SectionTracker>
      <LineGradient />
      <SectionTracker className="w-5/6 mx-auto md:h-full">
        <Testimonials />
      </SectionTracker>
      <LineGradient />
      <SectionTracker className="w-5/6 mx-auto md:h-full">
        <Contact />
      </SectionTracker>
      <Footer />
    </div>
  );
}

export default App;
