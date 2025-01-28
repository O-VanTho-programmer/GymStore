'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../../SearchBar/SearchBar';
import ButtonSmall from '../../../ButtonSmall/ButtonSmall';

function ProductTableAdmin() {
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     fetch('/api/products')
    //         .then(response => response.json())
    //         .then(data => setProducts(data))
    //         .catch(error => console.error('Error fetching products:', error));
    // }, []);

    return (
        <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md'>
            <h3 className='text-lg font-semibold mb-4'>Products</h3>

            <div className="border-b border-black flex justify-between gap-5">
                <SearchBar />
                <ButtonSmall text={"Add Products"} />
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
                            <td className='py-2'>{product.id}</td>
                            <td className='py-2'>{product.name}</td>
                            <td className='py-2'>{product.stock}</td>
                            <td className='py-2'>{product.category}</td>
                            <td className='py-2'>{product.costPrice}</td>
                            <td className='py-2'>{product.sellPrice}</td>
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