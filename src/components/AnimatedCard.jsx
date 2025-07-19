import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0, 
  hoverScale = 1.025,
  duration = 0.6,
  ...props 
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: hoverScale,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 