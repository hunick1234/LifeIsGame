import React, { useState, useEffect } from "react";
// import styles from "../../assets/css/home/marqueePanel.module.css";
import "../../assets/css/home/marqueePanel.css"

const MarqueePanel = ({ messages, speed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const marqueeContentWidth = document.querySelector(
      ".marquee-content"
    ).offsetWidth;
    const panelWidth = document.querySelector(".marquee-panel").offsetWidth;

    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition + 1;
        if (newPosition >= marqueeContentWidth + panelWidth) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
          return 0;
        }
        return newPosition;
      });
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed, messages.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  return (
    <div className="marquee-container">
      <div className="marquee-panel">
        <div
          className="marquee-content"
          style={{ transform: `translateX(-${position}px)` }}
        >
          {messages.map((message, index) => (
            <span
              key={index}
              className={index === currentIndex ? "active" : ""}
            >
              {message}
            </span>
          ))}
        </div>
      </div>
      <div className="navigation-bar">
        <button className="prev-button" onClick={handlePrev}>
          Prev
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MarqueePanel;