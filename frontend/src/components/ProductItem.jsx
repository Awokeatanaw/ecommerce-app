// src/components/ProductItem.js
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/products/${id}`}
      className="group block text-gray-700 cursor-pointer animate-fadeIn"
    >
      <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="p-4">
          <p className="text-sm sm:text-base font-medium text-gray-800 truncate">
            {name}
          </p>
          <p className="text-sm sm:text-base font-bold text-accent mt-1">
            {currency}
            {price?.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;