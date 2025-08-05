"use client"
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CategoryCardProps {
  icon?: React.ReactNode;
  category?: string;
  count: number;
  total?: number;
  color?: string;
  bg_color?: string; // Make bg_color optional with a fallback
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, category, count, total = 0, color, bg_color}) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;


  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-md px-6  py-2 gap-x-5 max-lg:max-w-[280px] ">
      <div className="flex flex-col items-center justify-start">
        <div className={`flex items-center justify-center w-12 h-12 ${bg_color} rounded-full mb-2`}>
          {icon}
        </div>
        <div className="text-center text-gray-600 font-semibold">
          <p>TOTAL</p>{category}
        </div>
      </div>
      <div className="w-[85px] h-[85px] mb-2">
        <CircularProgressbar
          value={percentage}
          text={`${count}/${total}`}
          styles={buildStyles({
            textColor: '#000',
            pathColor: color,
            trailColor: '#d6d6d6',
          })}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
