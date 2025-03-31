import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Theme } from '@shared/schema';

const PopularThemes: React.FC = () => {
  const [_, navigate] = useLocation();
  
  const { data: themes, isLoading, error } = useQuery<Theme[]>({
    queryKey: ['/api/themes'],
  });

  const handleThemeClick = (theme: string) => {
    navigate(`/stories/theme/${theme}`);
  };

  // Container and item animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: { 
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  if (isLoading) {
    return (
      <section className="mb-12">
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-purple text-center">مواضيع شائعة</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md h-32 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !themes) {
    return (
      <section className="mb-12">
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-purple text-center">مواضيع شائعة</h2>
        <div className="text-center text-red-500">حدث خطأ في تحميل المواضيع</div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-purple text-center">مواضيع شائعة</h2>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition text-center p-4"
            variants={itemVariants}
            whileHover="hover"
            onClick={() => handleThemeClick(theme.name)}
          >
            <div 
              className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: `${theme.color}10` }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke={theme.color}
                dangerouslySetInnerHTML={{ __html: theme.icon }}
              />
            </div>
            <h3 className="font-heading font-bold text-lg text-purple">{theme.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PopularThemes;
