import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { AgeGroup } from '@shared/schema';

const CategorySelector: React.FC = () => {
  const [_, navigate] = useLocation();
  
  const { data: ageGroups, isLoading, error } = useQuery<AgeGroup[]>({
    queryKey: ['/api/age-groups'],
  });

  if (isLoading) {
    return (
      <section className="mb-12">
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-purple text-center">اختر فئة عمرية</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="category bg-white rounded-2xl shadow-md h-32 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !ageGroups) {
    return (
      <section className="mb-12">
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-purple text-center">اختر فئة عمرية</h2>
        <div className="text-center text-red-500">حدث خطأ في تحميل الفئات العمرية</div>
      </section>
    );
  }

  // Default categories if API fails
  const defaultCategories = [
    { id: 1, name: "الصغار", range: "3-5", color: "#FF6B6B" },
    { id: 2, name: "المبتدئين", range: "6-8", color: "#4ECDC4" },
    { id: 3, name: "المتوسطين", range: "9-11", color: "#FFD166" },
    { id: 4, name: "المتقدمين", range: "12+", color: "#6A0572" },
  ];

  const categories = ageGroups.length > 0 ? ageGroups : defaultCategories;

  const handleCategoryClick = (range: string) => {
    navigate(`/stories/age/${range}`);
  };

  return (
    <section className="mb-12">
      <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-purple text-center">اختر فئة عمرية</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="category bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition"
            whileHover={{ y: -5 }}
            onClick={() => handleCategoryClick(category.range)}
          >
            <div className="p-4 text-center" style={{ background: category.color }}>
              <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-2xl" style={{ color: category.color }}>{category.range}</span>
              </div>
              <h3 className="font-heading font-bold text-white">{category.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySelector;
