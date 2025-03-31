import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Story } from '@shared/schema';

const FeaturedStories: React.FC = () => {
  const [_, navigate] = useLocation();
  
  const { data: stories, isLoading, error } = useQuery<Story[]>({
    queryKey: ['/api/stories/featured'],
  });

  const handleStoryClick = (id: number) => {
    navigate(`/story/${id}`);
  };

  const handleViewAllClick = () => {
    navigate('/stories');
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
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
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-purple">القصص المميزة</h2>
          <button className="text-secondary hover:text-primary transition font-bold font-comic">عرض الكل</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md h-72 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !stories) {
    return (
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-purple">القصص المميزة</h2>
          <button className="text-secondary hover:text-primary transition font-bold font-comic">عرض الكل</button>
        </div>
        <div className="text-center text-red-500">حدث خطأ في تحميل القصص المميزة</div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-purple">القصص المميزة</h2>
        <button 
          className="text-secondary hover:text-primary transition font-bold font-comic"
          onClick={handleViewAllClick}
        >
          عرض الكل
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            className="story-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => handleStoryClick(story.id)}
          >
            <div className="relative h-48 overflow-hidden">
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
            <div className="p-4">
              <h3 className="font-heading font-bold text-xl mb-2 text-purple">{story.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{story.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">{story.readingTime} دقائق للقراءة</span>
                <motion.button 
                  className="bg-secondary hover:bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transform rotate-180">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedStories;
