// src/components/DMSection.js
import React from "react";
import "../index.css";
import dmImage from "../assets/dmImage.png"; // Replace with actual image path

function DMSection() {
  return (
    <div className="dm-section" id="The DM">
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
      <img src={dmImage} alt="Tyler" className="dm-image" />
    </div>
  );
}

export default DMSection;
