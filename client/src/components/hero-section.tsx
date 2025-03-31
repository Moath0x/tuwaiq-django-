import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

const HeroSection: React.FC = () => {
  const [_, navigate] = useLocation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="mb-12 relative">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-gradient-to-r from-secondary to-purple rounded-3xl overflow-hidden shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
          <motion.div variants={itemVariants} className="md:w-1/2 mb-8 md:mb-0 text-center md:text-right">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">أهلاً بك في عالم الخيال!</h2>
            <p className="text-white text-lg md:text-xl mb-6">اكتشف أجمل قصص الأطفال المليئة بالمتعة والمغامرات والدروس المفيدة.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent hover:bg-opacity-90 text-darkText font-bold py-3 px-8 rounded-full shadow-lg transform transition font-comic text-lg"
              onClick={() => navigate('/stories')}
            >
              ابدأ القراءة الآن
            </motion.button>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2 flex justify-center"
          >
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut" 
              }}
              src="https://images.unsplash.com/photo-1511108690759-009324a90311?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="أطفال يقرأون" 
              className="rounded-2xl shadow-lg max-w-full h-auto" 
              width="450" 
              height="300" 
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Decoration elements */}
      <motion.div 
        className="absolute -top-10 -left-5 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 30,
          ease: "linear" 
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30L40 0Z" fill="#FFD166" fillOpacity="0.7"/>
        </svg>
      </motion.div>
      <motion.div 
        className="absolute -bottom-8 -right-4 hidden md:block"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ 
          repeat: Infinity, 
          duration: 5,
          ease: "easeInOut" 
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="30" fill="#4ECDC4" fillOpacity="0.6"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
