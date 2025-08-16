// src/components/AnimatedCottonFlower.jsx
import React from "react";
import cottonFlowerImg from "../img/4.png"; // Adjust path as needed

const AnimatedCottonFlower = ({ imgClassName = "" }) => {
  return (
    <img
      src={cottonFlowerImg}
      alt="Cotton Flower"
      className={`w-full h-auto object-contain ${imgClassName}`}
      style={{ willChange: "transform" }} // It's good to keep will-change
    />
  );
};

export default AnimatedCottonFlower;
