// src/components/Title.js
import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3 mb-4 animate-fadeIn">
      <p className="text-gray-500 text-xl sm:text-2xl font-medium prata-regular">
        {text1} <span className="text-primary font-bold">{text2}</span>
      </p>
      <div className="w-8 sm:w-12 h-[2px] bg-primary"></div>
    </div>
  );
};

export default Title;