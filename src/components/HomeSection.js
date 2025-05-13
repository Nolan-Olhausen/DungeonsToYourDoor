// src/components/HomeSection.js
import React from "react";
import "../index.css"; // or scoped CSS module if preferred
import dtydImage from "../assets/dndLogoText.png"; // Replace with actual image
import overlayImage from "../assets/dndTestOverlay.jpg"; // Replace with actual image

function HomeSection() {
  return (
    <div className="home-section">
      <img src={dtydImage} alt="Dungeons To Your Door" className="home-top-image" />

      <div className="home-overlay-container">
        <img src={overlayImage} alt="Adventure Awaits" className="overlay-background" />
        <div className="overlay-text">
          <h1>Epic Adventures
            To Your Door
          </h1>
          <p>Bringing immersive, hand-crafted Dungeons & Dragons experiences straight to you, whether you're a seasoned adventurer or new to the realm. 

Gather your party, roll the dice, and let the story unfold!</p>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
