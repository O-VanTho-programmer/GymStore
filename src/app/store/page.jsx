'use client';

import BannerSlider from '@/components/BannerSlider/BannerSlider';
import Product from '@/components/Product/Product';
import SubBanner from '@/components/SubBanner/SubBanner';
import getCurrentUser from '@/utils/getCurrentUser';
import React, { useEffect, useState } from 'react';
import { FaAngleDown } from "react-icons/fa";


function Page() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
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

            <ul className="flex space-x-4 text-black justify-center gap-10 py-3 shadow-sm">
                <li className="relative group">
                    <a href="#" className="cursor-pointer group-hover:text-[#f36100] border-b-2 border-transparent group-hover:border-[#f36100] py-2 flex items-center gap-2">Supplements <FaAngleDown /></a>
                    <ul className="absolute hidden group-hover:flex flex-col bg-white shadow-lg z-10 cursor-pointer">
                        <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">Option 1</li>
                        <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">Option 2</li>
                    </ul>
                </li>
                <li className="relative group">
                    <a href="#" className="cursor-pointer group-hover:text-[#f36100] border-b-2 border-transparent group-hover:border-[#f36100] py-2 flex items-center gap-2">Goals & Demand <FaAngleDown /></a>
                    <ul className="absolute hidden group-hover:flex flex-col bg-white shadow-lg z-10 cursor-pointer">
                        <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">Lose Weight</li>
                        <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">Maintain Weight</li>
                        <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">Gain Weight</li>
                    </ul>
                </li>
                <li className="relative group">
                    <a href="#" className="cursor-pointer group-hover:text-[#f36100] border-b-2 border-transparent group-hover:border-[#f36100] py-2 flex items-center gap-2">Calculate Tool <FaAngleDown /></a>
                    <ul className="absolute hidden group-hover:flex flex-col bg-white shadow-lg z-10 cursor-pointer">
                        <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">Calculate BMI</li>
                        <li className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">Calculate TDEE</li>
                    </ul>
                </li>
                {!currentUser && (
                    <li className="relative group">
                        <a href="/login" className="cursor-pointer group-hover:text-[#f36100] border-b-2 border-transparent group-hover:border-[#f36100] py-2 flex">Login</a>
                    </li>
                )}
            </ul>

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
                    {[...Array(5)].map((_, i) => (
                        <Product key={i} image_url={"/product.png"} link={"#"} price={"1.800.000"} product_name={"Whey protein"} rating={4} />
                    ))}
                </div>
            </div>

        </div>

    );
}

export default Page;