import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  className = ''
}) => {
  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <span 
          key={index} 
          className={index < rating ? "text-accent" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};
