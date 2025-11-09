// src/pages/Collection.js
import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }
    if (subCategory.length) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 border-t border-gray-200">
          {/* Filter Section */}
          <aside className="min-w-[15rem] animate-fadeIn">
            <div
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center justify-between cursor-pointer py-3 text-xl font-semibold text-primary hover:text-accent transition-colors"
            >
              <span>FILTERS</span>
              <img
                src={assets.dropdown_icon}
                className={`h-4 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
                alt="Toggle filters"
              />
            </div>
            {/* Category Filter */}
            <div
              className={`mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 ${
                showFilter ? 'block' : 'hidden'
              } sm:block`}
            >
              <h3 className="text-sm font-semibold text-gray-800 mb-4">CATEGORIES</h3>
              <div className="flex flex-col gap-3 text-sm text-gray-600">
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer hover:text-accent transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={cat}
                      onChange={toggleCategory}
                      className="w-4 h-4 text-accent focus:ring-accent rounded border-gray-300"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Subcategory Filter */}
            <div
              className={`mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 ${
                showFilter ? 'block' : 'hidden'
              } sm:block`}
            >
              <h3 className="text-sm font-semibold text-gray-800 mb-4">TYPES</h3>
              <div className="flex flex-col gap-3 text-sm text-gray-600">
                {['Topwear', 'Bottomwear', 'Winterwear'].map((subCat) => (
                  <label
                    key={subCat}
                    className="flex items-center gap-3 cursor-pointer hover:text-accent transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={subCat}
                      onChange={toggleSubCategory}
                      className="w-4 h-4 text-accent focus:ring-accent rounded border-gray-300"
                    />
                    <span>{subCat}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Section */}
          <div className="flex-1 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fadeIn [animation-delay:0.1s]">
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white shadow-sm focus:ring-accent focus:border-accent"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts.length ? (
                filterProducts.map((item, index) => (
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
                  No products found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;