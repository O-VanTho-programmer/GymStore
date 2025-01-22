import React from 'react';
import BannerSlider from '@/components/BannerSlider/BannerSlider';
import { BsFilePersonFill } from "react-icons/bs";
import { IoMdFitness } from "react-icons/io";
import { GiThreeFriends } from "react-icons/gi";
import { FaPerson } from "react-icons/fa6";
import Navar from '@/components/Navar/Navar';

const IMAGES = ["/PT.png", "equipment.jpg", "friends.jpg"];
const TITLES = ['Get yourself a personal trainer', 'Every gymer should have', 'Lets find yourself a gym bro'];
const SPAN_BTNS = ['Hire One', 'Go Store', 'Try it'];
const LINKS = ['/pt', '/store', '/find_friends'];

const HomePage = () => {
  return (
    <div>
      <Navar />
      <div className='h-screen'>
        <BannerSlider image_url={IMAGES} title={TITLES} span_btn={SPAN_BTNS} link={LINKS} />
      </div>

      <div id='services' className="sector py-16 bg-gray-100 text-gray-700 flex flex-col items-center text-center">
        <h1 className='text-4xl font-bold text-center mb-8'>Our Service</h1>
        <p className='text-gray-700 w-[60%] mb-12'>
          At GYM APP, we bring personal trainers and clients together while offering everything you need for a complete fitness experience. Whether you're a personal trainer looking to grow your clientele or a fitness enthusiast seeking guidance, tools, or community, we’ve got you covered.
        </p>

        <div className='flex flex-wrap justify-center space-x-4'>
          <div className='bg-white p-8 m-4 rounded-lg shadow-lg w-[300px] mr-0 flex flex-col items-center'>
            <BsFilePersonFill className='text-4xl mb-4' />
            <h2 className='text-2xl font-semibold mb-4'>For PT</h2>
            <ul className='text-start list-disc list-inside'>
              <li><strong>Grow Your Business</strong>: Create a profile, showcase expertise, and gain visibility to attract clients.</li>
              <li><strong>Streamlined Management</strong>: Manage bookings, track progress, and receive secure payments effortlessly.</li>
            </ul>
          </div>

          <div className='bg-white p-8 m-4 rounded-lg shadow-lg w-[300px] flex flex-col items-center'>
            <IoMdFitness className='text-4xl mb-4' />
            <h2 className='text-2xl font-semibold mb-4'>For Clients</h2>
            <ul className='text-start list-disc list-inside'>
              <li><strong>Find Your Ideal Trainer</strong>: Browse certified trainers by expertise and location.</li>
              <li><strong>Personalized Coaching</strong>: Access tailored workout and nutrition plans to fit your unique goals.</li>
            </ul>
          </div>

          <div className='bg-white p-8 m-4 rounded-lg shadow-lg w-[300px] flex flex-col items-center'>
            <GiThreeFriends className='text-4xl mb-4' />
            <h2 className='text-2xl font-semibold mb-4'>Equipment</h2>
            <ul className='text-start list-disc list-inside'>
              <li><strong>Premium Selection</strong>: Shop durable, high-performance equipment from trusted brands.</li>
              <li><strong>Convenient Delivery</strong>: Get your gear delivered straight to your door with ease.</li>
              <li><strong>Versatile Products</strong>: From dumbbells to advanced training gear, find everything you need for home or professional use.</li>
            </ul>
          </div>

          <div className='bg-white p-8 m-4 rounded-lg shadow-lg w-[300px] flex flex-col items-center'>
            <FaPerson className='text-4xl mb-4' />
            <h2 className='text-2xl font-semibold mb-4'>Find Friends</h2>
            <ul className='text-start list-disc list-inside'>
              <li><strong>Connect with new people</strong>: Meet new friends who share your passion for fitness.</li>
              <li><strong>Stay Motivated</strong>: Keep each other accountable and motivated to reach your goals.</li>
              <li><strong>Share Tips and Tricks</strong>: Exchange workout routines, nutrition advice, and more to enhance your fitness journey.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;