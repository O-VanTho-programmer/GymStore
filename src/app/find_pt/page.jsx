'use client';

import JobFilterBtn from '@/components/JobFilterBtn/JobFilterBtn'
import FitGig from '@/components/FitGig/FitGig'
import { GrYoga } from "react-icons/gr";
import React, { useEffect, useState } from 'react'
import { IoBody } from 'react-icons/io5';
import { GiWeight } from "react-icons/gi";
import { GiJumpingRope } from "react-icons/gi";
import axios from 'axios';

function page() {

  const Icons = [IoBody, GiWeight, GrYoga, GiJumpingRope];
  const [expertises, setExpertises] = useState([]);
  const [expertise_id, setExpertise_id] = useState('all');
  const [gigsAndProfile, setGigsAndProfile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/get_expertises/all`);
      setExpertises(res.data.expertises);
    }

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/get_gigs_by_expetise/${expertise_id}`)
      setGigsAndProfile(res.data.gigsAndProfile);
    }

    fetchData();
  }, [expertise_id])

  return (
    <div className='pt-16 px-4 sm:px-6 lg:px-8 xl:px-12'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl pt-12 font-bold'>Find your ideal PT</h1>
      <span className='mt-2 text-gray-400'>Seeking your ideal personal trainer based on your demand</span>
      <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-[#404145] mt-4'>Most Popular in Hiring PT</h3>

      <div className='flex flex-wrap gap-3 py-10'>
        {expertises && expertises.map((e, i) => (
          <JobFilterBtn onClick={(id) => setExpertise_id(id)} id={e.id} key={i} icon={Icons[i]} title={e.expertise} />
        ))}
      </div>

      <div className='flex flex-wrap gap-2 py-10'>
        {gigsAndProfile && gigsAndProfile.map((g, i) => (
          <div key={i} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-95 transition-transform duration-300'>
            <FitGig gig={g.gig} profile={g.profile} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
