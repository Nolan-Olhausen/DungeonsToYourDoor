import "./App.css";
import React, { useState } from "react";
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

  const handleScrollClick = () => {
    const currentIndex = scrollOrder.indexOf(activePage);
    const isLast = currentIndex === scrollOrder.length - 1;
    const nextIndex = isLast ? 0 : currentIndex + 1;
    const nextPage = scrollOrder[nextIndex];

    // Scroll to section and update navbar state
    const target = document.getElementById(nextPage);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActivePage(nextPage);
    }
  };

  return (
    <div className="App">
      <Navbar
        activePage={activePage}
        onNavClick={(page) => {
          const target = document.getElementById(page);
          if (target) target.scrollIntoView({ behavior: "smooth" });
          setActivePage(page);
        }}
      />
      <div id="Home" className="section"><HomeSection /></div>
      <div id="The DM" className="section"><DMSection /></div>
      <div id="Adventures" className="section"><AdventuresSection /></div>
      <div id="Pricing" className="section"><PricingSection /></div>
      <div id="Contact" className="section"><ContactSection /></div>
      <ScrollButton
        isLastSection={
          scrollOrder.indexOf(activePage) === scrollOrder.length - 1
        }
        onClick={handleScrollClick}
        label={scrollText[scrollOrder.indexOf(activePage)]}
      />
    </div>
  );
}

export default App;
