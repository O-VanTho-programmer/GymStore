'use client'

import { useState } from 'react';

export default function EditClientShowCase({ onClose, onSave }) {
    const [clients, setClients] = useState([]);
    const [newClient, setNewClient] = useState({
        name: '',
        rating: '',
        feedback: ''
    });

    const handleAddClient = () => {
        if (newClient.name && newClient.feedback) {
            setClients([...clients, newClient]);
            setNewClient({ name: '', rating: '', feedback: '' });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Client Achievements</h2>
                
                <div className="mb-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={newClient.name}
                            onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Rating (1-5)"
                            min="1"
                            max="5"
                            value={newClient.rating}
                            onChange={(e) => setNewClient({...newClient, rating: e.target.value})}
                            className="p-2 border rounded-lg"
                        />
                    </div>
                    <textarea
                        placeholder="Client Feedback"
                        value={newClient.feedback}
                        onChange={(e) => setNewClient({...newClient, feedback: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        rows="3"
                    />
                    <button
                        onClick={handleAddClient}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Client
                    </button>
                </div>

                <div className="mb-4 max-h-64 overflow-y-auto">
                    {clients.map((client, index) => (
                        <div key={index} className="p-3 mb-2 border rounded-lg">
                            <div className="font-semibold">{client.name}</div>
                            <div className="text-yellow-500">Rating: {client.rating}</div>
                            <p className="text-gray-600">{client.feedback}</p>
                        </div>
                    ))}
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
                        onClick={() => onSave(clients)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}