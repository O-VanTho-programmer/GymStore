'use client';

import PackageSelector from '@/components/PackageSelector/PackageSelector';
import CommentBox from '@/components/ProductReview/CommentBox/CommentBox';
import Rating from '@/components/Rating/Rating';
import Review from '@/components/Review/Review';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function FitGigDetails() {
    const { gig_id } = useParams();
    const { currentUser } = useUser();

    const [profile, setProfile] = useState([]);
    const [gig, setGig] = useState([]);

    const [toggleGigReview, setToggleGigReview] = useState(true);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://gymstore-production.up.railway.app/api/get_user_gig_detail/${gig_id}`);
                console.log(res.data.profile);
                setProfile(res.data.profile);
                setGig(res.data.gig);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        const fetchReviewGig = async () => {
            try {
                const res = await axios.get(`https://gymstore-production.up.railway.app/api/get_gig_review/${gig_id}`)
                console.log(res.data.reviews);

                setReviews(res.data.reviews);
            } catch (error) {
                console.log("Error fetch review gig");
            }

        }

        const fetchReviewProfile = async () => {
            try {
                const res = await axios.get(`https://gymstore-production.up.railway.app/api/get_profile_review/${profile.id}`)
                console.log(res.data.reviews);
                setReviews(res.data.reviews);
            } catch (error) {
                console.log("Error fetch review profile");
            }
        }

        if (toggleGigReview) {
            fetchReviewGig();

        } else {
            fetchReviewProfile();
        }

    }, [toggleGigReview])

    const handleAddCommnet = async ({ comment, userRating }) => {
        try {
            const res = await axios.post('https://gymstore-production.up.railway.app/api/create_gig_review', {
                userId: currentUser.userId,
                gig_id,
                rating: userRating,
                comment
            })
        } catch (error) {
            console.log("Error post add gig review", error);
        }
    }

    if (!currentUser || !profile || !gig) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className='flex flex-col lg:flex-row bg-white py-6 px-5 pt-28 gap-11 lg:px-8 xl:px-20'>
            <div className='w-full lg:w-2/3 flex flex-col gap-10'>
                <h2>{gig?.title || "No Title"}</h2>

                <div className='flex flex-col lg:flex-row items-center gap-4'>
                    <img src={profile?.avatar || '/guest_avatar.png'} className='border border-gray-200 w-[120px] h-[120px] rounded-full' />
                    <div className='flex flex-col items-start gap-2'>
                        <h3 className='text-xl font-semibold'>{profile.username}</h3>
                        <div className='flex items-center gap-1'>
                            <Rating rating={profile.rating} />
                            <span>{profile.rating}</span>
                            <span>({gig.numReviews})</span>
                        </div>
                        <button className='px-3 py-2 bg-white border border-gray-200 hover:bg-black hover:text-white text-black'>Contact Me</button>
                    </div>
                </div>

                <p>{profile.about_me}</p>

                <div>
                    <h1 className='text-3xl font-medium pb-3'>Expertise</h1>

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
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-3xl font-medium pb-3">Review From Clients</h1>

                    <div className="flex gap-4 mb-6">
                        <button
                            className={`py-2 px-4 rounded-lg text-sm font-semibold ${toggleGigReview ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                            onClick={() => setToggleGigReview(true)}
                        >
                            Current Gig
                        </button>
                        <button
                            className={`py-2 px-4 rounded-lg text-sm font-semibold ${!toggleGigReview ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                            onClick={() => setToggleGigReview(false)}
                        >
                            About PT
                        </button>
                    </div>

                    <CommentBox onComment={handleAddCommnet} avatar={currentUser.avatar} username={currentUser.username} />

                    {reviews ? (
                        <div className="mt-5">

                            {reviews.map((r, idx) => (
                                <Review key={idx} avatar={r.avatar} username={r.username} rating={r.rating} comment={r.content} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500">Loading...</div>
                    )}
                </div>

            </div>

            <div className='w-full lg:w-1/3'>
                <PackageSelector gigId={gig_id} trainerId={profile.user_id} />
            </div>
        </div>
    )
}

export default FitGigDetails
