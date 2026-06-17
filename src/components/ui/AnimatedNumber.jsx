import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedNumber = ({ value, duration = 2000, className = "" }) => {
  // Extract numerical value and suffix (like % or W)
  const isString = typeof value === 'string';
  const numMatch = isString ? value.match(/[\d.]+/) : null;
  const numValue = numMatch ? parseFloat(numMatch[0]) : (isString ? 0 : value);
  const suffix = isString ? value.replace(/[\d.]+/, '') : '';

  // Spring animation
  const springValue = useSpring(0, {
    bounce: 0,
    duration: duration,
  });

  // Start animation when component mounts
  useEffect(() => {
    springValue.set(numValue);
  }, [numValue, springValue]);

  // Format the number based on whether the original had decimals
  const isDecimal = isString && value.includes('.');
  const displayValue = useTransform(springValue, (current) => {
    if (isDecimal) {
      return current.toFixed(2) + suffix;
    }
    return Math.round(current) + suffix;
  });

  return (
    <motion.span className={className}>
      {displayValue}
    </motion.span>
  );
};

export default AnimatedNumber;
