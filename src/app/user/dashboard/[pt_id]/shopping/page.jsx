'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';

function page() {
  const { currentUser } = useUser();
  const [deliveringOrders, setDeliveringOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDeliveringOrders = await axios.get(`http://localhost:5000/api/get_order_delivering/${currentUser.userId}`);
        const resHistoryOrders = await axios.get(`http://localhost:5000/api/get_order_history/${currentUser.userId}`);

        console.log(resHistoryOrders.data.orders);
        setDeliveringOrders(resDeliveringOrders.data.orders);
        setHistoryOrders(resHistoryOrders.data.orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
      {/* Delivering Orders */}
      <div className='max-h-[650px] bg-white p-4 rounded-lg shadow-md overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Delivering Orders</h2>
        {deliveringOrders.length > 0 ? (
          deliveringOrders.map((order) => (
            <div key={order.order_id} className='border rounded-lg p-4 mb-4 flex items-center gap-4'>
              <img src={order.image_url} alt={order.product_name} className='w-16 h-16 object-cover rounded' />
              <div>
                <h3 className='font-semibold'>{order.product_name}</h3>
                <p className='text-sm text-gray-600'>Quantity: {order.quantity}</p>
                <p className='text-sm text-gray-600'>Price: ${order.sell_price}</p>
                <p className='text-sm text-blue-500'>Status: {order.status}</p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No delivering orders.</p>
        )}
      </div>

      {/* Order History */}
      <div className='max-h-[650px] bg-white p-4 rounded-lg shadow-md overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Order History</h2>
        {historyOrders.length > 0 ? (
          historyOrders.map((order) => (
            <div key={order.order_id} className='border rounded-lg p-4 mb-4'>
              <h3 className='font-semibold'>#{new Date(order.create_date).toLocaleDateString()}</h3>
              <p className='text-sm text-gray-600'>Total Price: ${order.total_price}</p>
              <div className='mt-2'>
                {order.products.map((product, index) => (
                  <div key={index} className='flex items-center gap-3 border-b py-2'>
                    <img src={product.image_url} alt={product.product_name} className='w-12 h-12 object-cover rounded' />
                    <div>
                      <p className='text-sm font-medium'>{product.product_name}</p>
                      <p className='text-xs text-gray-500'>Qty: {product.quantity} | Price: ${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No order history available.</p>
        )}
      </div>
    </div>
  );
}

export default page;
