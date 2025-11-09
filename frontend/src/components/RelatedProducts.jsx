// src/components/RelatedProducts.js (adjust path as needed)
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <section className="w-full my-12 sm:my-24 bg-gray-50 py-6 sm:py-12 ml-4 sm:ml-6 lg:ml-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center text-2xl sm:text-3xl py-2 animate-fadeIn">
          <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-6 sm:gap-y-8 w-full">
          {related.length > 0 ? (
            related.map((item, index) => (
              <div
                key={item._id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductItem
                  id={item._id}
                  name={item.name}
                  image={[`http://localhost:4000/${item.image[0]}`]}
                  price={item.price}
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-sm sm:text-base">
              No related products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;