import React from 'react'
import { FaStar } from 'react-icons/fa'

function FitGig({ gig, profile }) {
    return (
        <a href = {`/find_pt/fit_gig/${gig.id}`} className='flex flex-col gap-2 min-w-[255px] overflow-hidden p-2 bg-white rounded shadow-md transition-transform duration-300 transform hover:scale-105'>
            <div className=' min-h-[150px] relative text-black overflow-hidden rounded'>
                <img src={gig.image_url} className='absolute object-fill w-full h-full'/>
            </div>

            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                    <img src={profile?.avatar || "/guest_avatar.png"} className='w-[25px] h-[25px] rounded-full' alt='Avatar' />
                    <span className='PTname'>{profile?.username || "Username"}</span>
                </div>

                <span className='PT_level'>Level {profile?.level || "New"}</span>
            </div>

            <p className='shortDescription'>{gig?.title || "I will ..."}</p>

            <div className='flex gap-2'>
                <span className='Rating flex items-center font-bold'><FaStar/> {gig?.rating || 5}</span>
                <span className='numReview text-gray-500'>({gig.numReviews})</span>
            </div>

            <span className='font-semibold text-lg'>From {gig?.price || 50.000} vnd {gig?.unit || "/Day"}</span>
        </a>
    )
}

export default FitGig