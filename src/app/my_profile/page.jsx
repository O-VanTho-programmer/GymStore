'use client'

import Avata from '@/components/Avata/Avata';
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import ButtonSmall from '@/components/ButtonSmall/ButtonSmall';
import { PiUploadSimpleFill } from 'react-icons/pi';
import EditAboutMePopup from '@/components/SettingProfile/EditAboutMePopup/EditAboutMePopup';
import EditExpertise from '@/components/SettingProfile/EditExpertise/EditExpertise';
import EditIntroVideo from '@/components/SettingProfile/EditIntroVideo/EditIntroVideo';
import EditClientShowCase from '@/components/SettingProfile/EditClientShowCase/EditClientShowCase';
import axios from 'axios';
import { useUser } from '@/context/UserContext';

function page() {

    const { currentUser } = useUser();

    const [isAboutMePopupOpen, setIsAboutMePopupOpen] = useState(false);
    const [isExpertisePopupOpen, setIsExpertisePopupOpen] = useState(false);
    const [isIntroVideoPopupOpen, setIsIntroVideoPopupOpen] = useState(false);
    const [isClientsPopupOpen, setIsClientsPopupOpen] = useState(false);

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/get_my_profile/${currentUser.userId}`);

                const data = res.data.profile;
                console.log(data);
                setProfile(data);
            } catch (error) {

            }
        }

        fetchData();
    }, [currentUser])

    return (
        <div className='flex flex-col md:flex-row justify-between py-5 px-8 gap-6 bg-gray-100 min-h-screen'>
            {profile && (
                <>
                    <div className='flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 max-w-[320px]'>
                        <div className='flex flex-col items-center'>
                            <Avata width={100} height={100} />
                            <h3 className='font-bold text-2xl mt-4'>{profile.username}</h3>
                            <h3 className='role font-semibold text-lg text-gray-500'>| Personal Trainer |</h3>
                        </div>

                        <div className='w-full'>
                            <h3 className='font-bold text-xl mb-4'>Level Overview</h3>
                            <div className='flex justify-between items-center mb-2'>
                                <h3 className='text-lg text-gray-600 font-medium'>My Level</h3>
                                <span className='text-gray-800'>New</span>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <h3 className='text-lg text-gray-600 font-medium'>Expertise</h3>
                                <span className='text-gray-800'>Body building</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <h3 className='text-lg text-gray-600 font-medium'>Rating</h3>
                                <span className='flex items-center'><FaStar size={15} /> -</span>
                            </div>
                        </div>

                        <a href='/settings' className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-center'>Settings</a>
                    </div>

                    <div className='flex flex-col gap-10 flex-1 bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 max-w-[1070px]'>
                        <div className='border border-gray-300 rounded-lg p-9'>
                            <h2 className='text-2xl font-bold mb-2'>About me</h2>
                            <p className='text-gray-600 mt-5 mb-4'>Hello, my name is Van Tho. I am currently an undergraduate student at an international university. I am actively seeking a freelance position in lead generation. With a strong focus on detail and a passion for helping businesses grow, I am skilled at identifying potential leads, researching market trends, and using data-driven strategies to help clients enhance their outreach efforts.</p>
                            <ButtonSmall
                                onClick={() => setIsAboutMePopupOpen(true)}
                                icon={FaPlus} text={"Edit details"} />
                        </div>

                        {/* Render Popups */}
                        {isAboutMePopupOpen && (
                            <EditAboutMePopup
                                onClose={() => setIsAboutMePopupOpen(false)}
                                onSave={(newAboutMe) => {

                                    setIsAboutMePopupOpen(false);
                                }}
                            />
                        )}

                        <div className='border border-gray-300 rounded-lg p-9'>
                            <h2 className='text-2xl font-bold mb-2'>Your expertise</h2>
                            <p className='text-gray-600 mt-5'>Body building</p>

                            <h2 className='text-xl font-bold mt-4'>Other services</h2>
                            <ul className='flex gap-2 mt-2 mb-4'>
                                <li className='flex items-center border border-gray-300 text-gray-600 p-2 rounded-lg'>
                                    Powerlifting
                                    <a className='border-l border-gray-300 pl-2 ml-2' href='#'><FaMinus /></a>
                                </li>

                                <li className='flex items-center border border-gray-300 text-gray-600 p-2 rounded-lg'>
                                    Yoga
                                    <a className='border-l border-gray-300 pl-2 ml-2' href='#'><FaMinus /></a>
                                </li>
                            </ul>

                            <ButtonSmall
                                onClick={() => setIsExpertisePopupOpen(true)}
                                icon={FaPlus} text={"Update your expertise"} />
                        </div>

                        {/* Render Popups */}
                        {isExpertisePopupOpen && (
                            <EditExpertise
                                onClose={() => setIsExpertisePopupOpen(false)}
                                onSave={(newExpertise) => {

                                    setIsExpertisePopupOpen(false);
                                }}
                            />
                        )}

                        <div className='border border-gray-300 rounded-lg p-9'>
                            <h2 className='text-2xl font-bold mb-2'>Intro video</h2>
                            <p className='text-gray-600 mt-5 mb-4'>No video updated</p>
                            <ButtonSmall
                                onClick={() => setIsIntroVideoPopupOpen(true)}
                                icon={PiUploadSimpleFill} text={"Update intro video"} />
                        </div>

                        {/* Render Popups */}
                        {isIntroVideoPopupOpen && (
                            <EditIntroVideo
                                onClose={() => setIsIntroVideoPopupOpen(false)}
                                onSave={(newIntroVideo) => {
                                    // Update the about me content
                                    setIsIntroVideoPopupOpen(false);
                                }}
                            />
                        )}

                        <div className='border border-gray-300 rounded-lg p-9'>
                            <h2 className='text-2xl font-bold mb-2'>Previous Clients</h2>
                            <p className='text-gray-600 mt-5 mb-4'>No video updated</p>
                            <ButtonSmall
                                onClick={() => setIsClientsPopupOpen(true)}
                                icon={FaPlus} text={"Update your clients achievement"} />
                        </div>

                        {/* Render Popups */}
                        {isClientsPopupOpen && (
                            <EditClientShowCase
                                onClose={() => setIsClientsPopupOpen(false)}
                                onSave={(newClientData) => {
                                    // Update the about me content
                                    setIsClientsPopupOpen(false);
                                }}
                            />
                        )}

                        <div className='border border-gray-300 rounded-lg p-9'>
                            <h2 className='text-2xl font-bold mb-6'>Review from clients</h2>

                            <div className='w-full'>
                                <div className='w-full p-4 flex flex-col gap-4 border border-gray-300 rounded-lg'>
                                    <div>
                                        <h3 className='text-lg font-semibold'>Bao Lam</h3>

                                        <div className='flex gap-1'>
                                            <span className='text-gray-500'>Rating:</span>
                                            <span className='flex items-center'><FaStar size={15} className='text-yellow-300' />4</span>
                                        </div>
                                    </div>

                                    <p>This is the best PT I have ever hired.</p>
                                </div>

                                <div className='w-full p-4 flex flex-col gap-4 border border-gray-300 rounded-lg'>
                                    <div>
                                        <h3 className='text-lg font-semibold'>Bao Lam</h3>

                                        <div className='flex gap-1'>
                                            <span className='text-gray-500'>Rating:</span>
                                            <span className='flex items-center'><FaStar size={15} className='text-yellow-300' />4</span>
                                        </div>
                                    </div>

                                    <p>This is the best PT I have ever hired.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default page;
