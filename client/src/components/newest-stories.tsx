import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Story } from '@shared/schema';
import { StarRating } from './ui/star-rating';

const NewestStories: React.FC = () => {
  const [_, navigate] = useLocation();
  
  const { data: stories, isLoading, error } = useQuery<Story[]>({
    queryKey: ['/api/stories/recent/4'],
  });

  const handleStoryClick = (id: number) => {
    navigate(`/story/${id}`);
  };

  const handleViewAllClick = () => {
    navigate('/stories');
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: { 
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-purple">أحدث القصص</h2>
          <button className="text-secondary hover:text-primary transition font-bold font-comic">عرض الكل</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md h-64 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !stories) {
    return (
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-purple">أحدث القصص</h2>
          <button className="text-secondary hover:text-primary transition font-bold font-comic">عرض الكل</button>
        </div>
        <div className="text-center text-red-500">حدث خطأ في تحميل أحدث القصص</div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-purple">أحدث القصص</h2>
        <button 
          className="text-secondary hover:text-primary transition font-bold font-comic"
          onClick={handleViewAllClick}
        >
          عرض الكل
        </button>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stories.map((story) => (
          <motion.div
            key={story.id}
            className="story-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
            onClick={() => handleStoryClick(story.id)}
          >
            <div className="relative h-40 overflow-hidden">
              <motion.img 
                src={story.imageUrl} 
                alt={story.title} 
                className="w-full h-full object-cover story-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div 
                className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold"
                style={{ 
                  backgroundColor: 
                    story.ageGroup === "3-5" ? "#FF6B6B" : 
                    story.ageGroup === "6-8" ? "#4ECDC4" : 
                    story.ageGroup === "9-11" ? "#FFD166" : "#6A0572",
                  color: story.ageGroup === "9-11" ? "#333333" : "#FFFFFF"
                }}
              >
                {story.ageGroup} سنوات
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-heading font-bold text-lg mb-1 text-purple">{story.title}</h3>
              <p className="text-gray-600 text-xs mb-2">{story.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary text-sm font-bold">{story.readingTime} دقائق</span>
                <StarRating rating={story.rating} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default NewestStories;
