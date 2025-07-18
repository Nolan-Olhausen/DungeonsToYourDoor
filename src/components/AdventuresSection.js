// src/components/AdventuresSection.js
import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import event1 from "../assets/event1.png";
import event2 from "../assets/event2.png";
import event3 from "../assets/event3.jpg";
import print2 from "../assets/print2.jpg";
import print5 from "../assets/print5.jpg";
import print7 from "../assets/print7.jpg";
import d20Icon from "../assets/d20FillLogo.png";

function AdventuresSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const images = [event3, print7, event2, event1, print2, print5];

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
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

  const openInstagram = () => {
    window.open("https://www.instagram.com/dungeonstoyourdoor", "_blank");
  };

  return (
    <div className="adventures-section" id="Adventures">
      <div className="mobile-adventures-section">
        <h1>The Adventures</h1>
        <h1>In Action</h1>
        <p>
          Where heroes rose to the challenge, epic battles were fought, and
          unforgettable stories were made. Browse through our gallery to get
          a glimpse of the action and excitement that await in your next
          adventure!
        </p>

        <div className="slideshow-container">
          <div className="slideshow-wrapper">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Adventure ${index}`}
                className={`slideshow-image ${index === currentIndex ? "active" : ""}`}
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
          <button className="active">
            <img src={d20Icon} alt="D20 Icon" />
            Gallery
          </button>
          <button onClick={openInstagram}>
            <img src={d20Icon} alt="Instagram Icon" />
            View Instagram
          </button>
        </div>
      </div>

      <div className="desktop-adventures-section">
        <div className="adventure-text-container">
          <div className="overlay-text">
            <h1>The Adventures</h1>
            <h1>In Action</h1>
            <p>
              Where heroes rose to the challenge, epic battles were fought,
              and unforgettable stories were made. Browse through our gallery
              to get a glimpse of the action and excitement that await in your
              next adventure!
            </p>
          </div>

          <div className="slideshow-controls">
            <button className="active">
              <img src={d20Icon} alt="D20 Icon" />
              Gallery
            </button>
            <button onClick={openInstagram}>
              <img src={d20Icon} alt="Instagram Icon" />
              View Instagram
            </button>
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
                className={`slideshow-image ${index === currentIndex ? "active" : ""}`}
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

