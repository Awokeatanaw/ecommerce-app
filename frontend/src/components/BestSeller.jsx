import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className="my-12 sm:my-16 bg-white py-10 rounded-xl shadow-md">
      <div className="text-center mb-10 animate-fadeIn">
        <Title text1={'BEST'} text2={'SELLER'} />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4 max-w-2xl">
          Discover our most popular products loved by our customers. These bestsellers combine exceptional quality, modern style, and unbeatable value — carefully selected to bring you the best of what we offer.
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4 sm:px-6">
        {bestSeller.map((item, index) => (
          <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
            <ProductItem
              id={item._id}
              image={[`http://localhost:4000/${item.image[0]}`]}
              name={item.name}
              price={item.price} // Added price prop (was missing; assuming ProductItem supports it like in LatestCollection)
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;