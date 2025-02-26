'use client';
import React from 'react';
import { motion } from 'framer-motion';
import BannerSlider from '@/components/BannerSlider/BannerSlider';
import { FaShieldAlt } from 'react-icons/fa';

const IMAGES = ["/PT.png", "equipment.jpg", "friends.jpg"];
const TITLES = ['Get yourself a personal trainer', 'Every gymer should have', 'Lets find yourself a gym bro'];
const SPAN_BTNS = ['Hire One', 'Go Store', 'Try it'];
const LINKS = ['/pt', '/store', '/find_friends'];

const HomePage = () => {
  return (
    <div>
      <div className='h-screen'>
        <BannerSlider image_url={IMAGES} title={TITLES} span_btn={SPAN_BTNS} link={LINKS} />
      </div>

      <div id='services' className="sector py-16 bg-gray-100 text-gray-700 flex flex-col items-center text-center">
        <p className='text-gray-700 w-full md:w-3/5 mb-12 px-4'>
          At GYM APP, we bring personal trainers and clients together while offering everything you need for a complete fitness experience. Whether you're a personal trainer looking to grow your clientele or a fitness enthusiast seeking guidance, tools, or community, we’ve got you covered.
        </p>

        {/* Section 1 */}
        <div className='flex flex-col md:flex-row mb-12 max-w-[1140px] text-start items-center bg-white shadow-lg rounded-lg overflow-hidden'>
          <div className='flex-1 p-5'>
            <h2 className='mb-4 text-black'>We provide users a platform to connect & hire PT</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="/find_pt" className="inline-block mt-5 text-white bg-orange-500 py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105 shadow-md hover:shadow-lg">
              Find One
            </a>
          </div>
          <motion.div
            className='flex-1 p-5 relative'
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <img src='/friendGym.jpg' className='w-full h-auto object-cover rounded-lg shadow-lg' />
            <div className='absolute flex bg-orange-500 text-white p-4 items-center bottom-[-5px] left-[-10px] gap-3'>
              <span className='text-4xl font-bold p-3 rounded-full bg-white text-orange-600'>50+</span>
              <div className='text-3xl font-semibold'>
                <h3 >Users Join As</h3>
                <h3>PT</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 2 */}
        <div className='flex flex-col md:flex-row mb-12 max-w-[1140px] text-start items-center bg-white shadow-lg rounded-lg overflow-hidden'>
          <motion.div
            className='flex-1 p-5 relative'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <img src='/storeHero.png' className='w-full h-auto object-cover rounded-lg shadow-lg' />
            <div className='absolute flex bg-orange-500 text-white p-4 items-center bottom-[-5px] right-[-10px] gap-3'>
              <span className='text-4xl font-bold p-3 rounded-full bg-white text-orange-600'><FaShieldAlt /></span>
              <div className='text-3xl font-semibold'>
                <h3>All Products</h3>
                <h3>Come with Warranty</h3>
              </div>
            </div>
          </motion.div>
          <div className='flex-1 p-5 text-start'>
            <h2 className='mb-4 text-black'>Our Store Is Certified</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="/store" className="inline-block mt-5 text-white bg-orange-500 py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105 shadow-md hover:shadow-lg">
              Visit Store
            </a>
          </div>
        </div>

        {/* Section 3 */}
        <div className='flex flex-col md:flex-row mb-12 max-w-[1140px] text-start items-center bg-white shadow-lg rounded-lg overflow-hidden'>
          <div className='flex-1 p-5 text-start'>
            <h2 className='mb-4 text-black'>Gamify Workout</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="#" className="inline-block mt-5 text-white bg-orange-500 py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105 shadow-md hover:shadow-lg">
              Let Play
            </a>
          </div>
          <motion.div
            className='flex-1 p-5 relative'
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <img src='/gamifyWorkout.jpg' className='w-full h-auto object-cover rounded-lg shadow-lg' />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
