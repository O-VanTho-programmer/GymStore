'use client';
import BannerSlider from '@/components/BannerSlider/BannerSlider';
import Product from '@/components/Product/Product';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function page() {
  const { currentUser } = useUser();
  const { category } = useParams();
  const [categoryDetail, setCategoryDetail] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const res = await axios.get(`gymstore-production.up.railway.app/api/get_category_detail/${category}`);

        const data = res.data.categoryDetail[0];
        setImageArray(data.images ? data.images.split(',') : []);

        setCategoryDetail(data || null);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    fetchDataCategory();
  }, [category]);

  useEffect(() => {
    if (categoryDetail?.id) {
      const fetchDataProduct = async () => {
        try {
          const res = await axios.get(`gymstore-production.up.railway.app/api/get_product_by_category/${categoryDetail.id}`);
          console.log(res.data.products);
          setProducts(res.data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchDataProduct();
    }
  }, [categoryDetail]);

  return (
    <div className='bg-white shadow-lg'>
      <div className='flex flex-col items-center gap-5'>
        {categoryDetail ? (
          <>
            <div className='flex flex-col text-center'>
              <h1 className='text-2xl font-bold my-5'>{categoryDetail.name}</h1>
              <p>{categoryDetail.description}</p>
            </div>
            <div className="w-full max-w-[1200px] h-[260px] sm:h-[400px] lg:h-[500px] xl:h-[560px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
              <BannerSlider image_url={imageArray} />
            </div>

            <div className='w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4'>
              {products.map((p) => (
                <Product
                  key={p.id}
                  user={currentUser}
                  productId={p.id}
                  image_url={p.images?.split(',')[0] || ''}
                  link={`store/product/${p.id}`}
                  price={p.sell_price}
                  product_name={p.name}
                  rating={p.rating}
                />
              ))}
            </div>
          </>
        ) : (
          <p className='text-gray-500 text-lg mt-10'>Loading category...</p>
        )}
      </div>
    </div>
  );
}

export default page;
