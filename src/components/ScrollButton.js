import React from "react";
import "../index.css";

function ScrollButton({ isLastSection, onClick, label }) {
  return (
    <div className="scroll-button-container">
      <button className="scroll-button" onClick={onClick}>
        <span className="scroll-label">
          <span className="scroll-line">{label.line1}</span>
          {label.line2 && (
            <span className="scroll-line second-line">{label.line2}</span>
          )}
        </span>
        <span className={`${isLastSection ? "chevronUp" : "chevronDown"}`}></span>
      </button>
    </div>
  );
}

export default ScrollButton;
