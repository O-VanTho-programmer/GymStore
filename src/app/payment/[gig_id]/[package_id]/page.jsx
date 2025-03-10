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
    const [profile, setProfile] = useState([]);
    const [gig, setGig] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resGig = await axios.get(`http://localhost:5000/api/get_user_gig_detail/${gig_id}`);
                const resPackage = await axios.get(`http://localhost:5000/api/get_package/${package_id}`);

                console.log(resGig.data.profile);
                console.log(resGig.data.gig)
                console.log(resPackage.data.package[0])

                setProfile(resGig.data.profile)
                setGig(resGig.data.gig)
                setSelectedPackage(resPackage.data.package[0])
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
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={gig.image_url}
                        alt="Gig Thumbnail"
                        className="w-[165px] h-[125px] rounded-md"
                    />
                    <p className="line-clamp-5">{gig.description}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="font-medium">{gig.title}</p>
                    <p className="text-gray-500">{selectedPackage.title} - {selectedPackage.price} vnd</p>
                </div>
                <p className='whitespace-pre-line py-4'>
                    {selectedPackage.description}
                </p>
                <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold mt-2">
                        <span>Total</span>
                        <span>{selectedPackage.price}</span>
                    </div>
                    <button className="w-full bg-black text-white py-3 rounded-lg mt-4 font-medium hover:bg-gray-800">
                        Confirm & Pay
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default page;
