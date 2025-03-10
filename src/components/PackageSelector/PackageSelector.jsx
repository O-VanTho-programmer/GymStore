'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PackageSelector({ gigId }) {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [packages, setPackages] = useState({});

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/get_packages/${gigId}`);
        const packageData = res.data.reduce((acc, pkg) => {
          acc[pkg.title] = { ...pkg, extras: 'Includes basic support' };
          return acc;
        }, {});

        setPackages(packageData);
        setSelectedPackage(Object.keys(packageData)[0]);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, [gigId]);

  if (!selectedPackage || Object.keys(packages).length === 0) return <p>Loading packages...</p>;

  const currentPackage = packages[selectedPackage];
  console.log(currentPackage)

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <div className="flex space-x-4 border-b mb-4">
        {Object.keys(packages).map((pkg) => (
          <button
            key={pkg}
            className={`py-2 px-4 ${selectedPackage === pkg ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
            onClick={() => setSelectedPackage(pkg)}
          >
            {pkg}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-semibold">{currentPackage.title}</h2>
        <p className="text-lg font-bold">{currentPackage.price} VND</p>
        <p>⏳ <span className="font-bold">{currentPackage.duration} months</span></p>
        <p className="whitespace-pre-line">{currentPackage.description}</p>
        <p className="text-sm font-medium mt-2">{currentPackage.extras}</p>

        <button onClick={() => {window.location.href = `/payment/${gigId}/${currentPackage.id}`}} className=" bg-black text-white w-full py-2 rounded mt-4 hover:bg-gray-600">
          Continue →
        </button>
      </div>
    </div>
  );
}
