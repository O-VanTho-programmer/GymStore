import React from 'react'

function OrderDetails() {
  return (
    <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md'>
      <h3 className='text-lg font-semibold mb-4'>Order Details</h3>
      <div className="overflow-x-auto">
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2 border-b border-gray-300 text-left'>Username</th>
              <th className='py-2 border-b border-gray-300 text-left'>Product Name</th>
              <th className='py-2 border-b border-gray-300 text-left'>Quantity</th>
              <th className='py-2 border-b border-gray-300 text-left'>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='py-2 border-b border-gray-300'>john_doe</td>
              <td className='py-2 border-b border-gray-300'>Product 1</td>
              <td className='py-2 border-b border-gray-300'>2</td>
              <td className='py-2 border-b border-gray-300'>$20.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderDetails