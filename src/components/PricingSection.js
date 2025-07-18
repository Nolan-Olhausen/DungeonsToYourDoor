// src/components/PricingSection.js
import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import d20Icon from "../assets/d20FillLogo.png";
import campaignImage from "../assets/whiteFlag.png";
import catBucketsImage from "../assets/catBuckets.png";
import rockHardPlaceImage from "../assets/rockHardPlace.png";
import print1 from "../assets/print1.jpg";
import print2 from "../assets/print2.jpg";
import print3 from "../assets/print3.jpg";
import print4 from "../assets/print4.jpg";
import print5 from "../assets/print5.jpg";
import print6 from "../assets/print6.jpg";
import print7 from "../assets/print7.jpg";

const campaigns = [
  {
    title: "The White Flag Inn",
    players: "Maximum 8 Players",
    description:
      "What begins as a quiet night at the White Flag Inn quickly turns deadly. After a brutal ambush and an unexpected divine intervention, your party is thrust into a mission through dark forests and ancient crypts to retrieve a mysterious artifact. Will you survive what lies beneath?",
    backgroundImage: campaignImage,
  },
  {
    title: "A Cat Named Buckets",
    players: "Maximum 8 Players",
    description:
      "A storm batters the Maiden’s Wail as it sails the high seas, but something more sinister than thunder stalks the decks, one of the crew has been murdered. Trapped aboard with nowhere to run, the adventurers must navigate treacherous alliances, hidden motives, and ghostly whispers in the dark to unmask the killer before the ship claims more souls.",
    backgroundImage: catBucketsImage,
  },
  {
    title: "Between A Rock And A Hard Place",
    players: "Maximum 8 Players",
    description:
      "In the shadowed alleys and marble halls of Stoneport, whispers of a long-lost heir ignite a quiet rebellion. The adventurers must navigate a web of political intrigue, charming nobles, rallying common folk, or striking covert deals with the city's underworld to sway the city’s power players and tip the scales toward the rightful crown... or their own ambitions.",
    backgroundImage: rockHardPlaceImage,
  },
];

const prints = [
  {
    backgroundImage: print1,
  },
  {
    backgroundImage: print2,
  },
  {
    backgroundImage: print3,
  },
  {
    backgroundImage: print4,
  },
  {
    backgroundImage: print5,
  },
  {
    backgroundImage: print6,
  },
  {
    backgroundImage: print7,
  },
];

function PricingSection() {
  const [activeSet, setActiveSet] = useState("5e");
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const activeData = activeSet === "5e" ? campaigns : prints;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeData.length);
    }, 8000);
  };

  useEffect(() => {
    setCurrentIndex(0);
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [activeSet]);

  const handleNavClick = (index) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const handleSetChange = (setName) => {
    setActiveSet(setName);
    setCurrentIndex(0);
    resetTimer();
  };

  const renderHeaderText = () => {
    if (activeSet === "5e") {
      return (
        <>
          <h1>The Price of</h1>
          <h1>Adventure</h1>
          <p>
            Every quest has its cost, but glory, laughter, and unforgettable
            memories are always included. Choose from a selection of
            ready-to-run one-shots or contact the DM for custom-built
            adventures. Your next great story is just a roll away.
            <br />
            <br />
            $100 Deposit
            <br />
            $50 Per Player
          </p>
        </>
      );
    } else {
      return (
        <>
          <h1>The Price of</h1>
          <h1>Creation</h1>
          <p>
            Looking to bring your digital models to life? I offer high-quality
            3D printing services tailored to tabletop gamers, hobbyists, and
            creatives alike. Whether you have your own STL files or want to
            choose from a growing library of ready-to-print models I own, I've
            got you covered. Optional custom painting for a professional,
            finished look (additional charge). Costs vary depending on the
            model's size, detail, and print time. For a personalized quote,
            please reach out directly with your file or idea, I'm happy to work
            with you to make your vision a reality.
          </p>
        </>
      );
    }
  };

  return (
    <div className="pricing-section" id="Pricing">
      <div className="mobile-pricing-section">
        {renderHeaderText()}

        <div className="pricing-slideshow-container">
          {activeData.map((item, index) => (
            <div
              key={index}
              className={`pricing-card ${
                index === currentIndex ? "active" : ""
              }`}
              style={{ "--bg-image": `url(${item.backgroundImage})` }}
            >
              {activeSet === "5e" && (
                <>
                  <div className="card-top">
                    <h2>{item.title}</h2>
                    <p className="campaign-players">{item.players}</p>
                  </div>
                  <div className="card-description">
                    <p className="campaign-description">{item.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="pricing-nav">
          {activeData.map((_, index) => (
            <img
              key={index}
              src={d20Icon}
              alt={`Go to card ${index}`}
              className={`nav-icon ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleNavClick(index)}
            />
          ))}
        </div>
        <div className="slideshow-controls">
          <button
            className={activeSet === "5e" ? "active" : ""}
            onClick={() => handleSetChange("5e")}
          >
            <img src={d20Icon} alt="5e Events Icon" />
            5e Events
          </button>
          <button
            className={activeSet === "prints" ? "active" : ""}
            onClick={() => handleSetChange("prints")}
          >
            <img src={d20Icon} alt="3D Prints Icon" />
            3D Prints
          </button>
        </div>
      </div>
      <div className="desktop-pricing-section">
        <div className="pricing-text-container">
          <div className="overlay-text">{renderHeaderText()}</div>
          <div className="slideshow-controls">
            <button
              className={activeSet === "5e" ? "active" : ""}
              onClick={() => handleSetChange("5e")}
            >
              <img src={d20Icon} alt="5e Events Icon" />
              5e Events
            </button>
            <button
              className={activeSet === "prints" ? "active" : ""}
              onClick={() => handleSetChange("prints")}
            >
              <img src={d20Icon} alt="3D Prints Icon" />
              3D Prints
            </button>
          </div>
        </div>

        <div className="campaign-image-container">
          {activeData.map((item, index) => (
            <div
              key={index}
              className={`campaign-slide ${
                index === currentIndex ? "active" : ""
              }`}
              style={{ "--bg-image": `url(${item.backgroundImage})` }}
            >
              <div className="campaign-background" />
              {activeSet === "5e" && (
                <div className="campaign-text">
                  <h1>{item.title}</h1>
                  <p className="campaign-players">{item.players}</p>
                  <p className="campaign-description">{item.description}</p>
                </div>
              )}
            </div>
          ))}

          <div className="image-nav">
            {activeData.map((_, index) => (
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
