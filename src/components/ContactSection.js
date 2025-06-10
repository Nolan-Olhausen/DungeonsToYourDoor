// src/components/ContactSection.js
import React from "react";
import "../index.css";
import DiceDesktopScene from "./DiceScene";

function ContactSection() {
  return (
    <div className="contact-section" id="Contact">
      <div className="mobile-contact-section">
        
      </div>
      <div className="desktop-contact-section">
        <div className="overlay-text">
          <h1>Epic Adventures</h1>
          <h1>To Your Door</h1>
          <p>
            Bringing immersive, hand-crafted 5e experiences straight to you,
            whether you're a seasoned adventurer or new to the realm. <br />
            <br />
            Gather your party, roll the dice, and let the story unfold!
          </p>
        </div>

        <div className="home-image-container">
          <DiceDesktopScene />
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
