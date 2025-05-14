// src/components/HomeSection.js
import React from "react";
import "../index.css";
import dtydImage from "../assets/dndLogoText.png";
import overlayImage from "../assets/campfire.png";

function HomeSection() {
  return (
    <div className="home-section">
      <img src={dtydImage} alt="Dungeons To Your Door" className="home-top-image" />

      <div className="home-overlay-container">
        <img src={overlayImage} alt="Adventure Awaits" className="overlay-background" />
        <div className="overlay-text">
          <h1>Epic Adventures</h1>
          <h1>To Your Door</h1>
          <p>Bringing immersive, hand-crafted 5e experiences straight to you, whether you're a seasoned adventurer or new to the realm. <br /><br />Gather your party, roll the dice, and let the story unfold!</p>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
