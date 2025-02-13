'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function EditExpertise({ profile_expertise, onClose, onSave }) {
    const [expertises, setExpertises] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/get_expertises`);
                setExpertises(res.data.expertises);
            } catch (error) {
                console.log("Error fetch expertises", error);
            }
        }

        fetchData();
    }, [])

    const handleAddService = () => {
       
    };

    const handleRemoveService = (index) => {
        
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Expertise</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Main Expertise</label>
                    <input
                        type="text"
                        value={expertise}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Services</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newService}
                            className="flex-1 p-2 border rounded-lg"
                            placeholder="Add new service"
                        />
                        <button
                            onClick={handleAddService}
                            className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {services.map((service, index) => (
                            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
                                {service}
                                <button
                                    onClick={() => handleRemoveService(index)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => onSave(expertise, services)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}