import React from 'react'
import { FaRegStar } from "react-icons/fa6";
import { BsBucketFill } from "react-icons/bs";

function Product({ image_url, product_name, price, link, rating }) {
    return (
        <div className='h-full bg-white shadow-md rounded-lg overflow-hidden'>
            <form>
                <div className='product_thumbnail relative overflow-hidden p-2'>
                    <a href={link} className='relative'>
                        <img loading='lazy' src={image_url} className='p-2 object-cover w-full h-auto max-h-48 md:max-h-64 lg:max-h-80 transition-transform duration-300 hover:scale-105' />
                    </a>
                </div>
                <div className='product_info p-4'>
                    <h3 className='product_name text-lg font-semibold mb-2'>
                        <a href={link} className='text-black text-base'>
                            {product_name}
                        </a>
                    </h3>

                    <div className='rating flex items-center mb-2'>
                        <span className='rating_score text-black underline mr-2'>{rating}</span>
                        {Array.from({ length: 5 }, (_, index) => (
                            <FaRegStar
                                key={index}
                                size={15}
                                className={index < rating ? 'text-[#ffd500]' : 'text-gray-300'}
                            />
                        ))}
                    </div>

                    <div className='product_price flex justify-between items-center'>
                        <div className='price_box'>
                            <span className='price text-xl font-bold text-orange-500'>{price}₫</span>
                            <div className='flex items-center mt-1'>
                                <span className='compare_price line-through text-gray-500 mr-2'>1.900.000₫</span>
                                <div className='product_discount text-sm text-center bg-[#f36100] text-white px-1 rounded'>
                                    -11%
                                </div>
                            </div>
                        </div>

                        <button className='w-[30px] h-[30px] bg-[#db712a] text-gray-200 hover:bg-orange-500 hover:text-white inline-flex items-center justify-center p-1 rounded-full transition-colors duration-300'>
                            <BsBucketFill />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Product
