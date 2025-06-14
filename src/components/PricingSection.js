// src/components/PricingSection.js
import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import d20Icon from "../assets/d20FillLogo.png";
import campaignImage from "../assets/whiteFlag.png";
import catBucketsImage from "../assets/catBuckets.png";
import rockHardPlaceImage from "../assets/rockHardPlace.png";

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
    title: "A Cat Named Buckets",
    players: "Maximum 8 Players",
    description: "A storm batters the Maiden’s Wail as it sails the high seas, but something more sinister than thunder stalks the decks, one of the crew has been murdered. Trapped aboard with nowhere to run, the adventurers must navigate treacherous alliances, hidden motives, and ghostly whispers in the dark to unmask the killer before the ship claims more souls.",
    deposit: "$100 Deposit",
    price: "$50 Per Player",
    backgroundImage: catBucketsImage,
  },
  {
    title: "Between A Rock And A Hard Place",
    players: "Maximum 8 Players",
    description: "In the shadowed alleys and marble halls of Stoneport, whispers of a long-lost heir ignite a quiet rebellion. The adventurers must navigate a web of political intrigue, charming nobles, rallying common folk, or striking covert deals with the city's underworld to sway the city’s power players and tip the scales toward the rightful crown... or their own ambitions.",
    deposit: "$100 Deposit",
    price: "$50 Per Player",
    backgroundImage: rockHardPlaceImage,
  },
];

function PricingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 8000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleNavClick = (index) => {
    setCurrentIndex(index);
    resetTimer();
  };

  return (
    <div className="pricing-section" id="Pricing">
      <div className="mobile-pricing-section">
        <h1>The Price of</h1>
        <h1>Adventure</h1>
        <p>
          Every quest has its cost, but glory, laughter, and unforgettable
          memories are always included. Choose from a selection of ready-to-run
          one-shots or contact the DM for custom-built adventures, each priced for epic fun and hassle-free game
          nights. Your next great story is just a roll away.
        </p>

        <div className="pricing-slideshow-container">
          {campaigns.map((camp, index) => (
            <div
              key={index}
              className={`pricing-card ${index === currentIndex ? "active" : ""
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
              onClick={() => handleNavClick(index)}
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
            memories are always included. Choose from a selection of ready-to-run
            one-shots or contact the DM for custom-built adventures, each priced for epic fun and hassle-free game
            nights. Your next great story is just a roll away.
          </p>
        </div>

        <div className="campaign-image-container">
          {campaigns.map((camp, index) => (
            <div
              key={index}
              className={`campaign-slide ${index === currentIndex ? "active" : ""
                }`}
              style={{ "--bg-image": `url(${camp.backgroundImage})` }}
            >
              <div className="campaign-background" />
              <div className="campaign-text">
                <h1>{camp.title}</h1>
                <p className="campaign-players">{camp.players}</p>
                <p className="campaign-description">{camp.description}</p>
                <h3>{camp.deposit}</h3>
                <h3>{camp.price}</h3>
              </div>
            </div>
          ))}

          <div className="image-nav">
            {campaigns.map((_, index) => (
              <img
                key={index}
                src={d20Icon}
                alt={`Go to image ${index}`}
                className={`nav-icon ${index === currentIndex ? "active" : ""}`}
                onClick={() => handleNavClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
