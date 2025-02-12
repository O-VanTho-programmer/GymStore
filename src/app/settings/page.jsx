'use client'
import Avata from '@/components/Avata/Avata';
import React, { useEffect, useState } from 'react';

function page() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    
    const [displayName, setDisplayName] = useState('John Doe');
    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Updated Name:', name);
        console.log('Updated Email:', email);
    };

    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleChangePasswordClick = () => {
        setShowChangePassword(true);
    };

    const handleCloseChangePassword = () => {
        setShowChangePassword(false);
    };

    const handleSaveNewPassword = async () => {
        
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 p-6">
            {isClient ? (
                <div className='bg-white p-5 min-w-[900px]'>

                    <div className='flex gap-2 justify-end mb-8 text-lg'>
                        <p className='text-gray-600'>Need to update your public profile?</p>
                        <a className='text-blue-500' href='/my_profile'>Go to edit profile</a>
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                        <div className='flex justify-center'>
                            <Avata width={150} height={150} />
                        </div>

                        <div className="mb-5">
                            <h2 className="border-b border-gray-300 pb-2 mb-5">Personal Information</h2>
                            <label className="block mb-2">
                                Display Name:
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={handleDisplayNameChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Full Name:
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={handleFullNameChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Email:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                />
                            </label>
                        </div>
                        <div>
                            <h2 className="border-b border-gray-300 pb-2">Settings</h2>
                            <button type="submit" className="px-4 py-2 mr-2 bg-blue-500 text-white rounded cursor-pointer">
                                Save Changes
                            </button>
                            <button type="button" onClick={handleChangePasswordClick} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded cursor-pointer">
                                Change Password
                            </button>
                            <button type="button" className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </form>

                    {showChangePassword && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <h2 className="text-xl mb-4">Change Password</h2>
                                <label className="block mb-2">
                                    Current Password:
                                    <input
                                        type="password"
                                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                                    />
                                </label>
                                <label className="block mb-2">
                                    New Password:
                                    <input
                                        type="password"
                                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                                    />
                                </label>
                                <label className="block mb-2">
                                    Confirm Password:
                                    <input
                                        type="password"
                                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                                    />
                                </label>
                                <div className="flex justify-end">
                                    <button onClick={handleCloseChangePassword} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded cursor-pointer">
                                        Cancel
                                    </button>
                                    <button onClick={handleSaveNewPassword} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (<></>)}
        </div>
    );
}

export default page;