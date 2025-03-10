'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../../SearchBar/SearchBar';
import ButtonSmall from '../../../ButtonSmall/ButtonSmall';
import axios from 'axios';
import { useSearch } from '@/context/SearchContext';

function ProductTableAdmin() {
    const { nameSearch, enteredSearch, setEnterSearch } = useSearch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/get_product_admin/${nameSearch}`);
                
                setProducts(res.data.products);
            } catch (error) {
                console.log("Error fetch product data", error);
            } finally {
                setEnterSearch(false);
            }
        }

        fetchData();
    }, [enteredSearch]);

    return (
        <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md'>
            <h3 className='text-lg font-semibold mb-4'>Products</h3>

            <div className="border-b border-black flex justify-between gap-5">
                <SearchBar />
                <a href='/admin/dashboard/products/add_product' className='w-fit'>
                    <ButtonSmall text={"Add Products"} />
                </a>
            </div>

            <div className='overflow-y-auto max-h-[300px]'>
                <table className='min-w-full bg-white'>
                    <thead className='sticky top-0 bg-gray-100 z-10'>
                        <tr>
                            <th className='py-2 text-center'>ID</th>
                            <th className='py-2 text-center'>Name</th>
                            <th className='py-2 text-center'>Stock</th>
                            <th className='py-2 text-center'>Sold</th>
                            <th className='py-2 text-center'>Category</th>
                            <th className='py-2 text-center'>Cost Price</th>
                            <th className='py-2 text-center'>Sell Price</th>
                            <th className='py-2 text-center'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(product => (
                            <tr key={product.id} className={`border-b border-gray-200 hover:bg-gray-100`}>
                                <td className='py-2 text-center'>{product.id}</td>
                                <td className='py-2 text-center'>{product.name}</td>
                                <td className={`py-2 text-center ${product.stock_quantity <= 10 ? 'bg-red-100' : ''}`}>{product.stock_quantity}</td>
                                <td className='py-2 text-center'>{product.sold_quantity}</td>
                                <td className='py-2 text-center'>{product.category_name}</td>
                                <td className='py-2 text-center'>{product.cost_price}</td>
                                <td className='py-2 text-center'>{product.sell_price}</td>
                                <td className='py-2'>
                                    <a href={`/store/product/${product.id}`} className='text-blue-500 hover:text-blue-700 mr-2'>View</a>
                                    <a href={`/admin/dashboard/products/edit_product/${product.id}`} className='text-green-500 hover:text-green-700'>Edit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductTableAdmin;