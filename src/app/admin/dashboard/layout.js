'use client';

import SideMenu from '@/components/Dashboard/SideMenu/SideMenu';
import React, { useEffect, useState } from 'react'
import { IoNotificationsSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";



function DashboardLayout({ children }) {
    const [isClient, setIsClient] = useState(false)

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
                                <IoSettingsSharp className='' />
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