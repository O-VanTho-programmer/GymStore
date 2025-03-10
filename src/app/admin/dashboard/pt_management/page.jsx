'use client';
import ChartLine from '@/components/ChartLine/ChartLine'
import ClientTableAdmin from '@/components/Dashboard/ClientSection/ClientTableAdmin/ClientTableAdmin'
import PTClientServed from '@/components/Dashboard/PTSection/PTClientServed/PTClientServed'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function page() {
    const [data, setData] = useState(null);
    const [trainerId, setTrainerId] = useState(null);
    const [hireClients, setHireClients] = useState(null);
    const [trainerData, setTrainerData] = useState(null);

    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/get_trainer');
                setTrainerData(res.data.trainers);
                console.log(res.data.trainers);
            } catch (err) {
                console.log(err);
            }
        }

        fetchTrainer();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/get_hired_clients/${trainerId}`);
                setHireClients(res.data.transactions);
            } catch (error) {
                console.log(error);
            }
        };

        if (trainerId) {
            fetchData();
        }
    }, [trainerId]);
    return (
        <div className='flex flex-col gap-6 p-4 bg-gray-100 min-h-screen'>

            <ClientTableAdmin users={trainerData} isTrainer={true} setTrainerId={setTrainerId} />

            <div className='flex gap-6 flex-wrap lg:flex-nowrap'>
                <div className='flex flex-col items-center gap-6 w-full lg:w-1/4'>
                    <div className='flex-col flex items-center p-6 border border-gray-300 bg-white shadow-lg rounded-lg w-full h-fit'>
                        <h3 className='text-xl font-semibold'>Number of Clients</h3>
                        <span className='text-2xl text-green-600 h-full flex items-center justify-center text-center'>
                            5
                        </span>
                    </div>

                    <div className='flex-col flex items-center p-6 border border-gray-300 bg-white shadow-lg rounded-lg w-full h-fit'>
                        <h3 className='text-xl font-semibold'>Rating</h3>
                        <span className='text-2xl text-green-600 h-full flex items-center justify-center text-center'>
                            5
                        </span>
                    </div>
                </div>
                <div className='w-full lg:w-3/4'>
                    <PTClientServed client={hireClients} />
                </div>
            </div>

            <div className='bg-white p-6 shadow-lg rounded-lg'>
                <h3 className='text-xl font-semibold mb-4'>Active Frequency</h3>
                {data && (
                    <ChartLine transaction={data} />
                )}
            </div>
        </div>
    )
}

export default page