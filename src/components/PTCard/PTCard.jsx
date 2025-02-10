import React from 'react'

function PTCard({ pt }) {
    return (
        <div>
            <div className='max-w-[260px] max-h-[145ox] relative'>
                <img className='absolute' src='/pt_card.jpg' />
            </div>

            <div className='flex items-center'>
                <div className='flex items-center'>
                    <img alt='Avatar' />
                    <span className='PTname'></span>
                </div>

                <span className='PT_level'>Level 2</span>
            </div>

            <p className='shortDescription'></p>

            <div className='flex'>
                <span className='Rating'></span>
                <span className='numReview'>(120)</span>
            </div>

            <span>From 120.000 vnd</span>
        </div>
    )
}

export default PTCard