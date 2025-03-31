import React from 'react';
import { motion } from 'framer-motion';

interface CloudProps {
  position: 'left' | 'right';
  top?: number;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  opacity?: number;
}

export const CloudDecoration: React.FC<CloudProps> = ({
  position,
  top = 20,
  color = '#4ECDC4',
  size = 'medium',
  opacity = 0.3
}) => {
  let width: number;
  let height: number;
  let duration: number;
  
  switch (size) {
    case 'small':
      width = 80;
      height = 40;
      duration = 90;
      break;
    case 'large':
      width = 140;
      height = 70;
      duration = 70;
      break;
    case 'medium':
    default:
      width = 120;
      height = 60;
      duration = 80;
      break;
  }
  
  const cloudPath = "M10 40 Q15 20 40 30 Q60 5 80 30 Q100 20 110 40 Q120 60 90 50 Q80 70 50 50 Q20 70 10 40 Z";
  const largePath = "M10 40 Q25 10 50 30 Q70 5 90 30 Q120 10 130 40 Q140 70 100 50 Q80 80 50 50 Q20 80 10 40 Z";
  
  return (
    <motion.div
      className={`fixed top-${top} ${position === 'left' ? '-left-20' : '-right-20'} z-0`}
      initial={{ x: position === 'left' ? -100 : 100 }}
      animate={{ 
        x: position === 'left' 
          ? [0, window.innerWidth + 100] 
          : [0, -(window.innerWidth + 100)]
      }}
      transition={{
        repeat: Infinity,
        duration: duration,
        ease: "linear",
        repeatType: "loop",
      }}
      style={{ opacity }}
    >
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={size === 'large' ? largePath : cloudPath} fill={color} />
      </svg>
    </motion.div>
  );
};
