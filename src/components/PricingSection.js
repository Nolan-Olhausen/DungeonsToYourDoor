// src/components/PricingSection.js
import React, { useState, useEffect } from "react";
import "../index.css";
import d20Icon from "../assets/d20FillLogo.png";
import campaignImage from "../assets/inn.jpg";
import overlayImage from "../assets/campfire.png";

const campaigns = [
  {
    title: "The White Flag Inn",
    players: "Maximum 8 Players",
    description:
      "What begins as a quiet night at the White Flag Inn quickly turns deadly. After a brutal ambush and an unexpected divine intervention, your party is thrust into a mission through dark forests and ancient crypts to retrieve a mysterious artifact. Will you survive what lies beneath?",
    deposit: "$100 Deposit",
    price: "$50 Per Player",
    backgroundImage: campaignImage,
  },
  {
    title: "Forest of Whispers",
    players: "Maximum 8 Players",
    description: "Uncover secrets hidden in the whispering woods...",
    deposit: "$100 Deposit",
    price: "$50 Per Player",
    backgroundImage: campaignImage,
  },
  {
    title: "Siege of Blackspire",
    players: "Maximum 8 Players",
    description: "Defend a stronghold in a high-stakes siege scenario...",
    deposit: "$100 Deposit",
    price: "$50 Per Player",
    backgroundImage: campaignImage,
  },
];

function PricingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pricing-section" id="Pricing">
      <div className="mobile-pricing-section">
        <h1>The Price of</h1>
        <h1>Adventure</h1>
        <p>
          Every quest has its cost, but glory, laughter, and unforgettable
          memories are always included. Choose from a selection of ready-to-run
          one-shot adventures, each priced for epic fun and hassle-free game
          nights. Your next great story is just a roll away.
        </p>

        <div className="pricing-slideshow-container">
          {campaigns.map((camp, index) => (
            <div
              key={index}
              className={`pricing-card ${
                index === currentIndex ? "active" : ""
              }`}
              style={{
                "--bg-image": `url(${camp.backgroundImage})`,
              }}
            >
              <div className="card-top">
                <h2>{camp.title}</h2>
                <p className="campaign-players">{camp.players}</p>
              </div>

              <div className="card-description">
                <p className="campaign-description">{camp.description}</p>
              </div>

              <div className="card-bottom">
                <h3>{camp.deposit}</h3>
                <h3>{camp.price}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="pricing-nav">
          {campaigns.map((_, index) => (
            <img
              key={index}
              src={d20Icon}
              alt={`Go to card ${index}`}
              className={`nav-icon ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="desktop-pricing-section">
        <div className="overlay-text">
          <h1>The Price of</h1>
          <h1>Adventure</h1>
          <p>
            Every quest has its cost, but glory, laughter, and unforgettable
            memories are always included. Choose from a selection of
            ready-to-run one-shot adventures, each priced for epic fun and
            hassle-free game nights. Your next great story is just a roll away.
          </p>
        </div>

        <div className="dm-image-container">
          <img
            src={overlayImage}
            alt="Adventure Awaits"
            className="overlay-background"
          />
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
