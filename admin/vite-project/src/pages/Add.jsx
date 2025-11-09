// src/pages/Add.js
import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [size, setSize] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('size', JSON.stringify(size));
      formData.append('image1', image1);
      formData.append('image2', image2);
      formData.append('image3', image3);
      formData.append('image4', image4);

      const response = await axios.post(`http://localhost:4000/api/product/add`, formData, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <div>
        <p className="text-lg font-medium mb-4">Upload Images</p>
        <div className="flex gap-4">
          {['image1', 'image2', 'image3', 'image4'].map((id) => (
            <label key={id} htmlFor={id} className="cursor-pointer">
              <img
                className="w-20 h-20 object-cover rounded-md border-2 border-gray-200 hover:border-accent transition-colors"
                src={!eval(id) ? assets.upload_area : URL.createObjectURL(eval(id))}
                alt="Upload area"
              />
              <input
                onChange={(e) => eval(`set${id.charAt(0).toUpperCase() + id.slice(1)}(e.target.files[0])`)}
                type="file"
                id={id}
                hidden
              />
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="text-lg font-medium mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div>
        <p className="text-lg font-medium mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent h-24 resize-none"
          placeholder="Write content here"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/3">
          <p className="text-lg font-medium mb-2">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="w-full sm:w-1/3">
          <p className="text-lg font-medium mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="w-full sm:w-1/3">
          <p className="text-lg font-medium mb-2">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>
      <div>
        <p className="text-lg font-medium mb-2">Product Size</p>
        <div className="flex gap-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map((sizeOption) => (
            <p
              key={sizeOption}
              onClick={() =>
                setSize((prev) =>
                  prev.includes(sizeOption) ? prev.filter((item) => item !== sizeOption) : [...prev, sizeOption]
                )
              }
              className={`px-3 py-1 cursor-pointer rounded-md ${
                size.includes(sizeOption) ? 'bg-accent text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-accent hover:text-white transition-colors`}
            >
              {sizeOption}
            </p>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="h-5 w-5 accent-accent"
        />
        <label htmlFor="bestseller" className="cursor-pointer text-lg font-medium">
          Add to Bestseller
        </label>
      </div>
      <button
        type="submit"
        className="w-32 py-2 mt-6 bg-primary bg-blue-700 text-white rounded-md hover:bg-accent transition-colors duration-300"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;