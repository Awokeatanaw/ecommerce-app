import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="my-12 sm:my-16 bg-gray-50 py-10 rounded-xl shadow-md">
      <div className="text-center mb-10 animate-fadeIn">
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4 max-w-2xl">
          Explore our Latest Collection featuring brand-new arrivals and trending styles. Stay ahead with fresh designs, premium quality, and the newest fashion picks added just for you.
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4 sm:px-6">
        {latestProducts.map((item, index) => (
          <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
            <ProductItem
              id={item._id}
              image={[`http://localhost:4000/${item.image[0]}`]}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;