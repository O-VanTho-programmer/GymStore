import React, { useState } from 'react'
import { BsBucketFill } from "react-icons/bs";
import addCart from '@/utils/addCart';
import InformMessage from '../InformMessage/InformMessage';
import ErrorInformMessage from '../ErrorInformMessage/ErrorInformMessage';

function Product({ user, productId, image_url, product_name, price, link, rating }) {
    const [message, setMessage] = useState("");
    const [errorMess, setErrorMess] = useState("");
    const [pending, setPending] = useState(false);

    const showMessage = (message) => {
        setMessage(message);
        setTimeout(() => setMessage(""), 1000);
    }

    const showErrorMessage = (message) => {
        setErrorMess(message);
        setTimeout(() => setErrorMess(""), 1000);
    }

    const handleAddCart = async () => {
        setPending(true);
        try {
            const result = await addCart({ productId, userId: user.userId, quantity: 1 });

            if (result.success) {
                showMessage("Item added into Cart");
            } else {
                showErrorMessage(result.message || "Failed to add item");
            }
        } catch (error) {
            showMessage("Item cannot be added");
        } finally {
            setPending(false);
        }
    }

    return (
        <div className='h-full bg-white shadow-md rounded-lg overflow-hidden'>
            <div className='product_thumbnail relative overflow-hidden'>
                <a href={link} className='relative flex justify-center'>
                    <img loading='lazy' src={image_url} className='object-cover object-center w-full h-60 md:w-60 md:h-60 transition-transform duration-300 hover:scale-105' />
                </a>
            </div>

            <div className='product_info p-2 sm:p-4'>
                <h3 className='product_name font-semibold mb-2 text-sm sm:text-base'>
                    <a href={link} className='text-black'>
                        {product_name}
                    </a>
                </h3>

                <div className='product_price flex justify-between items-center'>
                    <div className='price_box items-center gap-2'>
                        <span className='price font-bold text-orange-500 text-sm sm:text-xl'>{price}</span>
                        <div className='flex items-center mt-1'>
                            <span className='compare_price line-through text-gray-500 text-xs sm:text-sm mr-2'>1.900.000₫</span>
                            <div className='product_discount text-xs sm:text-sm text-center bg-[#f36100] text-white px-1 rounded'>
                                -11%
                            </div>
                        </div>
                    </div>

                    {/* Hide button on mobile, show on tablet and up */}
                    <div>
                        <div className='flex items-center text-sm sm:text-base'>
                            ⭐ <span className='ml-1'>{rating}</span>
                        </div>
                        <button
                            disabled={pending}
                            onClick={handleAddCart}
                            className='mt-2 hidden sm:inline-flex w-[30px] h-[30px] bg-[#db712a] text-gray-200 hover:bg-orange-500 hover:text-white items-center justify-center p-1 rounded-full transition-colors duration-300'>
                            <BsBucketFill />
                        </button>
                    </div>
                </div>


            </div>

            {message && <InformMessage message={message} />}
            {errorMess && <ErrorInformMessage message={errorMess} />}
        </div>
    )
}

export default Product
