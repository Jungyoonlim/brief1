import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './WordPowerAnimation.css';

const WordPowerAnimation: React.FC = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setStartAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (startAnimation) {
      controls.start("visible");
    }
  }, [startAnimation, controls]);

  // Array of 40 word elements - last one says "power"
  const wordElements = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    text: i === 39 ? "power" : "word", // Last element says "power"
    opacity: 0.05 + (i * 0.024), // Very gradual opacity increase
    yOffset: i === 39 ? -350 : i * -8, // Power positioned a bit closer but still visible
    xOffset: (i % 4) * 6 - 9 + (Math.random() * 6 - 3), // More horizontal variation patterns
    delay: i * 0.15, // Regular timing
    rotation: (Math.random() - 0.5) * 6, // Subtle rotation variation
    scale: 0.98 + (Math.random() * 0.04), // Slight scale variation for organic feel
  }));

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 400, // Start from below
      x: 0,
      scale: 0.6,
      rotateX: 40,
      rotateZ: 0
    },
    visible: (i: number) => ({
      opacity: wordElements[i].opacity,
      y: wordElements[i].yOffset,
      x: wordElements[i].xOffset,
      scale: wordElements[i].scale,
      rotateX: 0,
      rotateZ: wordElements[i].rotation,
      transition: {
        delay: wordElements[i].delay,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <div className="word-power-container">
      <div className="words-stack">
        {wordElements.map((element) => (
          <motion.div
            key={element.id}
            className="word-element"
            custom={element.id}
            initial="hidden"
            animate={controls}
            variants={wordVariants}
            style={{
              zIndex: wordElements.length - element.id,
            }}
          >
            {element.text}
          </motion.div>
        ))}
      </div>

      {/* Margaret Atwood credit */}
      <motion.div
        className="author-credit"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7.5 }}
      >
        Margaret Atwood
      </motion.div>

      {/* Restart animation button */}
      <motion.button
        className="restart-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7.0 }}
        onClick={() => {
          setStartAnimation(false);
          controls.set("hidden");
          setTimeout(() => setStartAnimation(true), 100);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Replay Animation
      </motion.button>
    </div>
  );
};

export default WordPowerAnimation; 