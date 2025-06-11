// src/components/ContactSection.js
import React from "react";
import "../index.css";
import { DiceDesktopScene, DiceMobileScene } from "./DiceScene";

function ContactSection() {
  return (
    <div className="contact-section" id="Contact">
      <div className="mobile-contact-section">
        <h1>Summon The</h1>
        <h1>Dungeon Master</h1>
        <p>
          Have questions, seeketh counsel, or wish to forge an alliance?
          Dispatch your message by trusted courier or channel it through the
          Arcane Crystal. The Dungeon Master awaits your correspondence with
          great anticipation.
        </p>
        <p>
          <strong>By Raven:</strong> P.O. Box 175, Nampa, ID, 83653
          <br />
          <br />
          <strong>By Arcane Crystal: </strong>
          <a
            href="mailto:dungeonstoyourdoor@gmail.com"
            style={{ color: "#3F6C51", textDecoration: "none" }}
          >
            Dungeonstoyourdoor@gmail.com
          </a>
        </p>
        <div className="dm-image-container">
          <div className="mobile-dice">
            <DiceMobileScene />
          </div>
        </div>
      </div>
      <div className="desktop-contact-section">
        <div className="overlay-text">
          <h1>Summon The</h1>
          <h1>Dungeon Master</h1>
          <p>
            Have questions, seeketh counsel, or wish to forge an alliance?
            Dispatch your message by trusted courier or channel it through the
            Arcane Crystal. The Dungeon Master awaits your correspondence with
            great anticipation.
          </p>
          <p>
            <strong>By Raven:</strong> P.O. Box 175, Nampa, ID, 83653
            <br />
            <br />
            <strong>By Arcane Crystal: </strong>
            <a
              href="mailto:dungeonstoyourdoor@gmail.com"
              style={{ color: "#3F6C51", textDecoration: "none" }}
            >
              Dungeonstoyourdoor@gmail.com
            </a>
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
