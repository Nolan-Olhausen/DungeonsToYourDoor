// src/components/AdventuresSection.js
import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import orcImage from "../assets/orcExcursion.png";
import cityBattle from "../assets/cityBattle.png";
import campfire from "../assets/campfire.png";
import d20Icon from "../assets/d20FillLogo.png";

function AdventuresSection() {
  const [activeSet, setActiveSet] = useState("gallery");
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const galleryImages = [orcImage, cityBattle, campfire];
  const testimonialImages = [orcImage, cityBattle, orcImage, campfire];
  const images = activeSet === "gallery" ? galleryImages : testimonialImages;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [images]);

  const handleNavClick = (index) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const handleSetChange = (setName) => {
    setActiveSet(setName);
    setCurrentIndex(0);
    resetTimer();
  };

  return (
    <div className="adventures-section" id="Adventures">
      <div className="mobile-adventures-section">
        {activeSet === "gallery" ? (
          <>
            <h1>The Adventures</h1>
            <h1>In Action</h1>
            <p>
              Where heroes rose to the challenge, epic battles were fought, and
              unforgettable stories were made. Browse through our gallery to get
              a glimpse of the action and excitement that await in your next
              adventure!
            </p>
          </>
        ) : (
          <>
            <h1>Folk Tales</h1>
            <p>
              Real adventurers, real stories. Read what past players have to say
              about their epic quests, unforgettable characters, and the
              adventures that brought them together. Ready to create your own
              story?
            </p>
          </>
        )}

        <div className="slideshow-container">
          <div className="slideshow-wrapper">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Adventure ${index}`}
                className={`slideshow-image ${
                  index === currentIndex ? "active" : ""
                }`}
              />
            ))}
          </div>

          <div className="image-nav">
            {images.map((_, index) => (
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

        <div className="slideshow-controls">
          <button
            className={activeSet === "gallery" ? "active" : ""}
            onClick={() => handleSetChange("gallery")}
          >
            <img src={d20Icon} alt="D20 Icon" />
            Gallery
          </button>
          {/* <button
            className={activeSet === "testimonials" ? "active" : ""}
            onClick={() => handleSetChange("testimonials")}
          >
            <img src={d20Icon} alt="D20 Icon" />
            Testimonials
          </button> */}
        </div>
      </div>

      <div className="desktop-adventures-section">
        <div className="adventure-text-container">
          <div className="overlay-text">
            {activeSet === "gallery" ? (
              <>
                <h1>The Adventures</h1>
                <h1>In Action</h1>
                <p>
                  Where heroes rose to the challenge, epic battles were fought,
                  and unforgettable stories were made. Browse through our
                  gallery to get a glimpse of the action and excitement that
                  await in your next adventure!
                </p>
              </>
            ) : (
              <>
                <h1>Folk Tales</h1>
                <p>
                  Real adventurers, real stories. Read what past players have to
                  say about their epic quests, unforgettable characters, and the
                  adventures that brought them together. Ready to create your
                  own story?
                </p>
              </>
            )}
          </div>

          <div className="slideshow-controls">
            <button
              className={activeSet === "gallery" ? "active" : ""}
              onClick={() => handleSetChange("gallery")}
            >
              <img src={d20Icon} alt="D20 Icon" />
              Gallery
            </button>
            {/* <button
              className={`${
                activeSet === "testimonials" ? "active" : ""
              } right`}
              onClick={() => handleSetChange("testimonials")}
            >
              <img src={d20Icon} alt="D20 Icon" />
              Testimonials
            </button> */}
          </div>
        </div>

        <div className="home-image-container">
          <div className="home-image-container-back"></div>
          <div className="slideshow-wrapper">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Adventure ${index}`}
                className={`slideshow-image ${
                  index === currentIndex ? "active" : ""
                }`}
              />
            ))}
          </div>

          <div className="image-nav">
            {images.map((_, index) => (
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

export default AdventuresSection;
