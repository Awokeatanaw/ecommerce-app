
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState({});
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        const foundProduct = products.find(item => item._id === productId);
        if (foundProduct) {
            setProductData(foundProduct);
            setImage(`http://localhost:4000/${foundProduct.image[0]}`); // Set the main image correctly
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    return productData && productData.image ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* Product image */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {Array.isArray(productData.image) && productData.image.map((item, index) => (
                            <img
                                key={index}
                                onClick={() => setImage(`http://localhost:4000/${item}`)} // Set the clicked image
                                src={`http://localhost:4000/${item}`} // Ensure the image URL is correct
                                className='w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                                alt=""
                            />
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image} alt="" />
                    </div>
                </div>

                {/* ---- Product info ---- */}
                <div className='flex-1'>
                    <p className='font-medium text-2xl mt-2'>{productData.name}</p>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_dull_icon} alt="" className='w-3 5' />
                        <p className='pl-2'>{122}</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

                    <div className='flex flex-col gap-4 my-8'>
    <p>Select Size</p>
    <div className='flex gap-2'>
        {Array.isArray(productData.size) && productData.size.length > 0 ? (
            productData.size.map((item, index) => (
                <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                    key={index}>
                    {item}
                </button>
            ))
        ) : (
            <p className='text-gray-500'>No sizes available</p> // Message when no sizes are available
        )}
    </div>
</div>

                    <button
                        onClick={() => addToCart(productData._id, size)}
                        className='bg-black text-white px-8 py-3 text-sm active:bg-slate-500'>
                        ADD TO CART
                    </button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/*-------- Description and review section --------*/}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Review (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>An e-commerce website is an online platform that facilitates buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals.</p>
                    <p>E-commerce websites typically display products or services with detail.</p>
                </div>
            </div>

            {/*----- Display related products -----*/}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : (
        <div className='opacity-0'></div> // Or a loading indicator
    );
};

export default Product;

{/*-----  -----*/}