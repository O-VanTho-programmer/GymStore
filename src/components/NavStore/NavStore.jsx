"use client";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import SearchBar from "@/components/SearchBar/SearchBar";
import Avata from "../Avata/Avata";
import { useUser } from "@/context/UserContext";
import orderQuantityFetch from "@/utils/getNumberOfOrderedProduct";
import { IoIosArrowDown } from "react-icons/io";

function NavStore() {

    const { currentUser } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [orderQuantity, setOrderQuantity] = useState(0);

    useEffect(() => {
        if (currentUser) {
            const fetchQuantity = async () => {
                const orderQuantity = await orderQuantityFetch(currentUser.userId);
                setOrderQuantity(orderQuantity);
            };

            fetchQuantity();
        }
    })

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const handleHrefCart = () => {
        window.location.href = '/cart';
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div>
            <div className="bg-[#f36100] flex justify-between px-4 sm:px-10 py-3 items-center shadow-md">
                <a href="/" className="text-3xl sm:text-5xl font-extrabold text-white">GYM</a>

                <div className="hidden sm:flex w-full justify-center">
                    <SearchBar />
                </div>

                <div className="flex items-center space-x-4">
                    {/* Shopping Cart Button */}
                    <button onClick={handleHrefCart} className="relative bg-white text-black text-lg sm:text-xl font-semibold w-20 sm:w-28 rounded-2xl h-10 sm:h-14 shadow-md group">
                        <div className="bg-[#f36100] z-10 rounded-xl h-8 sm:h-12 w-2/5 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[80px] sm:group-hover:w-[104px] duration-500 shadow-md">
                            <FaShoppingCart color="white" />
                        </div>
                        <p className="translate-x-5">Cart</p>
                        <label className="absolute z-10 top-0 left-0 text-[#f36100] bg-white rounded-full text-sm w-[20px] h-[20px]">{orderQuantity}</label>
                    </button>

                    {/* User Avatar Dropdown */}
                    <div className="relative hidden sm:block">
                        <button onClick={toggleDropdown} className="flex items-center space-x-3">
                            <Avata image_url={"/Avata.jpg"} width={40} height={40} />
                            <span className="text-white text-xl font-semibold">
                                {currentUser ? currentUser.username : "Account"}
                            </span>
                            <FaAngleDown className="text-white" />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-gray-700 z-20">
                                <a href={currentUser ? "/world" : "/login"} className="block px-4 py-2 text-sm hover:bg-gray-100 text-orange-600">Find Gymbro</a>
                                <a href={currentUser ? "/hire_pt" : "/login"} className="block px-4 py-2 text-sm hover:bg-gray-100">Hire PT</a>
                                <a href={currentUser ? "/find_clients" : "/login"} className="block px-4 py-2 text-sm hover:bg-gray-100">Find Clients</a>
                                <a href={currentUser ? "/my_profile" : "/login"} className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                                <a href={currentUser ? "/settings" : "/login"} className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
                                {currentUser?.isAdmin && (
                                    <a href="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard Admin</a>
                                )}
                                {currentUser && (
                                    <div onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Logout</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="sm:hidden text-white" onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="sm:hidden bg-white shadow-md">
                    <SearchBar />
                    <ul className="flex flex-col space-y-4 text-black py-3">
                        <li><a href="/category" className="block px-4 py-2 hover:text-[#f36100]">category</a></li>
                        <li><a href="/goals" className="block px-4 py-2 hover:text-[#f36100]">Goals & Demand</a></li>
                        <li><a href="/calculate" className="block px-4 py-2 hover:text-[#f36100]">Calculate Tool</a></li>
                        {!currentUser && (
                            <li><a href="/login" className="block px-4 py-2 hover:text-[#f36100]">Login</a></li>
                        )}
                    </ul>
                </div>
            )}

            <ul className="hidden sm:flex space-x-4 text-black justify-center gap-10 py-3 shadow-xl border-b font-semibold text-base">
                <li className="relative group">
                    <a href="#" className="flex items-center gap-1 border-b-2 border-transparent hover:text-[#f36100] hover:border-[#f36100] py-2">
                        Category
                        <IoIosArrowDown />
                    </a>
                    <div className="z-10 absolute left-0 hidden space-y-2 bg-white text-black shadow-lg group-hover:block">
                        <a href="/store/whey_protein" className="block px-4 py-2 text-sm hover:bg-gray-100">Whey Protein</a>
                        <a href="/store/mass_gainer" className="block px-4 py-2 text-sm hover:bg-gray-100">Mass Gainer</a>
                        <a href="/store/protein_bar" className="block px-4 py-2 text-sm hover:bg-gray-100">Protein Bar</a>
                        <a href="/store/clothes" className="block px-4 py-2 text-sm hover:bg-gray-100">Clothes</a>
                        <a href="/store/equipments" className="block px-4 py-2 text-sm hover:bg-gray-100">Equipments</a>
                    </div>
                </li>

                <li className="relative group">
                    <a href="/goals" className="flex items-center gap-1 border-b-2 border-transparent hover:text-[#f36100] hover:border-[#f36100] py-2">
                        Goals & Demand
                        <IoIosArrowDown />
                    </a>
                    <div className="z-10 absolute left-0 hidden space-y-2 bg-white text-black shadow-lg group-hover:block">
                        <a href="/goals/fitness" className="block px-4 py-2 text-sm hover:bg-gray-100">Fitness Goals</a>
                        <a href="/goals/nutrition" className="block px-4 py-2 text-sm hover:bg-gray-100">Nutrition Goals</a>
                        <a href="/goals/mental-health" className="block px-4 py-2 text-sm hover:bg-gray-100">Mental Health</a>
                    </div>
                </li>

                <li className="relative group">
                    <a href="/calculate" className="flex items-center gap-1 border-b-2 border-transparent hover:text-[#f36100] hover:border-[#f36100] py-2">
                        Calculate Tool
                        <IoIosArrowDown />
                    </a>
                    <div className="z-10 absolute left-0 hidden space-y-2 bg-white text-black shadow-lg group-hover:block">
                        <a href="/calculate/bmi" className="block px-4 py-2 text-sm hover:bg-gray-100">BMI Calculator</a>
                        <a href="/calculate/calorie" className="block px-4 py-2 text-sm hover:bg-gray-100">Calorie Calculator</a>
                        <a href="/calculate/macros" className="block px-4 py-2 text-sm hover:bg-gray-100">Macros Calculator</a>
                    </div>
                </li>

                {!currentUser && (
                    <li className="relative group">
                        <a href="/login" className="flex items-center gap-2 border-b-2 border-transparent hover:text-[#f36100] hover:border-[#f36100] py-2">
                            Login
                            <IoIosArrowDown />
                        </a>
                        <div className="z-10 absolute left-0 hidden space-y-2 bg-white text-black shadow-lg group-hover:block">
                            <a href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign In</a>
                            <a href="/signup" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign Up</a>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default NavStore;
