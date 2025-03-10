"use client";

import getProductItem from "@/utils/getProductItem";
import React, { useState, useEffect } from "react";
import Rating from "../Rating/Rating";
import ButtonNumber from "../ButtonNumber/ButtonNumber";
import axios from "axios";
import addCart from "@/utils/addCart";
import InformMessage from "../InformMessage/InformMessage";
import { useQuantityOrder } from "@/context/QuantityOrderProvider";
import ErrorInformMessage from "../ErrorInformMessage/ErrorInformMessage";

export default function ProductItem({ id, user, rating }) {
    const { orderQuantity, setOrderQuantity } = useQuantityOrder();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [size, setSize] = useState([]);
    const [flavour, setFlavour] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [errorMess, setErrorMess] = useState("");
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductItem(id);
            if (data) {
                setProduct(data);
                setSelectedImage(data.images[0]);
                setSelectedIndex(0);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const handleChangeQuantity = (newQuantity) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
        }
    }

    const handleImageSelect = (image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    };

    const showMessage = (message) => {
        setMessage(message);
        setPending(true);

        setTimeout(() => {
            setMessage('');
            setPending(false);
        }, 1000);
    }

    const showErrorMessage = (message) => {
        setErrorMess(message);
        setTimeout(() => setErrorMess(""), 1000);
    }

    const handleAddCart = async () => {
        setPending(true);
        try {
            
            const result = await addCart({ productId: id, userId: user.userId, quantity });

            if (result.success) {
                showMessage("Item added into Cart");
            } else {
                showErrorMessage(result.message || "Failed to add item");
            }
        } catch (error) {
            showErrorMessage("Item cannot be added");
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center gap-5 bg-white shadow-lg rounded-lg p-4 lg:p-8">
            <div className="p-4 mb-4 lg:mb-0">
                {selectedImage && (
                    <img src={selectedImage} alt="Selected" className="w-full h-auto lg:w-[360px] lg:h-[360px] mb-4 rounded-lg object-cover" />
                )}
                <ul className="flex gap-2 flex-wrap">
                    {product.images.map((image, index) => (
                        <li
                            key={index}
                            className={`w-16 h-16 lg:w-20 lg:h-20 border-2 rounded overflow-hidden cursor-pointer ${selectedIndex === index ? 'border-orange-500' : 'border-gray-200'}`}
                            onClick={() => handleImageSelect(image, index)}
                        >
                            <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover" />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col justify-between gap-4 max-w-full lg:max-w-md">
                <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-800">{product.name}</h1>
                    <div className="flex items-center gap-5 mt-5">
                        <div className="flex gap-1 text-gray-600">
                            <span className="text-orange-600 font-semibold">
                                {product.num_sold}
                            </span>
                            sold
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="text-orange-500 underline font-bold">{rating}</span>
                            <Rating rating={rating} />
                        </div>
                    </div>
                </div>
                <p className="text-lg lg:text-xl font-bold text-orange-600">{product.sell_price} vnd</p>
                <p className="text-gray-700">{product.description}</p>

                {product.size && (
                    <div className='flex gap-2'>
                        <h3 className='font-bold text-lg text-gray-800'>Size: </h3>

                        <div className='flex gap-2 flex-wrap'>
                            {product.size.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize([s])}
                                    className={`p-2 text-lg rounded w-12 ${size.includes(s) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>)
                }

                {product.flavour && (
                    <div className='flex gap-2'>
                        <h3 className='font-bold text-lg text-gray-800'>Flavour: </h3>

                        <div className='flex gap-2 flex-wrap'>
                            {product.flavour.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setFlavour([s])}
                                    className={`p-2 text-lg rounded w-12 ${flavour.includes(s) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <label className="flex gap-5 items-center text-gray-800">
                    Quantity:
                    <ButtonNumber quantity={quantity} setQuantity={handleChangeQuantity} />
                </label>

                <div className="flex flex-col gap-2 mt-4">
                    <button onClick={handleAddCart} disabled={pending} className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>

            {message && <InformMessage message={message} />}
            {errorMess && <ErrorInformMessage message={errorMess} />}
        </div>
    );
}
