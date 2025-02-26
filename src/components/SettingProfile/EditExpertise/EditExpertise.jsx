'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

export default function EditExpertise({ profile_expertise, onClose, onSave, profileId }) {
    const [profileExpertise, setProfileExpertise] = useState(profile_expertise);
    const [expertises, setExpertises] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/get_expertises/${profileId}`);
                console.log(res.data.expertises);
                setExpertises(res.data.expertises);
            } catch (error) {
                console.log("Error fetching expertises", error);
            }
        };

        fetchData();
    }, [profileId]);

    const handleAddService = (expertise) => {
        setProfileExpertise([...profileExpertise, expertise]);
        setExpertises(expertises.filter(exp => exp.id !== expertise.id));
    };

    const handleRemoveService = (expertise) => {
        setProfileExpertise(profileExpertise.filter(exp => exp.id !== expertise.id));
        setExpertises([...expertises, expertise]);
    };

    const handleSave = async () => {
        try {
            await axios.post(`http://localhost:5000/api/edit_expertise`, {
                expertises: profileExpertise, profileId
            });
            onSave(profileExpertise);
            onClose();
        } catch (error) {
            console.log("Error saving expertises", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold">Edit Expertise</h2>
                <span className='text-gray-500'>The first one is your main expertise</span>
                <h1 className='mb-1 mt-2'>Your expertises</h1>
                <div className='flex flex-wrap gap-1'>
                    {profileExpertise.map((exp, i) => (
                        <div onClick={() => handleRemoveService(exp)} className="hover:bg-gray-200 cursor-pointer flex items-center gap-1 border border-gray-300 text-gray-600 text-sm rounded-3xl p-2" key={i}>
                            <p>{exp.expertise}</p>
                            <FiMinus />
                        </div>
                    ))}
                </div>
                <h1 className='mb-1 mt-2'>Expertises</h1>
                <div className='flex flex-wrap gap-1'>
                    {expertises && expertises.map((exp, i) => (
                        <div onClick={() => handleAddService(exp)} className="hover:bg-gray-200 cursor-pointer flex items-center gap-1 border border-gray-300 text-gray-600 text-sm rounded-3xl p-2" key={i}>
                            <p>{exp.expertise}</p>
                            <GoPlus />
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-end gap-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}