import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';


const About = () => {
  return (
    <section className="py-10 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-8 lg:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md object-cover"
          src={assets.about_img}
          alt="About BySmart"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="text-sm sm:text-base">
            BySmart was born out of a passion for innovation and a desire to revolutionize the way people shop online.
          </p>
          <b className="text-gray-800 font-semibold text-lg">Our Mission</b>
          <p className="text-sm sm:text-base">
            Our mission is to provide an exceptional shopping experience by offering a wide range of products, ensuring quality, and prioritizing customer satisfaction.
          </p>
        </div>
      </div>
      <div className="text-xl py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row gap-6 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {[
          {
            title: 'Quality Assurance',
            desc: 'We are committed to providing high-quality products that meet our customers’ expectations, ensuring satisfaction with every purchase.',
          },
          {
            title: 'Convenience',
            desc: 'Our platform is designed for ease of use, allowing customers to shop from anywhere at any time, making their shopping experience seamless.',
          },
          {
            title: 'Exceptional Customer Service',
            desc: 'We pride ourselves on providing outstanding customer support, ensuring that all inquiries and issues are addressed promptly and effectively.',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col gap-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <b className="text-gray-800 font-semibold text-lg">{item.title}:</b>
            <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <NewsletterBox />
    </section>
  );
};

export default About;