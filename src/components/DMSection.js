// src/components/DMSection.js
import React from "react";
import "../index.css";
import dmImage from "../assets/tylerCut.png"; // Replace with actual image path

function DMSection() {
  return (
    <div className="dm-section" id="The DM">
      <div className="mobile-dm-section">
        <h1>Meet Tyler</h1>
        <h2>Your Personal Dungeon Master</h2>
        <p>
          I'm Tyler, a traveling DM bringing ready-to-play one-shot adventures
          straight to your door. With immersive stories, full props, and a cast of
          voices for every creature and character, I turn game night into an epic
          experience. <br />
          <br />
          Just gather your party, I’ll handle the rest.
        </p>
        <div className="dm-image-container">
          <img src={dmImage} alt="Tyler" className="dm-image" />
        </div>
      </div>
      <div className="desktop-dm-section">
        <div className="overlay-text">
          <h1>Meet Tyler</h1>
          <h2>Your Personal Dungeon Master</h2>
          <p>
            I'm Tyler, a traveling DM bringing ready-to-play one-shot adventures
            straight to your door. With immersive stories, full props, and a cast of
            voices for every creature and character, I turn game night into an epic
            experience. <br />
            <br />
            Just gather your party, I’ll handle the rest.
          </p>
        </div>

        <div className="dm-image-container">
          <img src={dmImage} alt="Tyler" className="dm-image" />
        </div>
      </div>
    </div>
  );
}

export default DMSection;
