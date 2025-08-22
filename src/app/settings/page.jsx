'use client'
import Avata from '@/components/Avata/Avata';
import InformMessage from '@/components/InformMessage/InformMessage';
import { useUser } from '@/context/UserContext';
import axios from "axios";
import React, { useEffect, useState } from 'react';

function Page() {
    const { currentUser } = useUser();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [phone, setPhone] = useState('');
    const [addresses, setAddresses] = useState(['']);
    const [isPT, setIsPT] = useState(false);
    const [bio, setBio] = useState("");
    const [certifications, setCertifications] = useState("");
    const [experience, setExperience] = useState("");
    const [contactInfor, setContactInfor] = useState("");
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [pending, setPending] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [hasChanges, setHasChanges] = useState(false);

    const showMessage = (message) => {
        setSuccessMessage(message);

        setTimeout(() => setSuccessMessage(''), 1000);
    }

    useEffect(() => {
        const fetcUserAddress = async () => {
            try {
                const res = await axios.get(`https://gymstore-production.up.railway.app/api/get_user_address/${currentUser.userId}`)
                setAddresses(res.data.addresses);
                console.log(res.data.addresses)
                
            } catch (error) {

            }
        }

        if (currentUser) {
            fetcUserAddress();
            setUsername(currentUser.username);
            setEmail(currentUser.email);
            setPhone(currentUser.phone || '');
            setImage(currentUser.avatar);

        }
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        if (username !== currentUser.username || email !== currentUser.email) {
            setHasChanges(true);
        }
    }, [username, email, image]);

    const handleSaveNewPassword = async () => {
        if (newPassword === confirmNewPassword) {
            setPending(true);
            try {
                await axios.post('https://gymstore-production.up.railway.app/api/change_password', {
                    userId: currentUser.userId,
                    currentPassword,
                    newPassword
                });
                showMessage('Password changed successfully');
            } catch (error) {
                console.log('Error with change password', error);
            } finally {
                setPending(false);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);
        try {
            await axios.post('https://gymstore-production.up.railway.app/api/edit_profile', {
                userId: currentUser.userId,
                username,
                email,
                phone,
                addresses,
                image,
            });
            showMessage('Profile updated successfully');
            setHasChanges(false);
        } catch (error) {
            console.error("Error when saving: ", error);
        } finally {
            setPending(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const handleSendApplication = async () => {
        setPending(true);
        try {
            const res = await axios.post('https://gymstore-production.up.railway.app/api/send_apply', {
                userId: currentUser.userId,
                bio,
                certifications,
                year_of_exp: experience,
                contact_infor: contactInfor,
            });

            showMessage(res.data.message);
        } catch (error) {
            console.error("Error when sending application: ", error);
        } finally {
            setPending(false);
        }
    };

    const addAddress = () => setAddresses([...addresses, '']);
    const removeAddress = (index) => setAddresses(addresses.filter((_, i) => i !== index));
    const updateAddress = (index, value) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
    };

    return (
        <div className="flex flex-col items-center bg-gray-50 p-6 min-h-screen">
            <div className="bg-white p-6 w-full max-w-3xl rounded-lg shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">Need to update your public profile?</p>
                    <a className="text-blue-500 hover:underline" href="/my_profile">Edit Profile</a>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center">
                        <div className="relative w-36 h-36">
                            <Avata width={144} height={144} image_url={image || "/guest_avatar.png"} />
                            <input type="file" accept="image/*" className="hidden" id="avatarInput" onChange={handleImageChange} />
                            <label htmlFor="avatarInput" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2-2L13.232 9.232m-4.536 5.536a2.5 2.5 0 103.536 3.536l7.071-7.071a2.5 2.5 0 00-3.536-3.536L9.232 14.768z" />
                                </svg>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Personal Information</h2>
                        <label className="block">
                            <span className="text-gray-700">Username:</span>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Email:</span>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300" />
                        </label>
                        <label className='block'>
                            Phone Number:
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded" />
                        </label>

                        <div>
                            <p className="font-medium">Addresses:</p>
                            {addresses?.map((address, idx) => (
                                <div key={idx} className="flex gap-2 mb-2">
                                    <input type="text" value={address.address} onChange={(e) => updateAddress(idx, e.target.value)} className="w-full p-2 border rounded" />
                                    {addresses.length > 1 && <button type="button" onClick={() => removeAddress(idx)} className="bg-red-500 text-white px-2 py-1 rounded">✕</button>}
                                </div>
                            ))}
                            <button type="button" onClick={addAddress} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">+ Add Address</button>
                        </div>
                    </div>

                    <div className="flex justify-between mt-5">
                        <div>
                            <button type="button" onClick={() => setShowChangePassword(true)} className="px-4 py-2 mr-2 bg-gray-600 text-white rounded cursor-pointer">
                                Change Password
                            </button>
                            <button type="submit" className={`px-4 py-2 ${hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'} text-white rounded-lg transition`} disabled={!hasChanges || pending}>
                                {pending ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                        <button type="button" onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Logout</button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 w-full max-w-3xl mt-6 rounded-lg shadow-xl">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">Become a Personal Trainer</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={isPT} onChange={() => setIsPT(!isPT)} />
                        <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-7 after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                </div>

                {isPT && (
                    <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 mt-4 transition-all duration-300">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Trainer Information</h2>

                        <label className="block mb-3">
                            <span className="text-gray-700">Bio:</span>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2 mt-1 border rounded resize-none focus:ring focus:ring-blue-300" rows="3" placeholder="Tell us about yourself..."></textarea>
                        </label>

                        <label className="block mb-3">
                            <span className="text-gray-700">Certifications:</span>
                            <input type="text" value={certifications} onChange={(e) => setCertifications(e.target.value)} className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300" placeholder="E.g., ACE, NASM, ISSA" />
                        </label>

                        <label className="block mb-3">
                            <span className="text-gray-700">Years of Experience:</span>
                            <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300" placeholder="E.g., 5" />
                        </label>

                        <label className="block mb-3">
                            <span className="text-gray-700">Contact Information:</span>
                            <input type="text" value={contactInfor} onChange={(e) => setContactInfor(e.target.value)} className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300" placeholder="Phone Number, Zalo, Facebook,..." />
                        </label>

                        <button onClick={handleSendApplication} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" disabled={pending}>
                            {pending ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                )}
            </div>
            {showChangePassword && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">Change Password</h2>
                        <label className="block mb-2">
                            Current Password:
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </label>
                        <label className="block mb-2">
                            New Password:
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </label>
                        <label className="block mb-2">
                            Confirm Password:
                            <input
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                type="password"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </label>
                        <div className="flex justify-end">
                            <button onClick={() => setShowChangePassword(false)} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded cursor-pointer">
                                Cancel
                            </button>
                            <button onClick={handleSaveNewPassword} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer" disabled={pending}>
                                {pending ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {successMessage &&
                <InformMessage message={successMessage} />
            }
        </div>
    );
}

export default Page;
