// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-4 font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="animate-fadeIn">
          <img src={assets.logo} className="w-32" alt="BySmart logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
          {[
            { to: '/', label: 'HOME' },
            { to: '/collection', label: 'COLLECTION' },
            { to: '/about', label: 'ABOUT' },
            { to: '/contact', label: 'CONTACT' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 hover:text-accent transition-colors ${
                  isActive ? 'text-accent' : ''
                }`
              }
            >
              <span className="prata-regular">{label}</span>
              <hr
                className={`w-0 h-[1.5px] bg-accent transition-all duration-300 ${
                  to === window.location.pathname ? 'w-2/4' : 'group-hover:w-2/4'
                }`}
              />
            </NavLink>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5 sm:gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer hover:opacity-80 transition-opacity"
            alt="Search"
          />
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate('/login'))}
              src={assets.profile_icon}
              className="w-5 cursor-pointer hover:opacity-80 transition-opacity"
              alt="Profile"
            />
            {token && (
              <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-lg py-3 px-5 text-gray-600">
                <p className="cursor-pointer hover:text-accent py-1">
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/orders')}
                  className="cursor-pointer hover:text-accent py-1"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-accent py-1"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-5 min-w-5 hover:opacity-80 transition-opacity"
              alt="Cart"
            />
            <span className="absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center leading-4 bg-accent text-white rounded-full text-[8px] font-bold">
              {getCartCount()}
            </span>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden hover:opacity-80 transition-opacity"
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white shadow-lg transition-all duration-300 ${
          visible ? 'w-3/4 sm:w-1/2 max-w-xs' : 'w-0'
        } overflow-hidden z-50`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Close menu"
            />
            <span className="font-medium">Back</span>
          </div>
          {[
            { to: '/', label: 'HOME' },
            { to: '/collection', label: 'COLLECTION' },
            { to: '/about', label: 'ABOUT' },
            { to: '/contact', label: 'CONTACT' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 px-6 border-b hover:bg-gray-100 transition-colors ${
                  isActive ? 'text-accent' : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;