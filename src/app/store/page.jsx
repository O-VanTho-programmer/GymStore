'use client';

import BannerSlider from '@/components/BannerSlider/BannerSlider';
import Product from '@/components/Product/Product';
import SubBanner from '@/components/SubBanner/SubBanner';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


function Page() {
    const { currentUser } = useUser();
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_product");
                setProducts(res.data.products);
            } catch (error) {
                console.log("Error fetch product data", error);
            }
        }

        fetchData();
    }, []);

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
        <div className='bg-white shadow-lg'>
            <div className='flex flex-col items-center gap-5'>
                <div className='max-h-[460px] w-[1200px] flex gap-2'>
                    <div className='w-[75%] h-[460px]'>
                        <BannerSlider image_url={IMAGES} title={TITLES} span_btn={SPAN_BTNS} link={LINKS} />
                    </div>

                    <div className='flex-1 h-[460px] flex flex-col gap-2'>
                        {SubBannerImage.map((url, i) => (
                            <SubBanner key={i} image_url={url} className="h-[150px] mb-2" />
                        ))}
                    </div>
                </div>

                <div className='w-[1200px] product_container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                    {products.map((p) => (
                        <Product key={p.id} user={currentUser} productId={p.id} image_url={p.images.split(',')[0]} link={`store/product/${p.id}`} price={p.sell_price} product_name={p.name} rating={p.rating} />
                    ))}
                </div>
            </div>

        </div>

    );
}

export default Page;