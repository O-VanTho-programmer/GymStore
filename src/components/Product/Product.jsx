import React, { useState } from 'react'
import { BsBucketFill } from "react-icons/bs";
import Rating from '../Rating/Rating';
import addCart from '@/utils/addCart';
import InformMessage from '../InformMessage/InformMessage';

function Product({ user, productId, image_url, product_name, price, link, rating }) {
    const [message, setMessage] = useState("");
    const [pending, setPending] = useState(false);

    const showMessage = (message) => {
        setMessage(message);

        setTimeout(() => setMessage(""), 1000);
    }

    const handleAddCart = async () => {
        setPending(true);

        try {
            await addCart({ productId, userId: user.userId, quantity: 1 });
            showMessage("Item added");
        } catch (error) {
            showMessage("Item cannot be added");
        } finally {
            setPending(false);
        }
    }

    return (
        <div className='h-full bg-white shadow-md rounded-lg overflow-hidden'>
            <div className='product_thumbnail relative overflow-hidden p-2'>
                <a href={link} className='relative'>
                    <img loading='lazy' src={image_url} className='p-2 object-cover w-full h-60 md:w-60 md:h-60 transition-transform duration-300 hover:scale-105' />
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
                    <Rating rating={5} />
                </div>

                <div className='product_price flex justify-between items-center'>
                    <div className='price_box'>
                        <span className='price text-xl font-bold text-orange-500'>{price}</span>
                        <div className='flex items-center mt-1'>
                            <span className='compare_price line-through text-gray-500 mr-2'>1.900.000₫</span>
                            <div className='product_discount text-sm text-center bg-[#f36100] text-white px-1 rounded'>
                                -11%
                            </div>
                        </div>
                    </div>

                    <button disabled={pending} onClick={handleAddCart} className='w-[30px] h-[30px] bg-[#db712a] text-gray-200 hover:bg-orange-500 hover:text-white inline-flex items-center justify-center p-1 rounded-full transition-colors duration-300'>
                        <BsBucketFill />
                    </button>
                </div>
            </div>

            {message && (
                <InformMessage message={message} />
            )}
        </div>
    )
}

export default Product
