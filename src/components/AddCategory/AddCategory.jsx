'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { AiFillCloseSquare } from "react-icons/ai";

function AddCategory({ onClose }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [successMess, setSuccessMess] = useState(null);

    const handleAddCategory = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/add_category", {
                name,
                description,
                images 
            });

            setSuccessMess("Category added successfully!");
        } catch (error) {
            console.log("Error adding category:", error);
        }
    };


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // const imageUrl = `http://localhost:5000${}`;
            setImages([...images, response.data.imageUrl]);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className='flex justify-center items-center w-screen min-h-screen bg-gray-800 bg-opacity-50'>
            <form onSubmit={handleAddCategory} className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-xl font-semibold'>Add Category</h3>
                    <AiFillCloseSquare className='text-2xl cursor-pointer' onClick={() => onClose(false)} />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Category Name
                    </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md' />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Description Category
                    </label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md' />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Upload Images
                    </label>
                    <input type='file' onChange={handleImageChange} className='w-full p-2 border border-gray-300 rounded-md' />
                    <div className='mt-2 flex flex-wrap'>
                        {images.map((image, index) => (
                            <div key={index} className='relative'>
                                <img src={image} alt={`Uploaded ${index}`} className='w-20 h-20 object-cover m-1' />
                                <button
                                    type='button'
                                    className='absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 w-[20px] h-[20px] flex justify-center items-center text-xs'
                                    onClick={() => {
                                        setImages(images.filter((_, i) => i !== index));
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type='submit' className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700'>
                    Add Category
                </button>
                {successMess && <p className='mt-4 text-green-600'>{successMess}</p>}
            </form>
        </div>
    )
}

export default AddCategory;