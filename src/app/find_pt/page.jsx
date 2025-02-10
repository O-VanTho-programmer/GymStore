import JobFilterBtn from '@/components/JobFilterBtn/JobFilterBtn'
import PTCard from '@/components/PTCard/PTCard'
import { GrYoga } from "react-icons/gr";
import React from 'react'
import { IoBody } from 'react-icons/io5';
import { GiWeight } from "react-icons/gi";

function page() {

  const Icons = [IoBody, GrYoga, GiWeight];
  const titles = ["Body Building", "Yoga", "Powerlifting"]
  const links = ["#", "#", , "#"];

  return (
    <div className='pt-16 px-14'>
      <h1 className='text-4xl pt-12 font-bold'>Find your ideal PT</h1>
      <span className='mt-2 text-gray-400'>Seeking your ideal personal trainer base on your demand</span>
      <h3 className='text-2xl font-bold text-[#404145] py-6'>Most Popular in Hiring PT</h3>

      <div className='flex gap-4'>
        {titles.map((_, i) => (
          <JobFilterBtn icon={Icons[i]} title={titles[i]} link={links[i]} />
        ))}
      </div>

      <div className=''>
        

      </div>
    </div>
  )
}

export default page