'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';


const CategoryTableAdmin = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            const res = await axios.get("https://gymstore-production.up.railway.app/api/get_category");
            setCategories(res.data.categories);
        }

        fetchData();
    }, [])

    return (
        <div className="p-5 font-sans">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2 bg-gray-200">Category Name</th>
                        <th className="border border-gray-300 p-2 bg-gray-200">Number of Items</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td className="border border-gray-300 p-2">{category.name}</td>
                            <td className="border border-gray-300 p-2">{category.product_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTableAdmin;