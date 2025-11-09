// src/pages/Hero.js or src/components/Hero.js (adjust path as needed)

import { assets } from '../assets/assets';
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Hero = () => {
  const { navigate } = useContext(ShopContext);

  const handleShopNow = () => {
    
    navigate("/collection"); // Redirects to /collection when clicked
  };
  return (
    <section className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.hero_img})` }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative z-10 flex items-end h-full p-4 sm:p-6 text-white animate-fadeIn">
        <div className="w-full text-center pb-6 sm:pb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold prata-regular leading-tight">
            Discover the Latest Trends
          </h1>
          <p className="text-sm sm:text-lg md:text-xl mt-2 sm:mt-4">
            Shop now for exclusive offers and unbeatable style.
          </p>
          <button
          onClick={handleShopNow}
          className="mt-4 sm:mt-6 px-6 py-2 sm:px-8 sm:py-3 bg-accent text-white rounded-full hover:bg-primary transition-colors duration-300"
        >
          Shop Now
        </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;