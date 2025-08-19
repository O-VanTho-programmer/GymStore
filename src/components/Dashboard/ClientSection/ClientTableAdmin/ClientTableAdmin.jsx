import ButtonSmall from "@/components/ButtonSmall/ButtonSmall";
import SearchBar from "@/components/SearchBar/SearchBar";
import React from "react";

function ClientTableAdmin({ users, isTrainer, setTrainerId }) {

  return (
    <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md'>
      <h3 className='text-lg font-semibold mb-4'>{isTrainer ? "Trainer Details" : "Client Details"}</h3>
      <div className="border-b border-black flex justify-center gap-5">
        <SearchBar />
      </div>
      <div className="overflow-x-scroll overflow-y-scroll max-h-[400px]">
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2 border-b border-gray-300 text-left'>ID</th>
              <th className='py-2 border-b border-gray-300 text-left'>Username</th>
              <th className='py-2 border-b border-gray-300 text-left'>Email</th>
              <th className='py-2 border-b border-gray-300 text-left'>Phone</th>
              <th className='py-2 border-b border-gray-300 text-left'>Expertise</th>
              <th className='py-2 border-b border-gray-300 text-left'>Rating</th>
              <th className='py-2 border-b border-gray-300 text-left'></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr onClick={() => setTrainerId(user.userId)} className='cursor-pointer hover:bg-gray-100'>
                <td className='py-2 border-b border-gray-300'>{user.userId || "N/A"}</td>
                <td className='py-2 border-b border-gray-300'>{user.username || "N/A"}</td>
                <td className='py-2 border-b border-gray-300'>{user.email || "N/A"}</td>
                <td className='py-2 border-b border-gray-300'>{user.phone_number || "N/A"}</td>
                {isTrainer && (
                  <>
                    <td className='py-2 border-b border-gray-300'>{user.expertise || "N/A"}</td>
                    <td className='py-2 border-b border-gray-300'>{user.rating || "N/A"}</td>
                  </>
                )}
                <td className='py-2'>
                  <a href={`/profile`} className='text-blue-500 hover:text-blue-700 mr-2'>View</a>
                  <a href={`#`} className='text-red-500 hover:text-red-700'>Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientTableAdmin;
