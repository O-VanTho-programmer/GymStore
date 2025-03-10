import SearchBar from '@/components/SearchBar/SearchBar';
import React from 'react';

const TransactionTable = ({ transaction }) => {
    return (
        <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md'>
            <h3 className='text-lg font-semibold mb-4'>Transactions</h3>

            <div className='overflow-y-auto max-h-[300px]'>
                <table className='min-w-full bg-white'>
                    <thead className='sticky top-0 bg-gray-100 z-10'>
                        <tr>
                            <th className='py-2'>Date</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Product</th>
                            <th className='py-2'>Quantity</th>
                            <th className='py-2'>Price</th>
                            <th className='py-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaction && transaction.map(transaction => (
                            <tr key={transaction.id} className='border-b border-gray-200 hover:bg-gray-100'>
                                <td className='py-2 text-center'>{transaction.create_date}</td>
                                <td className='py-2 text-center'>{transaction.username}</td>
                                <td className='py-2 text-center'>{transaction.name}</td>
                                <td className='py-2 text-center'>{transaction.quantity}</td>
                                <td className='py-2 text-center'>{transaction.price}</td>
                                <td className='py-2 text-center'>{transaction.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionTable;