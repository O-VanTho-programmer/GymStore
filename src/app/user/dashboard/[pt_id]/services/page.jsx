'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";

function page() {
  const { currentUser } = useUser();
  const [purchasedGigs, setPurchasedGigs] = useState([]);
  const [hiredPT, setHiredPT] = useState([]);
  const [viewPTId, setViewPTId] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resGig = await axios.get(`http://localhost:5000/api/get_purchased_gig_package/${currentUser.userId}`);
        const resPT = await axios.get(`http://localhost:5000/api/get_hired_pt/${currentUser.userId}`);

        setPurchasedGigs(resGig.data.gigs);
        setHiredPT(resPT.data.trainers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Purchased Gigs Section */}
      <div className="w-full lg:w-3/4 bg-white p-5 shadow-lg rounded-lg max-h-[650px] overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">Purchased Gigs</h2>
        <div className="space-y-4">
          {purchasedGigs.length > 0 ? (
            purchasedGigs.map((gig, index) => (
              <div key={index} className="p-4 border rounded-lg flex items-center gap-4">
                <img src={gig.image_url} alt={gig.title} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-bold">{gig.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{gig.description}</p>

                  <p className={`mt-2 text-base font-semibold ${gig.status === 'Pending' ? "text-blue-600" : gig.status === 'Cancel' ? "text-red-600" : 'text-green-600'} `}>Status: {gig.status}</p>
                  {gig.status === "Active" && (
                    <p className="text-sm font-semibold text-blue-600">Duration: {gig.duration}</p>
                  )}
                  {gig.status === "Finish" && (
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md">Leave a Review</button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No purchased gigs found.</p>
          )}
        </div>
      </div>

      {/* Hired PT Section */}
      <div className="w-full lg:w-1/4 bg-white p-5 shadow-lg rounded-lg max-h-[650px] overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">Hired Personal Trainers</h2>
        <div className="space-y-4">
          {hiredPT.length > 0 ? (
            hiredPT.map((pt, index) => (
              <div onClick={() => setViewPTId(pt.id)} key={index} className="p-4 border rounded-lg flex items-center gap-4">
                <img src={pt?.avatar || "/guest_avatar.png"} alt={pt.username} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-bold">{pt.username}</h3>
                  <p className="text-sm text-gray-600">⭐ {pt.rating} / 5</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hired trainers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;