import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // In a real application, you would send this to an API
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({ type: 'success', text: 'تم الاشتراك بنجاح! شكراً لك.' });
      setEmail('');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.section 
      className="mb-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="bg-gradient-to-r from-purple to-primary rounded-3xl overflow-hidden shadow-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 text-center md:text-right">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">حافظ على اطلاع طفلك!</h2>
            <p className="text-white text-lg mb-4">اشترك في نشرتنا البريدية لتصلك أحدث القصص والمواضيع المناسبة لطفلك.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                className="py-3 px-4 rounded-full border-2 border-secondary focus:border-accent focus:outline-none transition flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <motion.button 
                className="bg-accent hover:bg-opacity-90 text-darkText font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الاشتراك...' : 'اشترك الآن'}
              </motion.button>
            </form>
            {message && (
              <motion.div 
                className={`mt-3 px-4 py-2 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {message.text}
              </motion.div>
            )}
          </div>
          <div className="md:w-1/3 flex justify-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut" 
              }}
            >
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="90" cy="90" r="85" fill="#FFD166" stroke="#FF6B6B" strokeWidth="10"/>
                <circle cx="60" cy="70" r="10" fill="#333"/>
                <circle cx="120" cy="70" r="10" fill="#333"/>
                <path d="M50 100C70 130 110 130 130 100" stroke="#333" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSignup;
