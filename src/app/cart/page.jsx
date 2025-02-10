'use client';
import ButtonNumber from '@/components/ButtonNumber/ButtonNumber';
import { IoMdClose } from "react-icons/io";
import { useUser } from '@/context/UserContext';
import orderQuantityFetch from '@/utils/getNumberOfOrderedProduct';
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Page() {
  const { currentUser } = useUser();
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const fetchQuantity = async () => {
        const orderQuantity = await orderQuantityFetch(currentUser.userId);
        setOrderQuantity(orderQuantity);
      };

      fetchQuantity();
    }

    const fetchData = async () => {
      try {
        const res = await axios.post(`http://localhost:5000/api/get_order_detail/`, { userId: currentUser.userId });
        setOrderedProducts(res.data.orderDetails);
        setTotalPrice(res.data.totalPrice);
      } catch (error) {
        console.log("Error fetching order details");
      }
    };

    fetchData();
  }, [currentUser]);

  const updateQuantityDB = async ({ newQuantity, productId, orderId }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/update_quantity_item', {
        newQuantity,
        productId,
        orderId
      });

      if (res.data.success) {
        window.location.reload();
      } else {
        console.error("Failed to update quantity:", res.data.message);
      }
    } catch (error) {
      console.error("Error updating quantity in DB:", error);
    }
  }

  const deleteItem = async ({productId, orderId}) => {
    try {
      const res = await axios.post('http://localhost:5000/api/delete_ordered_product',{
        productId,
        orderId
      })
    } catch (error) {
      
    }
  }

  return (
    <div className='flex flex-col md:flex-row p-4'>
      <div className='w-full md:w-2/3 p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold'>Shopping Cart</h1>
          <span className='text-[#f36100] text-sm'>{orderQuantity} item(s)</span>
        </div>

        <div className='space-y-4'>
          {orderedProducts.length === 0 && (
            <div className='w-full h-[100px] text-gray-400 text-xl flex justify-center items-center '>
              Your cart is empty
            </div>
          )}
          {orderedProducts.map((od, index) => (
            <div key={index} className='p-4 border rounded shadow-sm flex items-center justify-between bg-white hover:bg-gray-50 transition duration-200'>
              <img className='w-[90px] h-[90px] object-cover rounded' src={od.product_image} alt={od.product_name} />
              <div className='flex-1 ml-4'>
                <p className='font-bold text-lg'>{od.product_name}</p>
                <p className='text-gray-500'>{od.price}</p>
              </div>
              <ButtonNumber
                quantity={od.quantity}
                setQuantityDB={(newQuantity) => updateQuantityDB({
                  newQuantity,
                  productId: od.product_id,
                  orderId: od.order_id
                })}
              />
              <p className='ml-5 font-semibold'>{od.total_price_per}</p>
              <IoMdClose onClick={() => deleteItem({productId: od.product_id, orderId: od.order_id})} className='cursor-pointer justify-self-end ml-5' size={18} />
            </div>
          ))}
        </div>

        <a href='/store' className='text-base mt-10 text-gray-600 flex items-center'> <IoIosArrowRoundBack />Back to store</a>
      </div>

      <div className='w-full md:w-1/3 p-4 bg-gray-100 rounded shadow-md'>
        <h1 className='text-xl font-bold mb-4'>Summary</h1>

        <div className='flex justify-between mb-4'>
          <span>Items: {orderQuantity}</span>
          <span>{totalPrice}</span>
        </div>

        <label className='block mb-4'>
          <div className='flex justify-between'>
            <span className='block text-sm font-medium'>SHIPPING</span>
            <span>VND</span>
          </div>
          <select className='mt-1 block w-full p-2 border rounded'>
            <option defaultChecked value={'COD'}>Cash On Delivery</option>
          </select>
        </label>

        <label className='block mb-4'>
          <span className='block text-sm font-medium'>GIVE CODE</span>
          <input
            placeholder='ENTER YOUR CODE'
            className='mt-1 block w-full p-2 border rounded text-base text-[#555] outline-none focus:border-[#007bff] focus:shadow-outline'
          />
        </label>

        <div className='flex justify-between font-bold text-lg mb-4'>
          <label>TOTAL PRICE</label>
          <span className='text-[#f36100]'>{totalPrice}</span>
        </div>

        <button className='w-full p-4 bg-[#f36100] text-white font-bold rounded hover:bg-[#d94e00]'>
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default Page;
