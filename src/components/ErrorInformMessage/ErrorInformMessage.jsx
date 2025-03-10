import React from 'react'
import { BiSolidErrorAlt } from "react-icons/bi";

function ErrorInformMessage({ message }) {
    return (
        <div className='fixed left-0 top-0 flex justify-center items-center w-screen min-h-screen bg-gray-800 bg-opacity-50 z-10'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center'>
                <BiSolidErrorAlt size={80} className='text-orange-500 mb-4' />
                <p className='text-gray-700 text-lg'>{message}</p>
            </div>
        </div>
    )
}

export default ErrorInformMessage