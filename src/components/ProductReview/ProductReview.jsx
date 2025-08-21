'use client';
import React, { useState } from 'react'
import Rating from '../Rating/Rating'
import axios from 'axios';
import CommentBox from './CommentBox/CommentBox';

function ProductReview({ user, productId, rating, reviews, ratingCounts }) {
    const handleAddComment = async ({comment, userRating}) => {
        
        if (!user || !user.userId) {
            console.error("User is not defined or userId is missing");
            return;
        }

        try {
            const res = await axios.post("gymstore-production.up.railway.app/api/add_comment", {
                userId: user.userId,
                productId,
                rating: userRating,
                comment,
            });

            if(res.status === 200){
                window.location.reload();
            }

        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }

    return (
        <div className='bg-white border border-gray-200 p-4 rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>Product Reviews</h1>

            <div className='flex'>
                <div className='flex flex-col items-center mb-4 md:mb-0 md:mr-4 w-[180px] h-auto'>
                    <span className='text-3xl font-semibold mr-2'>
                        {rating}
                    </span>
                    <span className='text-gray-600'>({reviews.length} reviews)</span>
                    <Rating rating={rating} />
                </div>

                <div className='flex-1 border-l pl-4 border-gray-200'>
                    <ul>
                        <li className='flex items-center'><Rating rating={5} /> ({ratingCounts[5] || 0})</li>
                        <li className='flex items-center'><Rating rating={4} />({ratingCounts[4] || 0})</li>
                        <li className='flex items-center'><Rating rating={3} />({ratingCounts[3] || 0})</li>
                        <li className='flex items-center'><Rating rating={2} />({ratingCounts[2] || 0})</li>
                        <li className='flex items-center'><Rating rating={1} />({ratingCounts[1] || 0})</li>
                    </ul>
                </div>
            </div>

            <div className='bg-white w-full min-h-10 border-gray-200 border-t-2 px-4'>
                <CommentBox onComment={handleAddComment} username={user.username} avatar={user.avatar}/>

                {reviews.map((review, index) => (
                    <div key={index} className='border-t border-gray-200 pt-4 mt-4'>
                        <div className='flex items-center mb-2'>
                            <img src={review.avatar ? review.avatar : "/guest_avatar.png"} alt={review.name} className='w-10 h-10 rounded-full mr-4' />
                            <div className=''>
                                <p className='font-semibold'>{review.username}</p>
                                <Rating rating={review.rating} />
                            </div>
                        </div>

                        <p className='text-gray-800'>{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductReview