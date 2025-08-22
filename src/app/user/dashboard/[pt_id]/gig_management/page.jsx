'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { useUser } from '@/context/UserContext';

function page() {
  const { currentUser } = useUser();
  const [requestServices, setRequestServices] = useState([]);
  const [gigInActive, setGigInActive] = useState([]);
  const [allGigs, setAllGigs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?.userId) {
        console.log("User ID is missing, skipping API call");
        return;
      }
      try {
        const resRequestServices = await axios.get(`https://gymstore-production.up.railway.app/api/get_request_service/${currentUser.userId}`);
        setRequestServices(resRequestServices.data.requests);

        const resActiveGig = await axios.get(`https://gymstore-production.up.railway.app/api/get_active_gig/${currentUser.userId}`);
        setGigInActive(resActiveGig.data.activeGigs);

        const resAllGig = await axios.get(`https://gymstore-production.up.railway.app/api/get_gig/${currentUser.userId}`);
        console.log(resAllGig.data.gigs);
        setAllGigs(resAllGig.data.gigs);
      } catch (error) {
        console.error("Error fetching gig data:", error);
      }
    };

    fetchData();
  }, [currentUser]);

  const acceptRequest = async ({ hireId }) => {
    try {
      const res = await axios.post("https://gymstore-production.up.railway.app/api/accept_gig", { hireId });
    } catch (error) {

    }
  }

  const cancelRequest = async ({ hireId }) => {
    try {
      const res = await axios.post("https://gymstore-production.up.railway.app/api/cancel_gig", { hireId });
    } catch (error) {

    }
  }

  return (
    <div className='p-6 space-y-6 bg-gray-100 min-h-screen'>
      <div className='flex gap-6'>
        {/* Active Gigs */}
        <div className='w-1/2 bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold mb-4'>Active Gigs</h2>
          {gigInActive.length > 0 ? (
            gigInActive.map((gig, index) => (
              <div key={index} className='p-3 border-b last:border-none'>
                <h3 className='font-medium'>{gig.title}</h3>
                <p className='text-sm text-gray-600'>{gig.gig_package}</p>
                <p className='text-xs text-gray-500'>Hire Date: {gig.hire_date}</p>
              </div>
            ))
          ) : (
            <p className='text-sm text-gray-500'>No active gigs</p>
          )}
        </div>

        <div className='w-1/2 bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold mb-4'>Request Services</h2>
          {requestServices.length > 0 ? (
            requestServices.map((request, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200">
                <img src={request.image_url} alt="Gig" className="w-12 h-12 rounded-md object-cover" />

                <div key={index} className="flex-1 ml-4">
                  <h3 className="font-semibold text-lg text-gray-800">{request.title}</h3>
                  <p className="text-sm text-gray-600">{request.gig_package}</p>
                  <p className="text-xs text-gray-500">Requested on: {request.hire_date}</p>
                </div>

                <div className="flex flex-col items-center space-y-1">
                  <button onClick={acceptRequest(request.id)} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    <IoCheckmark size={20} />
                  </button>
                  <button onClick={cancelRequest} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    <IoCloseOutline size={20} />
                  </button>
                </div>
              </div>

            ))
          ) : (
            <p className='text-sm text-gray-500'>No requests</p>
          )}
        </div>
      </div>

      {/* All Gigs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Gigs</h2>
        {allGigs.length > 0 ? (
          allGigs.map((gig, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border-b last:border-none"
            >
              <img
                src={gig.image_url || "/default-gig.jpg"}
                alt={gig.title}
                className="w-16 h-16 rounded-md object-cover"
              />

              <div className="flex-1">
                <h3 className="text-lg font-medium">{gig.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">{gig.rating} ⭐</span>
                  <span>({gig.numReviews} reviews)</span>
                </div>
              </div>

              <div className='flex flex-col justify-center items-center gap-4'>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${gig.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {gig.status}
                </span>

                <button onClick={() => {window.location.href = `/user/dashboard/3/gig_management/edit_gig/${gig.id}`}} className="px-4 py-2 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition">
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No gigs</p>
        )}
      </div>

    </div>
  );
}

export default page;
