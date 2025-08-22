'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function page() {
    const { gig_id } = useParams();
    const [gigDetails, setGigDetails] = useState({ title: '', description: '', image: '' });
    const [gigPackages, setGigPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGigData = async () => {
            try {
                const gigRes = await axios.get(`https://gymstore-production.up.railway.app/api/get_gig_by_id/${gig_id}`);
                console.log(gigRes.data);
                setGigDetails(gigRes.data.gig[0] || {});

                const packageRes = await axios.get(`https://gymstore-production.up.railway.app/api/get_package/${gig_id}`);
                console.log(packageRes.data.package)
                setGigPackages(packageRes.data.package);
            } catch (error) {
                console.error('Error fetching gig data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGigData();
    }, [gig_id]);

    const handleGigChange = (e) => {
        setGigDetails({ ...gigDetails, [e.target.name]: e.target.value });
    };

    const handlePackageChange = (index, field, value) => {
        const updatedPackages = [...gigPackages];
        updatedPackages[index][field] = value;
        setGigPackages(updatedPackages);
    };

    const handleSave = async () => {
        try {
            await axios.post(`https://gymstore-production.up.railway.app/api/update_gig`, gigDetails);
            await axios.post(`https://gymstore-production.up.railway.app/api/update_packages`, { packages: gigPackages });
            alert('Gig updated successfully!');
        } catch (error) {
            console.error('Error updating gig:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='max-w-3xl mx-auto bg-white p-6 rounded shadow'>
            <h2 className='text-xl font-semibold mb-4'>Edit Gig</h2>
            <input 
                type='text' 
                name='title' 
                value={gigDetails.title} 
                onChange={handleGigChange} 
                placeholder='Gig Title' 
                className='w-full p-2 border rounded mb-2'
            />
            <textarea 
                name='description' 
                value={gigDetails.description} 
                onChange={handleGigChange} 
                placeholder='Gig Description' 
                className='w-full p-2 border rounded mb-2'
            />
            
            <h3 className='text-lg font-semibold mt-4'>Edit Packages</h3>
            {gigPackages.map((pkg, index) => (
                <div key={pkg.id} className='border p-3 rounded mb-3'>
                    <input
                        type='text'
                        value={pkg.title}
                        onChange={(e) => handlePackageChange(index, 'title', e.target.value)}
                        className='w-full p-2 border rounded mb-2'
                    />
                    <input
                        type='number'
                        value={pkg.price}
                        onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                        className='w-full p-2 border rounded mb-2'
                    />
                </div>
            ))}

            <button onClick={handleSave} className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>Save Changes</button>
        </div>
    );
}

export default page;
