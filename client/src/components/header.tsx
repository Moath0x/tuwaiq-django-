import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [_, navigate] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // In a real app, this would navigate to search results
      alert(`البحث عن: ${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="relative z-10 bg-gradient-to-l from-primary to-purple shadow-lg py-4 px-6 mb-6 rounded-b-3xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0 cursor-pointer" onClick={() => navigate('/')}>
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut" 
            }}
          >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="23" fill="#FFD166" stroke="#FF6B6B" strokeWidth="4"/>
              <circle cx="18" cy="20" r="3" fill="#333"/>
              <circle cx="32" cy="20" r="3" fill="#333"/>
              <path d="M15 30C19 36 31 36 35 30" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-white mr-3">قصص الأطفال</h1>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="ابحث عن قصة..." 
            className="w-full py-2 px-4 pr-10 rounded-full border-2 border-secondary focus:border-accent focus:outline-none transition font-body"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg 
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </form>
      </div>
    </header>
  );
};

export default Header;
