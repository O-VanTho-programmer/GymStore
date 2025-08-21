'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

function page() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get('gymstore-production.up.railway.app/api/pt_applications');
                setApplications(res.data.applications);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleApprove = async (userId) => {
        try {
            await axios.post('gymstore-production.up.railway.app/api/approve_application', { userId });
            setApplications(applications.map(app => app.userId === userId ? { ...app, status: 'approved' } : app));
        } catch (error) {
            console.error('Error approving application:', error);
        }
    };

    const handleReject = async (userId) => {
        try {
            await axios.post('gymstore-production.up.railway.app/api/reject_application', { userId });
            setApplications(applications.map(app => app.userId === userId ? { ...app, status: 'rejected' } : app));
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">PT Applications</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">User</th>
                            <th className="py-3 px-4 text-left">Bio</th>
                            <th className="py-3 px-4 text-left">Certifications</th>
                            <th className="py-3 px-4 text-left">Experience</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Contact</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.userId} className="border-b">
                                <td className="py-3 px-4 max-w-[230px]">{app.username} ({app.email})</td>
                                <td className="py-3 px-4 whitespace-pre-line">{app.bio}</td>
                                <td className="py-3 px-4 whitespace-pre-line">{app.certification}</td>
                                <td className="py-3 px-4">{app.year_of_exp} years</td>
                                <td className={`py-3 px-4 font-semibold ${app.status === 'approved' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-gray-600'}`}>{app.status}</td>
                                <td className="py-3 px-4 whitespace-pre-line">{app.contact_infor}</td>
                                <td className="py-3 px-4 text-center">
                                    {app.status === 'Pending' && (
                                        <>
                                            <button onClick={() => handleApprove(app.user_id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Approve</button>
                                            <button onClick={() => handleReject(app.user_id)} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default page;
