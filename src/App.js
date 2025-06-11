import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import ScrollButton from "./components/ScrollButton";
import HomeSection from "./components/HomeSection";
import DMSection from "./components/DMSection";
import AdventuresSection from "./components/AdventuresSection";
import PricingSection from "./components/PricingSection";
import ContactSection from "./components/ContactSection";

function App() {
  const [activePage, setActivePage] = useState("Home");
  const scrollOrder = ["Home", "The DM", "Adventures", "Pricing", "Contact"];
  const scrollText = [
    { line1: "Meet The", line2: "Dungeon Master" },
    { line1: "View The", line2: "Adventure Log" },
    { line1: "Price To", line2: "Roll The Dice" },
    { line1: "Send A Raven", line2: "" },
    { line1: "Back To The Top", line2: "" },
  ];

  const isScrolling = useRef(false);
  const [isLocked, setIsLocked] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });
  const SCROLL_LOCK_DURATION = 600;
  const MIN_SWIPE_DISTANCE = 100;

  const scrollToSection = (index) => {
    const nextPage = scrollOrder[index];
    const target = document.getElementById(nextPage);
    if (target) {
      isScrolling.current = true;
      setIsLocked(true); // Lock interactions
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setActivePage(nextPage);
        isScrolling.current = false;
        setIsLocked(false); // Unlock interactions
      }, SCROLL_LOCK_DURATION);
    }
  };

  const handleWheel = (e) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    const currentIndex = scrollOrder.indexOf(activePage);
    const deltaY = e.deltaY;

    if (deltaY > 0 && currentIndex < scrollOrder.length - 1) {
      scrollToSection(currentIndex + 1);
    } else if (deltaY < 0 && currentIndex > 0) {
      scrollToSection(currentIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchMove = (e) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    if (isScrolling.current) {
      return;
    }

    const distanceY = touchStart.current.y - touchEnd.current.y;

    // Only proceed if swipe distance is beyond threshold
    if (Math.abs(distanceY) > MIN_SWIPE_DISTANCE) {
      isScrolling.current = true;

      const currentIndex = scrollOrder.indexOf(activePage);
      if (
        distanceY > MIN_SWIPE_DISTANCE &&
        currentIndex < scrollOrder.length - 1
      ) {
        scrollToSection(currentIndex + 1);
      } else if (distanceY < -MIN_SWIPE_DISTANCE && currentIndex > 0) {
        scrollToSection(currentIndex - 1);
      }

      // Reset lock after scroll duration
      setTimeout(() => {
        isScrolling.current = false;
      }, SCROLL_LOCK_DURATION);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activePage]);

  const handleNavClick = (page) => {
    if (isScrolling.current) return;
    const target = document.getElementById(page);
    if (target) {
      isScrolling.current = true;
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setActivePage(page);
        isScrolling.current = false;
      }, SCROLL_LOCK_DURATION);
    }
  };

  const handleScrollClick = () => {
    if (isScrolling.current) return;
    const currentIndex = scrollOrder.indexOf(activePage);
    const nextIndex =
      currentIndex === scrollOrder.length - 1 ? 0 : currentIndex + 1;
    scrollToSection(nextIndex);
  };

  return (
    <div className="App">
      <Navbar activePage={activePage} onNavClick={handleNavClick} />
      <div id="Home" className="section">
        <HomeSection />
      </div>
      <div id="The DM" className="section">
        <DMSection />
      </div>
      <div id="Adventures" className="section">
        <AdventuresSection />
      </div>
      <div id="Pricing" className="section">
        <PricingSection />
      </div>
      <div id="Contact" className="section">
        <ContactSection />
      </div>
      <ScrollButton
        isLastSection={
          scrollOrder.indexOf(activePage) === scrollOrder.length - 1
        }
        onClick={handleScrollClick}
        label={scrollText[scrollOrder.indexOf(activePage)]}
      />
      {/* Interaction Lock Overlay */}
      {isLocked && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            backgroundColor: "transparent",
            pointerEvents: "all",
            touchAction: "none",
            userSelect: "none",
          }}
          onTouchStart={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
}

export default App;
