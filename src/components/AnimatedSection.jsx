import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up",
  duration = 0.8,
  ...props 
}) => {
  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: -50 };
      case "right":
        return { opacity: 0, x: 50 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const getAnimateState = () => {
    switch (direction) {
      case "up":
        return { opacity: 1, y: 0 };
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
        return { opacity: 1, x: 0 };
      case "right":
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialState()}
      whileInView={getAnimateState()}
      transition={{ duration, delay }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 