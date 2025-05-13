import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ScrollButton from "./components/ScrollButton";

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
      <div id="Home" className="section"></div>
      <div id="The DM" className="section"></div>
      <div id="Adventures" className="section"></div>
      <div id="Pricing" className="section"></div>
      <div id="Contact" className="section"></div>
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
