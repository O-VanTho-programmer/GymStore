'use client'

import { useState } from 'react';
import axios from 'axios';

export default function EditIntroVideo({ onClose, onSave, profileId }) {
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleSave = async () => {
        if (!videoFile || !profileId) return;

        setLoading(true);
        
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('profileId', profileId);

        try {
            const res = await axios.post('http://localhost:5000/api/upload/video', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const videoUrl = res.data.videoUrl;
            onSave(videoUrl);
            onClose();
        } catch (error) {
            console.error('Error uploading video:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Upload Intro Video</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600" onClick={onClose}>
                        Cancel
                    </button>
                    <button 
                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}
