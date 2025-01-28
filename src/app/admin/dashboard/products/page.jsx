import CategoryTableAdmin from '@/components/Dashboard/ProductSection/CategoryTableAdmin/CategoryTableAdmin'
import ChartLine from '@/components/ChartLine/ChartLine'
import ProductTableAdmin from '@/components/Dashboard/ProductSection/ProductTableAdmin/ProductTableAdmin'
import React from 'react'
import TransactionTable from '@/components/Dashboard/ProductSection/TransactionTable/TransactionTable'

function page() {
  return (
    <div className='flex flex-col gap-5 bg-gray-100 min-h-screen'>
      <div className='w-full flex flex-wrap lg:flex-nowrap gap-4'>
        <div className='flex flex-col items-center gap-4 w-full lg:w-1/5'>
          <div className='flex-col flex items-center p-4 border border-gray-300 bg-white shadow-md rounded-md w-full'>
            <h3 className='text-lg font-semibold'>Revenue</h3>
            <span className='text-lg md:text-xl lg:text-2xl text-green-600 h-full flex items-center justify-center text-center whitespace-normal md:whitespace-nowrap'>1.002.500 vnd</span>
          </div>

          <div className='flex flex-col items-center p-4 border border-gray-300 bg-white shadow-md rounded-md w-full'>
            <h3 className='text-lg font-semibold whitespace-normal md:whitespace-nowrap'>Products sold</h3>
            <span className='text-lg md:text-xl lg:text-2xl text-blue-600 h-full flex items-center text-center'>884</span>
          </div>
        </div>
        <div className='w-full lg:w-4/5'>
          <ChartLine />
        </div>
      </div>
      <div className='p-4 border border-gray-300 bg-white shadow-md rounded-md w-full md:w-auto'>
        <TransactionTable />

      </div>

      <div className='flex flex-wrap gap-4'>
        <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md w-full md:w-auto'>
          <ProductTableAdmin />
        </div>

        <div className='flex-0 p-4 border border-gray-300 bg-white shadow-md rounded-md w-full md:w-auto'>
          <CategoryTableAdmin />
        </div>
      </div>
    </div>
  )
}

export default page