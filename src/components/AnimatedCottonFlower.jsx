// src/components/AnimatedCottonFlower.jsx
import React, { useRef, useEffect } from 'react';
import cottonFlowerImg from '../img/4.png'; // Adjust path as needed

const AnimatedCottonFlower = ({
    className = '',
    imgClassName = '',
    activeSection,
    ...props
}) => {
    const containerRef = useRef(null);
    const flowerRef = useRef(null);
    const root = useRef(null);

    useEffect(() => {
        if (activeSection) {
            console.log(`AnimatedCottonFlower: Section "${activeSection}" is in focus.`);
        }
    }, [activeSection]);

    return (
        <div ref={root} className={`w-[28rem] h-auto ${className}`} {...props}>
            <div ref={containerRef} className="h-auto">
                <img
                    ref={flowerRef}
                    src={cottonFlowerImg}
                    alt="Cotton Flower"
                    className={`w-full h-auto origin-center ${imgClassName}`}
                />
            </div>
        </div>
    );
};

export default AnimatedCottonFlower;