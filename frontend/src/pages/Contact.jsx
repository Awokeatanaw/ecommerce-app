// src/pages/Contact.js
import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <section className="py-10 border-t border-gray-200 bg-gray-50">
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-8 lg:gap-10 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md object-cover"
          src={assets.contact_img}
          alt="BySmart store"
        />
        <div className="flex flex-col justify-center items-start gap-6 text-gray-600">
          <p className="font-semibold text-xl text-gray-800">Our Store</p>
          <p className="text-sm sm:text-base">Bahir Dar, Ethiopia</p>
          <p className="text-sm sm:text-base">
            Tel: +251-955-234-677
            <br />
            Email: awe12@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-800">Careers at BySmart</p>
          <p className="text-sm sm:text-base">
            Learn more about our team and job openings
          </p>
          <button className="border border-primary px-8 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white rounded-full transition-all duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsletterBox />
    </section>
  );
};

export default Contact;