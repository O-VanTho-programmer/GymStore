'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import { MdOutlineLock } from 'react-icons/md';
import { useParams } from 'next/navigation';

function page() {
    const { gig_id, package_id } = useParams();
    const [passedStep, setPassedStep] = useState(1);
    const [option, setOption] = useState(1);
    const [gig, setGig] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resGig = await axios.get(`http://localhost:5000/api/get_user_gig_detail/${gig_id}`);
                const resPackage = await axios.get(`http://localhost:5000/api/get_package/${package_id}`);
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-10 flex gap-10 bg-gray-100 min-h-screen">
            {/* Payment Form Section */}
            <div className="w-2/3 bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
                <div className="flex items-center gap-3 mb-4">
                    <input type="radio" name="payment" checked={option === 1} onChange={() => setOption(1)} className="w-5 h-5" />
                    <span className="font-semibold">Credit & Debit Cards</span>
                    <FaCcVisa className="text-blue-600 text-2xl" />
                    <FaCcMastercard className="text-red-600 text-2xl" />
                </div>
                {option && (
                    <div className="border p-4 rounded-lg space-y-4">
                        <div>
                            <label className="block font-medium">Card Number</label>
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-3 border rounded-lg focus:outline-blue-500"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block font-medium">Expiration Date</label>
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    className="w-full p-3 border rounded-lg focus:outline-blue-500"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block font-medium">Security Code</label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    className="w-full p-3 border rounded-lg focus:outline-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium">Cardholder's Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg focus:outline-blue-500"
                                placeholder="As written on card"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="w-5 h-5" />
                            <span>Save this card for future payments</span>
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-3 mt-5">
                    <input type="radio" name="payment" checked={option === 2} onChange={() => setOption(2)} className="w-5 h-5" />
                    <span className="font-semibold">PayPal</span>
                    <FaCcPaypal className="text-blue-600 text-2xl" />
                </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src="/path/to/image.jpg"
                        alt="Gig Thumbnail"
                        className="w-16 h-16 rounded-md"
                    />
                    <div>
                        <p className="font-medium">do b2b lead generation, email address by using LinkedIn</p>
                        <p className="text-gray-500 text-sm">Basic - US$15</p>
                    </div>
                </div>
                <ul className="text-sm space-y-1 mb-4">
                    <li className="flex items-center gap-2">
                        <IoIosCheckmarkCircle className="text-green-600" /> 50 leads included
                    </li>
                    <li className="flex items-center gap-2">
                        <IoIosCheckmarkCircle className="text-green-600" /> 4 hours of work
                    </li>
                    <li className="flex items-center gap-2">
                        <IoIosCheckmarkCircle className="text-green-600" /> Formatting & clean-up
                    </li>
                </ul>
                <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                        <span>Service fee</span>
                        <span>US$3.83</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold mt-2">
                        <span>Total</span>
                        <span>US$18.83</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Total delivery time: 2 days</p>
                    <button className="w-full bg-black text-white py-3 rounded-lg mt-4 font-medium hover:bg-gray-800">
                        Confirm & Pay
                    </button>
                    <div className="flex items-center justify-center text-gray-500 text-sm mt-3">
                        <MdOutlineLock className="mr-1" /> SSL Secure Payment
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
