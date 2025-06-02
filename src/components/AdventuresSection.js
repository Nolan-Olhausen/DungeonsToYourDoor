// src/components/AdventuresSection.js
import React, { useState, useEffect } from "react";
import "../index.css";
import testImage from "../assets/campfire.png";
import testImage2 from "../assets/dndTestOverlay.jpg";
import d20Icon from "../assets/d20FillLogo.png";

function AdventuresSection() {
  const [activeSet, setActiveSet] = useState("gallery");
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [testImage, testImage2, testImage];

  const testimonialImages = [testImage2, testImage, testImage2, testImage];

  const images = activeSet === "gallery" ? galleryImages : testimonialImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images]);

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

          <div className="image-nav">
            {images.map((_, index) => (
              <img
                key={index}
                src={d20Icon}
                alt={`Go to image ${index}`}
                className={`nav-icon ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="slideshow-controls">
          <button
            className={activeSet === "gallery" ? "active" : ""}
            onClick={() => {
              setActiveSet("gallery");
              setCurrentIndex(0);
            }}
          >
            <img src={d20Icon} alt="D20 Icon" />
            Gallery
          </button>
          <button
            className={activeSet === "testimonials" ? "active" : ""}
            onClick={() => {
              setActiveSet("testimonials");
              setCurrentIndex(0);
            }}
          >
            <img src={d20Icon} alt="D20 Icon" />
            Testimonials
          </button>
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
              onClick={() => {
                setActiveSet("gallery");
                setCurrentIndex(0);
              }}
            >
              <img src={d20Icon} alt="D20 Icon" />
              Gallery
            </button>
            <button
              className={`${
                activeSet === "testimonials" ? "active" : ""
              } right`}
              onClick={() => {
                setActiveSet("testimonials");
                setCurrentIndex(0);
              }}
            >
              <img src={d20Icon} alt="D20 Icon" />
              Testimonials
            </button>
          </div>
        </div>

        <div className="home-image-container">
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

          <div className="image-nav">
            {images.map((_, index) => (
              <img
                key={index}
                src={d20Icon}
                alt={`Go to image ${index}`}
                className={`nav-icon ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdventuresSection;
