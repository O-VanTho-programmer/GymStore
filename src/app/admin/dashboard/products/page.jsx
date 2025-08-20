'use client';
import CategoryTableAdmin from '@/components/Dashboard/ProductSection/CategoryTableAdmin/CategoryTableAdmin'
import ChartLine from '@/components/ChartLine/ChartLine'
import ProductTableAdmin from '@/components/Dashboard/ProductSection/ProductTableAdmin/ProductTableAdmin'
import React, { useEffect, useState } from 'react'
import TransactionTable from '@/components/Dashboard/ProductSection/TransactionTable/TransactionTable'
import axios from 'axios'
import LoadingWrapper from '@/components/Loading/LoadingWrapper';
import Loading from '@/components/Loading/Loading';

function page() {
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/get_transaction');
        setTransaction(res.data.transactions);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <LoadingWrapper loadingText="Loading admin dashboard...">
      <div className='flex flex-col gap-5 bg-gray-100 min-h-screen'>
        {isLoading ? (
          <div className='flex justify-center items-center py-20'>
            <Loading size="large" text="Loading transactions..." />
          </div>
        ) : (
          <>
            <ChartLine transaction={transaction} />
            <div className='p-4 border border-gray-300 bg-white shadow-md rounded-md w-full md:w-auto'>
              <TransactionTable transaction={transaction} />
            </div>

            <div className='flex flex-wrap gap-4'>
              <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md w-full md:w-auto'>
                <ProductTableAdmin />
              </div>

              <div className='flex-0 p-4 border border-gray-300 bg-white shadow-md rounded-md w-full md:w-auto'>
                <CategoryTableAdmin />
              </div>
            </div>
          </>
        )}
      </div>
    </LoadingWrapper>
  )
}

export default page