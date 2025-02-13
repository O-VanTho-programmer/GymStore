'use client';
import React, { useEffect, useState } from 'react';
import styles from './add_product.module.css';
import { CiCirclePlus } from "react-icons/ci";
import AddCategory from '@/components/AddCategory/AddCategory';
import axios from 'axios';
import InformMessage from '@/components/InformMessage/InformMessage';

function Page() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState([]);
    const [gender, setGender] = useState([]);
    const [costPrice, setCostPrice] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const showMessage = (message) => {
        setSuccessMessage(message);

        setTimeout(() => setSuccessMessage(''), 3000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/add_product",
                {
                    productName,
                    description,
                    sellPrice,
                    costPrice,
                    stock,
                    isSizeEnabled,
                    isGenderEnabled,
                    size,
                    gender,
                    category,
                    images
                }
            )

            console.log("Response:", res.data);
            showMessage(res.data.message);
        } catch (error) {
            console.log("Error submit add product")
        }
    };

    const handleSizeChange = (size) => {
        setSize((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    const handleGenderChange = (gender) => {
        setGender((prev) =>
            prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
        );
    };

    const [isSizeEnabled, setIsSizeEnabled] = useState(false);
    const [isGenderEnabled, setIsGenderEnabled] = useState(false);

    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const imageUrl = `http://localhost:5000${response.data.imageUrl}`;
            setImages([...images, imageUrl]); // Add image to state
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_category");

                setCategoryData(res.data.categories);
            } catch (error) {
                console.log("Error fetch category")
            }
        }

        fetchCategoryData();
    }, [])

    return (
        <div className="p-6 bg-gray-100">
            <div className='flex items-center justify-between mb-4'>
                <h3 className="text-xl font-bold">Add New Product</h3>
                <button onClick={handleSubmit} className='px-4 py-2 bg-blue-500 text-white rounded'>
                    Add Product
                </button>
            </div>

            <div className='flex gap-4'>
                <div className='w-2/3'>
                    <div className='bg-white p-4 mb-4 rounded shadow'>
                        <h3 className='text-base font-semibold mb-2'>General Information</h3>

                        <div className="mb-4">
                            <label className="block mb-2">
                                Full Name:
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="w-full p-2 mt-1 bg-gray-200 rounded"
                                />
                            </label>

                            <label className="block mb-2">
                                Description Product:
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-2 mt-1 bg-gray-200 rounded"
                                />
                            </label>
                        </div>

                        <div className='flex mb-4'>
                            <div className='flex-1'>
                                <div className='flex items-center gap-5 mb-3'>
                                    <h3 className=''>Size</h3>

                                    <label className={styles.switch}>
                                        <input
                                            type="checkbox"
                                            checked={isSizeEnabled}
                                            onChange={() => setIsSizeEnabled(!isSizeEnabled)}
                                        />
                                        <span className={styles.slider}></span>
                                    </label>
                                </div>

                                <div className='flex gap-2 flex-wrap'>
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => handleSizeChange(s)}
                                            className={`p-2 text-lg rounded w-12 ${size.includes(s) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                            disabled={!isSizeEnabled}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='flex-1'>
                                <div className='flex items-center gap-5 mb-3'>
                                    <h3 className=''>Gender</h3>

                                    <label className={styles.switch}>
                                        <input
                                            type="checkbox"
                                            checked={isGenderEnabled}
                                            onChange={() => setIsGenderEnabled(!isGenderEnabled)}
                                        />
                                        <span className={styles.slider}></span>
                                    </label>
                                </div>
                                <div className='flex gap-3'>
                                    {['Man', 'Woman', 'Unisex'].map((g) => (
                                        <label key={g} className="flex items-center gap-1">
                                            <input
                                                type='checkbox'
                                                checked={gender.includes(g)}
                                                onChange={() => handleGenderChange(g)}
                                                disabled={!isGenderEnabled}
                                            />
                                            {g}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white p-4 rounded shadow'>
                        <h3 className='text-base font-semibold mb-2'>Pricing And Stock</h3>
                        <div className='flex flex-wrap gap-4'>
                            <label className="block">
                                Cost price
                                <input
                                    type="number"
                                    value={costPrice}
                                    onChange={(e) => setCostPrice(e.target.value)}
                                    className='w-full p-2 mt-1 bg-gray-200 rounded'
                                />
                            </label>

                            <label className="block">
                                Sell price
                                <input
                                    type="number"
                                    value={sellPrice}
                                    onChange={(e) => setSellPrice(e.target.value)}
                                    className='w-full p-2 mt-1 bg-gray-200 rounded'
                                />
                            </label>

                            <label className="block">
                                Stock
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    className='w-full p-2 mt-1 bg-gray-200 rounded'
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className='w-1/3'>
                    <div className='bg-white p-4 mb-4 rounded shadow'>
                        <h3 className='text-base font-semibold mb-2'>Upload Image</h3>
                        {selectedImage && <img src={selectedImage} alt="Selected" className="w-full h-auto mb-4" />}
                        <ul className="flex gap-2 flex-wrap">
                            {images.map((image, index) => (
                                <li key={index} className="w-20 h-20 border rounded overflow-hidden cursor-pointer" onClick={() => handleImageSelect(image)}>
                                    <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover" />
                                </li>
                            ))}
                            <li className='flex justify-center items-center w-20 h-20 border rounded cursor-pointer hover:text-blue-500'>
                                <label className="cursor-pointer">
                                    <CiCirclePlus size={24} />
                                    <input type="file" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </li>
                        </ul>
                    </div>

                    <div className='bg-white p-4 rounded shadow'>
                        <h3 className='text-base font-semibold mb-2'>Category</h3>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 mt-1 bg-gray-200 rounded mb-2"
                        >
                            <option hidden value="">Select Category</option>
                            {categoryData?.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>

                        <button onClick={() => setOpenAddCategory(true)} className='px-4 py-2 bg-blue-500 text-white rounded'>
                            Add Category
                        </button>
                    </div>
                </div>
            </div>

            {openAddCategory && (
                <div className='fixed w-screen h-screen top-0 left-0 flex items-center justify-center'>
                    <AddCategory onClose={() => setOpenAddCategory(false)} />
                </div>
            )}

            {successMessage &&
                <InformMessage message={successMessage} />
            }
        </div>
    );
}

export default Page;