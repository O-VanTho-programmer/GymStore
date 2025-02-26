import React from 'react'

function Review({ avatar, username, rating, comment }) {
    return (
        <div
            className="flex items-start gap-4"
        >
            <img
                src={avatar || '/guest_avatar.png'}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
            />
            <div>
                <h3 className="font-semibold text-lg">{username}</h3>
                <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span>{rating}</span>
                </div>
                <p className="text-gray-600 mt-2">{comment}</p>
            </div>
        </div>
    )
}

export default Review