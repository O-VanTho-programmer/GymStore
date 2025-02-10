import Navar from '@/components/Navar/Navar'
import StyledBTN from '@/components/StyledBTN/StyledBTN'
import React from 'react'

function page() {
    return (
        <div>
            <Navar />

            <div className='h-screen w-full flex flex-col justify-center items-center gap-5 relative overflow-hidden text-white'>
                <img src='/bg_map.jpg' className='object-cover absolute h-full w-full'/>
                <div className='absolute h-full w-full bg-gray-900 opacity-50'></div>
                <h1 className='text-7xl font-bold z-10'>WELCOME TO</h1>
                <h1 className='text-5xl font-bold z-10 text-orange-400'>WORLD</h1>
                <p className='text-lg font-semibold z-10'>Where you find and connect new local friends</p>
                <StyledBTN link={'#'} span_btn={'START'} />
            </div>

            {/* View local user who can be your friends */}

            <div className='flex items-center'>
                <div className=''>

                </div>

                <div className=''>

                </div>
            </div>

            {/* Add friend, connect with them */}
            <div className='flex items-center'>
                <div className=''>
                    
                </div>

                <div className=''>

                </div>
            </div>
        </div>
    )
}

export default page