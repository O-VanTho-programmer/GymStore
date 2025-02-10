import React from 'react'
import { FaStar } from "react-icons/fa";


function Rating({rating}) {
    return (
        <div className='flex'>
            {Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                size={15}
                className={index < rating ? 'text-[#ffd500]' : 'text-gray-300'}
            />
        ))}</div>
    )
}

export default Rating