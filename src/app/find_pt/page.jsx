'use client';

import JobFilterBtn from '@/components/JobFilterBtn/JobFilterBtn'
import FitGig from '@/components/FitGig/FitGig'
import { GrYoga } from "react-icons/gr";
import React, { useEffect, useState } from 'react'
import { IoBody } from 'react-icons/io5';
import { GiWeight } from "react-icons/gi";
import { GiJumpingRope } from "react-icons/gi";
import axios from 'axios';
import LoadingWrapper from '@/components/Loading/LoadingWrapper';
import Loading from '@/components/Loading/Loading';

function page() {

  const Icons = [IoBody, GiWeight, GrYoga, GiJumpingRope];
  const [expertises, setExpertises] = useState([]);
  const [expertise_id, setExpertise_id] = useState('all');
  const [gigsAndProfile, setGigsAndProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`gymstore-production.up.railway.app/api/get_expertises/all`);
        setExpertises(res.data.expertises);
      } catch (error) {
        console.error('Error fetching expertises:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`gymstore-production.up.railway.app/api/get_gigs_by_expetise/${expertise_id}`)
        setGigsAndProfile(res.data.gigsAndProfile);
      } catch (error) {
        console.error('Error fetching gigs:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [expertise_id])

  return (
    <LoadingWrapper loadingText="Loading PT finder...">
      <div className='pt-16 px-4 sm:px-6 lg:px-8 xl:px-12'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Find your ideal PT</h1>
        <span className='mt-2 text-gray-400'>Seeking your ideal personal trainer based on your demand</span>
        <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-[#404145] mt-10'>Most Popular in Hiring PT</h3>

        {isLoading ? (
          <div className='flex justify-center items-center py-20'>
            <Loading size="large" text="Loading expertises..." />
          </div>
        ) : (
          <>
            <div className='flex flex-wrap gap-3 py-10'>
              {expertises && expertises.map((e, i) => (
                <JobFilterBtn onClick={(id) => setExpertise_id(id)} id={e.id} key={i} icon={Icons[i]} title={e.expertise} />
              ))}
            </div>

            <div className='flex flex-wrap gap-2 py-8'>
              {gigsAndProfile && gigsAndProfile.map((g, i) => (
                <div key={i} className='w-fit hover:scale-95 transition-transform duration-300'>
                  <FitGig gig={g.gig} profile={g.profile} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </LoadingWrapper>
  )
}

export default page
