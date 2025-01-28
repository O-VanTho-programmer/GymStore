'use client'

import Avata from '@/components/Avata/Avata';
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import React from 'react';

function page() {
    return (
        <div className='flex flex-col md:flex-row justify-between py-5 px-8 gap-6 bg-gray-100 min-h-screen'>
            <div className='flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 max-w-[320px]'>
                <div className='flex flex-col items-center'>
                    <Avata width={100} height={100} />
                    <h3 className='font-bold text-2xl mt-4'>Van Tho</h3>
                    <h3 className='role font-semibold text-lg text-gray-500'>| Personal Trainer |</h3>
                </div>

                <div className='w-full'>
                    <h3 className='font-bold text-xl mb-4'>Level Overview</h3>
                    <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-lg text-gray-600 font-medium'>My Level</h3>
                        <span className='text-gray-800'>New</span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-lg text-gray-600 font-medium'>Expertise</h3>
                        <span className='text-gray-800'>Body building</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-lg text-gray-600 font-medium'>Rating</h3>
                        <span className='flex items-center'><FaStar size={15} /> -</span>
                    </div>
                </div>

                <a href='/settings' className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-center'>Settings</a>
            </div>

            <div className='flex flex-col gap-6 flex-1 bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 max-w-[1070px]'>
                <div>
                    <h2 className='text-3xl font-bold mb-2'>Welcome, VanTho</h2>
                    <p className='text-gray-600'>Here is your profile overview and recent activities.</p>
                </div>

                <div className='border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition duration-300'>
                    <a href='#' className='flex items-center justify-between'>
                        <div>
                            <h3 className='font-medium text-lg'>Shopping History</h3>
                            <span className='text-gray-400'>Check what products you bought</span>
                        </div>

                        <MdKeyboardArrowRight size={24} className='text-gray-400 hover:text-gray-600 transition duration-300' />
                    </a>
                </div>

                <div className='border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition duration-300'>
                    <a href='#' className='flex items-center justify-between'>
                        <div>
                            <h3 className='font-medium text-lg'>Your Clients</h3>
                            <span className='text-gray-400'>Keep track of your clients</span>
                        </div>

                        <MdKeyboardArrowRight size={24} className='text-gray-400 hover:text-gray-600 transition duration-300' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default page;
