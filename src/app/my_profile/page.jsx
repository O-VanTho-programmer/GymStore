'use client'

import Avata from '@/components/Avata/Avata';
import { MdDashboard, MdKeyboardArrowRight } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
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
import InformMessage from '@/components/InformMessage/InformMessage';
import FitGig from '@/components/FitGig/FitGig';
import Review from '@/components/Review/Review';

function ProfilePage() {

    const { currentUser } = useUser();
    const [isAboutMePopupOpen, setIsAboutMePopupOpen] = useState(false);
    const [isExpertisePopupOpen, setIsExpertisePopupOpen] = useState(false);
    const [isIntroVideoPopupOpen, setIsIntroVideoPopupOpen] = useState(false);
    const [isClientsPopupOpen, setIsClientsPopupOpen] = useState(false);
    const [isGigPopupOpen, setIsGigPopupOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [gigs, setGigs] = useState(null);
    const [message, setMessage] = useState("");

    const showMessage = (message) => {
        setMessage(message);

        setTimeout(() => setMessage(''), 1000);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`gymstore-production.up.railway.app/api/get_my_profile/${currentUser.userId}`);

                setProfile(res.data.profile);
                setGigs(res.data.gigs);

            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    const handleEditAboutMe = async (newAboutMe) => {
        if (newAboutMe !== profile.about_me) {
            setProfile({ ...profile, about_me: newAboutMe });
            try {
                const res = await axios.post(`gymstore-production.up.railway.app/api/edit_about_me`, {
                    profileId: profile.id,
                    content: newAboutMe
                })

                showMessage(res.data.message);
                setIsAboutMePopupOpen(false);

            } catch (error) {

            }
        }
    }

    if (!profile) {
        return <div className="flex justify-center items-center h-screen text-gray-600">Loading profile...</div>;
    }

    return (
        <div className='flex flex-col md:flex-row justify-between py-5 px-4 md:px-8 gap-6 bg-gray-100 min-h-screen'>
            {/* Left Sidebar - Profile Overview */}
            <div className='flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 max-w-[320px]'>
                <div className='flex flex-col items-center'>
                    <Avata width={100} height={100} image_url={currentUser?.avatar || "/guest_avatar.png"} />
                    <h3 className='font-bold text-2xl mt-4'>{profile.username}</h3>
                    {profile.is_personal_trainer && (
                        <h3 className='role font-semibold text-lg text-gray-500'>{profile.is_personal_trainer ? "| Personal Trainer |" : "| Client |"}</h3>
                    )}
                </div>

                <div className='w-full'>
                    <h3 className='font-bold text-xl mb-4'>Level Overview</h3>
                    <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-lg text-gray-600 font-medium'>My Level</h3>
                        <span className='text-gray-800'>{profile.level || "New"}</span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-lg text-gray-600 font-medium'>Expertise</h3>
                        <span className='text-gray-800'>{profile?.expertise_list[0]?.expertise || "No expertise listed"}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-lg text-gray-600 font-medium'>Rating</h3>
                        <span className='flex items-center font-bold gap-1'><FaStar size={15} className="text-yellow-300" /> {profile.rating || "-"}</span>
                    </div>
                </div>

                <a href='/settings' className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-center'>Settings</a>
            </div>

            {/* Right Section - Profile Details */}
            <div className='flex flex-col gap-10 flex-1 bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 max-w-[1070px]'>
                
                <div className='border-2 border-gray-400 p-6 md:p-9'>
                    <h2 className='text-2xl font-bold mb-2'>Dashboard</h2>
                    <div className='text-gray-600 my-4 whitespace-pre-line'>
                        <h3 className='text-lg text-black'>Where you can:</h3>
                        <ul className='list-disc list-inside'>
                            <li>Keep tracking your shopping history</li>
                            <li>See your promotion as PT</li>
                        </ul>
                    </div>
                    <ButtonSmall onClick={() => window.location.href=`/user/dashboard/${currentUser.userId}`} icon={MdDashboard} text={"Go to Dashboard"} />

                </div>

                {/* About Me Section */}
                <div className='border-2 border-gray-400 rounded-lg p-6 md:p-9'>
                    <h2 className='text-2xl font-bold mb-2'>About me</h2>
                    <p className='text-gray-600 mt-5 mb-4'>{profile.about_me || "No description provided"}</p>
                    <ButtonSmall onClick={() => setIsAboutMePopupOpen(true)} icon={FaPlus} text={"Edit details"} />
                </div>

                {/* Expertise Section */}
                <div className='border-2 border-gray-400 rounded-lg p-6 md:p-9'>
                    <h2 className='text-2xl font-bold mb-2'>My expertise</h2>
                    <div className='flex flex-wrap gap-2'>
                        {profile.expertise_list ? (
                            profile.expertise_list.map((exp, i) => {
                                const isMainExpertise = i === 0;
                                return (
                                    <p
                                        key={exp.id}
                                        className={`
                            ${isMainExpertise ? "border-2 border-orange-600 text-orange-600 font-semibold text-sm" : "border border-gray-300 text-gray-600 text-sm"} 
                            rounded-3xl p-2 mt-2 mb-4
                        `}
                                    >
                                        {exp.expertise}
                                    </p>
                                );
                            })
                        ) : (
                            <p className='text-gray-600 mt-5 mb-4'>No expertise listed</p>
                        )}
                    </div>

                    <ButtonSmall onClick={() => setIsExpertisePopupOpen(true)} icon={FaPlus} text={"Update your expertise"} />
                </div>

                {/* Intro Video Section */}
                <div className='border-2 border-gray-400 rounded-lg p-6 md:p-9'>
                    <h2 className='text-2xl font-bold mb-2'>Intro video</h2>
                    {profile.video_url ? (
                        <video controls className="w-full rounded-lg my-4">
                            <source src={profile.video_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <p className='text-gray-600 mt-5 mb-4'>No video updated</p>
                    )}
                    <ButtonSmall onClick={() => setIsIntroVideoPopupOpen(true)} icon={PiUploadSimpleFill} text={"Update intro video"} />
                </div>

                {/* Previous Clients Section */}
                <div className='border-2 border-gray-400 rounded-lg p-6 md:p-9'>
                    <h2 className='text-2xl font-bold mb-2'>Previous Clients</h2>
                    <p className='text-gray-600 mt-5 mb-4'>No clients listed</p>
                    <ButtonSmall onClick={() => setIsClientsPopupOpen(true)} icon={FaPlus} text={"Update your clients achievement"} />
                </div>

                {/* Reviews Section */}
                <div className='border-2 border-gray-400 rounded-lg p-6 md:p-9'>
                    <h2 className='text-2xl font-bold mb-6'>Review from clients</h2>
                    {/* Placeholder review data */}
                    <Review avatar={""} username={'Bao Lam'} rating={4} comment={"Nice training"} />
                </div>

                <div className='border-2 border-gray-400 rounded-lg p-6 md:p-9'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-bold mb-6'>Your FitGigs</h2>
                        <ButtonSmall onClick={() => { window.location.href = `my_profile/create_gig/${profile.id}` }} text={"Add gigs"} />
                    </div>

                    <div className='flex overflow-x-scroll gap-2'>
                        {gigs && gigs.map((g) => {
                            return (
                                <div key={g.id} className=' shadow-xl p-2'>
                                    <FitGig gig={g} profile={profile} />
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>

            {/* Popups Section */}
            {isAboutMePopupOpen && (
                <EditAboutMePopup
                    onClose={() => setIsAboutMePopupOpen(false)}
                    onSave={(newAboutMe) => handleEditAboutMe(newAboutMe)}
                    content={profile.about_me}
                />
            )}

            {isExpertisePopupOpen && (
                <EditExpertise
                    profile_expertise={profile.expertise_list}
                    onClose={() => setIsExpertisePopupOpen(false)}
                    onSave={(newExpertise) => {
                        if (newExpertise !== profile.expertise_list) {
                            setProfile({ ...profile, expertise_list: newExpertise });
                        }
                        setIsExpertisePopupOpen(false);
                    }}
                    profileId={profile.id}
                />
            )}

            {isIntroVideoPopupOpen && (
                <EditIntroVideo
                    onClose={() => setIsIntroVideoPopupOpen(false)}
                    onSave={(newIntroVideo) => {
                        if (newIntroVideo !== profile.video_url) {
                            setProfile({ ...profile, video_url: newIntroVideo });
                            showMessage("Update video successfully!")
                        }
                        setIsIntroVideoPopupOpen(false);
                    }}

                    profileId={profile.id}
                />
            )}

            {isClientsPopupOpen && (
                <EditClientShowCase
                    onClose={() => setIsClientsPopupOpen(false)}
                    onSave={(newClientData) => {
                        if (newClientData !== profile.clients) {
                            setProfile({ ...profile, clients: newClientData });
                        }
                        setIsClientsPopupOpen(false);
                    }}
                />
            )}

            {message &&
                <InformMessage message={message} />
            }

        </div>
    );
}

export default ProfilePage;
