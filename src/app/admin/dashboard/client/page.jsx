import ClientTableAdmin from '@/components/Dashboard/ClientSection/ClientTableAdmin/ClientTableAdmin'
import OrderDetails from '@/components/Dashboard/ClientSection/OrderDetails/OrderDetails'
import ShowHiredPT from '@/components/Dashboard/ClientSection/ShowHiredPT/ShowHiredPT'
import React from 'react'

function page() {
    return (
        <div className='flex flex-col gap-4'>
            <div>
                <ClientTableAdmin isTrainer={false} />
            </div>

            <div className='flex gap-4 flex-wrap  2xl:flex-nowrap'>
                <div className='flex-1'>
                    <OrderDetails />
                </div>
                <div className='flex-1'>
                    <ShowHiredPT />
                </div>
            </div>
        </div>
    )
}

export default page