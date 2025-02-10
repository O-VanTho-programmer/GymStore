'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../../SearchBar/SearchBar';
import ButtonSmall from '../../../ButtonSmall/ButtonSmall';
import axios from 'axios';

function ProductTableAdmin() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_product");
                setProducts(res.data.products);
            } catch (error) {
                console.log("Error fetch product data", error);
            }
        }

        fetchData();
    }, [])

    return (
        <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md'>
            <h3 className='text-lg font-semibold mb-4'>Products</h3>

            <div className="border-b border-black flex justify-between gap-5">
                <SearchBar />
                <a href='/admin/dashboard/products/add_product' className='w-fit'>
                    <ButtonSmall text={"Add Products"} />
                </a>
            </div>

            <table className='min-w-full bg-white'>
                <thead>
                    <tr>
                        <th className='py-2'>ID</th>
                        <th className='py-2'>Name</th>
                        <th className='py-2'>Stock</th>
                        <th className='py-2'>Category</th>
                        <th className='py-2'>Cost Price</th>
                        <th className='py-2'>Sell Price</th>
                        <th className='py-2'></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product => (
                        <tr key={product.id}>
                            <td className='py-2 text-center'>{product.id}</td>
                            <td className='py-2 text-center'>{product.name}</td>
                            <td className='py-2 text-center'>{product.stock_quantity}</td>
                            <td className='py-2 text-center'>{product.category_name}</td>
                            <td className='py-2 text-center'>{product.cost_price}</td>
                            <td className='py-2 text-center'>{product.sell_price}</td>
                            <td className='py-2'>
                                <button className='text-blue-500 hover:text-blue-700 mr-2'>View</button>
                                <button className='text-green-500 hover:text-green-700'>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTableAdmin;