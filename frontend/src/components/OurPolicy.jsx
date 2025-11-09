import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <section className="flex flex-col sm:flex-row justify-around gap-8 sm:gap-4 text-center py-16 sm:py-20 bg-white">
      <div className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn">
        <img src={assets.exchange_icon} className="w-12 mb-5" alt="Exchange icon" />
        <p className="font-semibold text-gray-800">Easy Exchange Policy</p>
        <p className="text-gray-500 text-sm mt-1">We offer hassle-free exchange</p> {/* Fixed typo: hasel -> hassle */}
      </div>
      <div className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn delay-100">
        <img src={assets.quality_icon} className="w-12 mb-5" alt="Quality icon" />
        <p className="font-semibold text-gray-800">7 Days Return Policy</p> {/* Clarified to match description */}
        <p className="text-gray-500 text-sm mt-1">We provide 7 days free return policy</p>
      </div>
      <div className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn delay-200">
        <img src={assets.support_img} className="w-12 mb-5" alt="Support icon" />
        <p className="font-semibold text-gray-800">Best Customer Support</p> {/* Fixed typo: Suport -> Support */}
        <p className="text-gray-500 text-sm mt-1">We provide 24/7 customer support</p>
      </div>
    </section>
  );
};

export default OurPolicy;