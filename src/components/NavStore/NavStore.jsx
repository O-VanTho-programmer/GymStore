import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from '@/components/SearchBar/SearchBar';
import Avata from '../Avata/Avata';

function NavStore() {
    return (
        <div className="bg-[#f36100] flex justify-between px-10 py-3 items-center shadow-md">
            <a href='/' className="text-5xl font-extrabold text-white">GYM</a>

            <SearchBar />

            <div className="relative group">
                <button className="flex items-center space-x-3 focus:outline-none">
                    <Avata width={40} height={40} />

                    <span className="text-white text-xl font-semibold">Account</span>
                </button>
                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block text-gray-700">
                    <a href="/my_profile" className="block px-4 py-2 text-sm hover:bg-gray-100 text-orange-600">Find Gymbro</a>
                    <a href="/hire_pt" className="block px-4 py-2 text-sm hover:bg-gray-100">Hire PT</a>
                    <a href="/find_clients" className="block px-4 py-2 text-sm hover:bg-gray-100">Find Clients</a>
                    <a href="/my_profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                    <a href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
                    <a href="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard Admin</a>
                    <a href="/logout" className="block px-4 py-2 text-sm hover:bg-gray-100">Logout</a>
                </div>
            </div>

            <button
                className="bg-white text-center w-28 rounded-2xl h-14 relative text-black text-xl font-semibold group shadow-md"
                type="button"
            >
                <div
                    className="bg-[#f36100] rounded-xl h-12 w-2/5 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[104px] z-10 duration-500 shadow-md"
                >
                    <FaShoppingCart color='white' />
                </div>
                <p className="translate-x-5">Cart</p>
            </button>
        </div>
    )
}

export default NavStore