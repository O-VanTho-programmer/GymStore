'use client'

import { useState } from 'react';

export default function EditIntroVideo({ onClose, onSave }) {
    const [videoUrl, setVideoUrl] = useState('');

    const handleSave = () => {
        onSave(videoUrl);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Update Intro Video</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Video URL</label>
                    <input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Enter video URL"
                    />
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
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}