import React from 'react'

function PTClientServed({client}) {
    return (
        <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md'>
            <h3 className='text-lg font-semibold mb-4'>Client Served</h3>
            <div className="overflow-x-auto">
                <table className='min-w-full bg-white'>
                    <thead>
                        <tr>
                            <th className='py-2 border-b border-gray-300 text-left'>Username</th>
                            <th className='py-2 border-b border-gray-300 text-left'>Email</th>
                            <th className='py-2 border-b border-gray-300 text-left'>Start Date</th>
                            <th className='py-2 border-b border-gray-300 text-left'>End Date</th>
                            <th className='py-2 border-b border-gray-300 text-left'>Session</th>
                            <th className='py-2 border-b border-gray-300 text-left'>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='py-2 border-b border-gray-300'>john_doe</td>
                            <td className='py-2 border-b border-gray-300'>john@example.com</td>
                            <td className='py-2 border-b border-gray-300'>2024/12/1</td>
                            <td className='py-2 border-b border-gray-300'>2025/1/1</td>
                            <td className='py-2 border-b border-gray-300'>5</td>
                            <td className='py-2 border-b border-gray-300'>Good</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PTClientServed