import React, { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

const ScrambledText = ({ text, duration = 800, delay = 0, className = "" }) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' ')); // Start blank or scrambled
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeout;
    let interval;

    const startAnimation = () => {
      setIsAnimating(true);
      let iteration = 0;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              // Don't scramble spaces
              if (letter === ' ') return ' ';
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('');
        });

        // Speed depends on text length and duration
        const maxIterations = text.length;
        iteration += maxIterations / (duration / 30); // 30ms interval

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsAnimating(false);
        }
      }, 30);
    };

    timeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, duration, delay]);

  return (
    <span className={`${className} ${isAnimating ? 'opacity-80' : 'opacity-100'}`}>
      {displayText}
    </span>
  );
};

export default ScrambledText;
