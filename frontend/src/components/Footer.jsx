// src/components/Footer.js
import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 mt-20 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-8 sm:gap-12">
          {/* Brand Section */}
          <div className="animate-fadeIn">
            <img src={assets.logo} className="w-28 mb-5" alt="BySmart logo" />
            <p className="text-sm sm:text-base text-gray-600 max-w-md">
              <strong>BySmart</strong> is your trusted online destination for
              quality products and unbeatable style. Discover the latest trends,
              exclusive offers, and a seamless shopping experience all in one
              place.
            </p>
          </div>
          {/* Company Links */}
          <div className="animate-fadeIn [animation-delay:0.1s]">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              COMPANY
            </h3>
            <ul className="flex flex-col gap-2 text-sm sm:text-base text-gray-600">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="hover:text-accent transition-colors"
                >
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="animate-fadeIn [animation-delay:0.2s]">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              GET IN TOUCH
            </h3>
            <ul className="flex flex-col gap-2 text-sm sm:text-base text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-accent">📞</span> +251 949 860 288
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✉️</span> contact@bysmart.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">📍</span> Bahir Dar, Ethiopia
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-300" />
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BySmart.com — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;