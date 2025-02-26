'use client';

import Avata from '@/components/Avata/Avata';
import { FaStar } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

function page() {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/get_user_profile/${name}`);
        setProfile(data.profile);
        setGigs(data.gigs);

        const reviewResponse = await axios.get(
          `http://localhost:5000/api/get_profile_review/${data.profile.id}`
        );
        setReviews(reviewResponse.data.reviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [name]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between py-5 px-8 gap-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 max-w-[320px]">
        <div className="flex flex-col items-center">
          <Avata width={100} height={100} image={profile.avatar} />
          <h3 className="font-bold text-2xl mt-4">{profile.username}</h3>
          {profile.is_personal_trainer && (
            <h3 className="role font-semibold text-lg text-gray-500">| Personal Trainer |</h3>
          )}
        </div>

        <div className="w-full">
          <h3 className="font-bold text-xl mb-4">Level Overview</h3>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-gray-600 font-medium">Level</h3>
            <span className="text-gray-800">{profile.level}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-gray-600 font-medium">Expertise</h3>
            <span className="text-gray-800">
              {profile.expertise_list.map((e) => e.expertise).join(', ') || 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-gray-600 font-medium">Rating</h3>
            <span className="flex items-center">
              <FaStar size={15} className="text-yellow-300" /> {profile.rating}
            </span>
          </div>
        </div>

        <button className="font-bold text-xl mb-4 border-black border py-2 hover:bg-black hover:text-white">
          Hire Now
        </button>
      </div>

      <div className="flex flex-col gap-10 flex-1 bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 max-w-[1070px]">
        <div className="border border-gray-300 rounded-lg p-9">
          <h2 className="text-2xl font-bold mb-2">About me</h2>
          <p className="text-gray-600 mt-5">{profile.about_me || 'No information available.'}</p>
        </div>

        <div className="border border-gray-300 rounded-lg p-9">
          <h2 className="text-2xl font-bold mb-2">Intro video</h2>
          {profile.video_url ? (
            <iframe
              className="w-full h-56"
              src={profile.video_url}
              title="Intro Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-gray-600 mt-5">No video updated</p>
          )}
        </div>

        <div className="border border-gray-300 rounded-lg p-9">
          <h2 className="text-2xl font-bold mb-2">Gigs</h2>
          {gigs.length > 0 ? (
            gigs.map((gig) => (
              <div key={gig.id} className="mb-4 border p-4 rounded">
                <h3 className="font-semibold">{gig.title}</h3>
                <p className="text-gray-600">{gig.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <FaStar size={14} className="text-yellow-300" />
                  {gig.rating} ({gig.numReviews} reviews)
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No gigs available</p>
          )}
        </div>

        <div className="border border-gray-300 rounded-lg p-9">
          <h2 className="text-2xl font-bold mb-6">Reviews from clients</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="w-full p-4 flex flex-col gap-4 border border-gray-300 mb-2 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold">{review.reviewer_name}</h3>
                  <div className="flex gap-1">
                    <span className="text-gray-500">Rating:</span>
                    <span className="flex items-center">
                      <FaStar size={15} className="text-yellow-300" />
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p>{review.review_text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
