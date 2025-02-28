import React from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'

function JobFilterBtn({ onClick, id, title, icon: Icon }) {
    return (
        <button onClick={() => onClick(id)} className='cursor-pointer flex items-center rounded-md gap-4 border p-3 hover:bg-gray-100 transition duration-300 ease-in-out shadow-md'>
            <div className='p-1 rounded w-[48px] h-[48px] border flex justify-center items-center bg-gray-200'>
                {Icon && <Icon size={35}/>}
            </div>

            <span className='text-base font-semibold text-gray-700'>{title}</span>

            <IoIosArrowRoundForward size={26} className='text-gray-500' />
        </button>
    )
}

export default JobFilterBtn