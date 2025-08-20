'use client';

import SideMenu from '@/components/Dashboard/SideMenu/SideMenu';
import React, { useEffect, useState } from 'react'
import { IoNotificationsSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";



function DashboardLayout({ children }) {
    const [isClient, setIsClient] = useState(false)
    const [openSetting, setOpenSetting] = useState(false);
    
    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    useEffect(() => {
        setIsClient(true)
    }, [])

    const [activePath, setActivePath] = useState("");
    return (
        isClient ? (
            <div>
                <div className='flex justify-end'>
                    <div className='h-screen w-1/5 fixed left-0'>
                        <SideMenu activePath={activePath} setActivePath={setActivePath} />
                    </div>
                    <main className='w-4/5 ml-1/5 flex flex-col'>
                        <div className='header flex p-4 align-middle justify-between'>
                            <h2 className='font-medium text-lg'>Welcome Back!</h2>
                            <div className='flex flex-row items-center gap-5'>
                                <IoNotificationsSharp className='' />
                                <div className='relative'>
                                    <IoSettingsSharp className='' onClick={() => setOpenSetting(!openSetting)} />

                                    {openSetting && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                                            <ul className="text-sm text-gray-700">
                                                <li>
                                                    <a href="/my_profile" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                        Profile
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/store" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                        Store
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/settings" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                        Settings
                                                    </a>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-100 min-h-screen p-6'>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        ) : (<></>)
    );
}

export default DashboardLayout