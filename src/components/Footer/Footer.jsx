import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoMail } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="footer py-8 bg-gray-800 text-white">
            <div className="footer-content px-8 flex flex-col md:flex-row justify-between items-center md:items-start">
                <div className='flex flex-col justify-between items-center mb-8 md:mb-0'>
                    <div className='rounded-full p-2 border-[6px] border-white w-[130px] flex justify-center items-center'>
                        <img src='/logo.png' className='object-cover'/>
                    </div>
                    <p>&copy; 2023 GymStore. All rights reserved.</p>
                </div>

                <div className='text-white mb-8 md:mb-0'>
                    <h1 className='text-2xl font-bold mb-4 md:mb-10'>Keep Connected</h1>
                    <ul className='text-gray-200'>
                        <li className='flex items-center mb-2'>
                            <FaFacebook className='mr-2 text-blue-600 text-xl'/> 
                            <a href=''>Like us on Facebook</a>
                        </li>
                        <li className='flex items-center mb-2'>
                            <RiInstagramFill className='mr-2 text-pink-500 text-xl'/> 
                            <a href=''>Follow us on Instagram</a>
                        </li>
                        <li className='flex items-center mb-2'>
                            <AiFillTwitterCircle className='mr-2 text-blue-400 text-xl'/> 
                            <a href=''>Follow us on Twitter</a>
                        </li>
                    </ul>
                </div>

                <div className='text-white'>
                    <h1 className='text-2xl font-bold mb-4 md:mb-10'>Contact Information</h1>
                    <ul className='text-gray-200'>
                        <li className='flex items-center mb-2'>
                            <FaBuilding className='mr-2 text-xl'/> 
                            <span>The company name</span>
                        </li>
                        <li className='flex items-center mb-2'>
                            <IoMdPhonePortrait className='mr-2 text-xl'/> 
                            <span>123456789</span>
                        </li>
                        <li className='flex items-center mb-2'>
                            <IoMail className='mr-2 text-xl'/> 
                            <span>contact@example.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;