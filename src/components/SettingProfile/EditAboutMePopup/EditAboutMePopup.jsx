import React, { useState } from 'react';

function EditAboutMePopup({ onClose, onSave }) {
    const [aboutMe, setAboutMe] = useState('Hello, my name is Van Tho...');

    const handleSave = () => {
        onSave(aboutMe);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit About Me</h2>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    rows={5}
                />
                <div className="flex justify-end gap-4 mt-4">
                    <button 
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditAboutMePopup;