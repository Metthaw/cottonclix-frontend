// src/components/AnimatedCottonFlower.jsx
import React from "react";
import cottonFlowerImg from "../img/4.png"; // Adjust path as needed

const AnimatedCottonFlower = ({
  className = "",
  imgClassName = "",
  ...props
}) => {
  return (
    <div
      // className={`relative w-[12rem] md:w-[16rem] lg:w-[24rem] xl:w-[28rem] h-auto ${className}`}
      className={`relative w-full h-auto ${className}`}
      {...props}
    >
      <img
        src={cottonFlowerImg}
        alt="Cotton Flower"
        className={`w-full h-auto ${imgClassName}`}
        style={{ willChange: "transform" }} // It's good to keep will-change
      />
    </div>
  );
};

export default AnimatedCottonFlower;
