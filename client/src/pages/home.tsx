import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/header';
import HeroSection from '../components/hero-section';
import CategorySelector from '../components/category-selector';
import FeaturedStories from '../components/featured-stories';
import NewestStories from '../components/newest-stories';
import PopularThemes from '../components/popular-themes';
import NewsletterSignup from '../components/newsletter-signup';
import Footer from '../components/footer';
import { CloudDecoration } from '../components/ui/cloud-decoration';

const Home: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background font-body text-darkText" dir="rtl">
      {/* Background decoration elements */}
      <CloudDecoration position="left" top={20} color="#4ECDC4" size="medium" opacity={0.3} />
      <CloudDecoration position="right" top={60} color="#FF6B6B" size="large" opacity={0.2} />
      
      <Header />
      
      <main className="container mx-auto px-4 pb-12 relative z-10">
        <HeroSection />
        <CategorySelector />
        <FeaturedStories />
        <NewestStories />
        <PopularThemes />
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
