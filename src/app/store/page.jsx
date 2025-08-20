'use client';

import BannerSlider from '@/components/BannerSlider/BannerSlider';
import Product from '@/components/Product/Product';
import SubBanner from '@/components/SubBanner/SubBanner';
import { useSearch } from '@/context/SearchContext';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingWrapper from '@/components/Loading/LoadingWrapper';
import Loading from '@/components/Loading/Loading';


function Page() {
    const { currentUser } = useUser();
    const { nameSearch, enteredSearch, setEnterSearch } = useSearch();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/get_product/${nameSearch}`);
                setProducts(res.data.products);
            } catch (error) {
                console.log("Error fetch product data", error);
            } finally {
                setEnterSearch(false);
                setIsLoading(false);
            }
        }
        if (enteredSearch) {
            fetchData();
        }


    }, [enteredSearch]);

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const IMAGES = ["/banner_sup3.jpg", "banner_sup1.jpg"];
    const TITLES = ['', '', ''];
    const SPAN_BTNS = ['', '', ''];
    const LINKS = ['/pt', '/store', '/find_friends'];

    const SubBannerImage = ["/sub_banner1.jpg", "/sub_banner2.jpg", "/sub_banner3.jpg"];


    return (
        <LoadingWrapper loadingText="Loading store...">
            <div className='bg-white shadow-lg'>
                <div className='flex flex-col items-center gap-5'>
                    <div className='max-h-[460px] w-full flex gap-2'>
                        <div className='w-[75%] h-[460px]'>
                            <BannerSlider image_url={IMAGES} title={TITLES} span_btn={SPAN_BTNS} link={LINKS} />
                        </div>

                        <div className='flex-1 h-[460px] flex flex-col gap-2'>
                            {SubBannerImage.map((url, i) => (
                                <SubBanner key={i} image_url={url} className="h-[150px] mb-2" />
                            ))}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className='w-full flex justify-center items-center py-20'>
                            <Loading size="large" text="Loading products..." />
                        </div>
                    ) : (
                        <div className='w-full product_container grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-4 p-1 sm:px-5 md:px-10 py-10'>
                            {products.map((p) => (
                                <Product key={p.id} user={currentUser} productId={p.id} image_url={p.images.split(',')[0]} link={`store/product/${p.id}`} price={p.sell_price} product_name={p.name} rating={p.rating} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </LoadingWrapper>
    );
}

export default Page;