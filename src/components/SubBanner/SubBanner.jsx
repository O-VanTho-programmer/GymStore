import React from 'react'

function SubBanner({ image_url }) {
    return (
        <div className='overflow-hidden relative rounded-[10px] h-full w-full cursor-pointer hover:scale-95 transition-transform duration-300'>
            <img src={image_url} className='object-cover h-full w-full' />
        </div>
    )
}

export default SubBanner