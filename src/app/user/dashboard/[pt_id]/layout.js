'use client';

import SideMenuUser from '@/components/SideMenuUser/SideMenuUser';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoNotificationsSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

function DashboardLayout({ children }) {
    const { currentUser } = useUser();
    const [openNotification, setOpenNotification] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`gymstore-production.up.railway.app/api/get_new_request/${currentUser.userId}`);
                setNotifications(res.data.requests);
            } catch (error) {
                console.log("get new request error", error);
            }
        }
    }, [])

    const [activePath, setActivePath] = useState("");
    return (
        <div className='flex justify-end'>
            <div className='h-screen w-1/5 fixed left-0'>
                <SideMenuUser activePath={activePath} setActivePath={setActivePath} />
            </div>
            <main className='w-4/5 ml-1/5 flex flex-col'>
                <div className='header flex p-4 align-middle justify-between'>
                    <h2 className='font-medium text-lg'>Welcome Back!</h2>
                    <div className='flex flex-row items-center gap-5'>

                        <div className='relative'>
                            <IoNotificationsSharp className='' onClick={() => setOpenNotification(!openNotification)} />

                            {openNotification && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                                    <ul className="text-sm text-gray-700">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            Profile
                                        </li>

                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className='relative'>
                            <IoSettingsSharp className='' onClick={() => setOpenSetting(!openSetting)} />

                            {openSetting && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                                    <ul className="text-sm text-gray-700">
                                        <li>
                                            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
    );
}

export default DashboardLayout