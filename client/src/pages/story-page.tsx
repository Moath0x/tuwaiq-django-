import React, { useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Story } from '@shared/schema';
import Header from '../components/header';
import Footer from '../components/footer';
import { StarRating } from '../components/ui/star-rating';
import { CloudDecoration } from '../components/ui/cloud-decoration';

const StoryPage: React.FC = () => {
  const { id } = useParams();
  const [_, navigate] = useLocation();
  
  const { data: story, isLoading, error } = useQuery<Story>({
    queryKey: [`/api/stories/${id}`],
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  // Image animation variants
  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-body text-darkText" dir="rtl">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10 mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-background font-body text-darkText" dir="rtl">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-10 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">حدث خطأ في تحميل القصة</h2>
            <p className="mb-6">عذراً، لم نتمكن من تحميل القصة المطلوبة.</p>
            <button 
              onClick={handleBackClick}
              className="bg-secondary hover:bg-primary text-white font-bold py-2 px-6 rounded-full transition"
            >
              العودة للرئيسية
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body text-darkText" dir="rtl">
      {/* Background decoration elements */}
      <CloudDecoration position="left" top={120} color="#4ECDC4" size="medium" opacity={0.2} />
      <CloudDecoration position="right" top={250} color="#FF6B6B" size="small" opacity={0.15} />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-between items-center">
            <motion.h1 
              className="font-heading font-bold text-2xl md:text-3xl text-purple"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {story.title}
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary hover:bg-primary text-white rounded-full p-2"
              onClick={handleBackClick}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <motion.div 
              className="md:w-1/3"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <img 
                src={story.imageUrl} 
                alt={story.title} 
                className="w-full h-auto rounded-xl shadow-md" 
              />
              
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">الفئة العمرية:</span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{ 
                      backgroundColor: 
                        story.ageGroup === "3-5" ? "#FF6B6B" : 
                        story.ageGroup === "6-8" ? "#4ECDC4" : 
                        story.ageGroup === "9-11" ? "#FFD166" : "#6A0572",
                      color: story.ageGroup === "9-11" ? "#333333" : "#FFFFFF"
                    }}
                  >
                    {story.ageGroup} سنوات
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">وقت القراءة:</span>
                  <span className="text-primary font-bold">{story.readingTime} دقيقة</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">التقييم:</span>
                  <StarRating rating={story.rating} />
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">الموضوع:</span>
                  <span className="text-purple font-bold">{story.theme}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-2/3 story-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <div 
                className="prose prose-lg max-w-none rtl"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />
            </motion.div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="font-heading font-bold text-xl text-purple mb-4">قصص مشابهة قد تعجبك</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Placeholder for related stories - In a real app, this would be populated with other stories */}
              <div className="bg-gray-50 rounded-lg h-24 p-4 flex items-center justify-center text-gray-400">
                جاري تحميل القصص المشابهة...
              </div>
              <div className="bg-gray-50 rounded-lg h-24 p-4 flex items-center justify-center text-gray-400">
                جاري تحميل القصص المشابهة...
              </div>
              <div className="bg-gray-50 rounded-lg h-24 p-4 flex items-center justify-center text-gray-400">
                جاري تحميل القصص المشابهة...
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StoryPage;
