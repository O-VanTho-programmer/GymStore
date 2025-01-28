import SearchBar from '@/components/SearchBar/SearchBar';
import React from 'react';

const TransactionTable = ({ transaction }) => {
    return (
        <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md'>
            <h3 className='text-lg font-semibold mb-4'>Transactions</h3>

            <div className="border-b border-black flex justify-between gap-5">
                <SearchBar />
            </div>

            <table className='min-w-full bg-white'>
                <thead>
                    <tr>
                        <th className='py-2'>User ID</th>
                        <th className='py-2'>Username</th>
                        <th className='py-2'>Product</th>
                        <th className='py-2'>Quantity</th>
                        <th className='py-2'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction && transaction.map(transaction => (
                        <tr key={transaction.id}>
                            <td className='py-2'>{transaction.user.id}</td>
                            <td className='py-2'>{transaction.user.name}</td>
                            <td className='py-2'>{transaction.product.name}</td>
                            <td className='py-2'>{transaction.quantity}</td>
                            <td className='py-2'>{product.sellPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionTable;