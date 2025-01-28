import ButtonSmall from "@/components/ButtonSmall/ButtonSmall";
import SearchBar from "@/components/SearchBar/SearchBar";
import React from "react";

function ClientTableAdmin({ user, isTrainer }) {

  const commonHeaders = ["ID", "Name", "Email", "Phone", "Address"];
  const trainerHeaders = [...commonHeaders, "Clients", "Expertise"];
  const headers = isTrainer ? trainerHeaders : commonHeaders;

  return (
    <div className='flex-1 p-4 border border-gray-300 bg-white shadow-md rounded-md'>
      <h3 className='text-lg font-semibold mb-4'>{isTrainer ? "Trainer Details" : "Client Details"}</h3>
      <div className="border-b border-black flex justify-center gap-5">
        <SearchBar />
      </div>
      <div className="overflow-x-auto">
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className='py-2 border-b border-gray-300 text-left'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {user && (
              <tr>
                <td className='py-2 border-b border-gray-300'>{user.id || "N/A"}</td>
                <td className='py-2 border-b border-gray-300'>{user.name || "N/A"}</td>
                <td className='py-2 border-b border-gray-300'>{user.email || "N/A"}</td>
                <td className='py-2 border-b border-gray-300'>{user.phone || "N/A"}</td>
                <td className='py-2 border-b border-gray-300'>{user.address || "N/A"}</td>
                {isTrainer && (
                  <>
                    <td className='py-2 border-b border-gray-300'>{user.status || "Busy"}</td>
                    <td className='py-2 border-b border-gray-300'>{user.clients || "N/A"}</td>
                    <td className='py-2 border-b border-gray-300'>{user.rating || "N/A"}</td>
                    <td className='py-2 border-b border-gray-300'>{user.expertise || "N/A"}</td>
                  </>
                )}
                <td className='py-2 border-b border-gray-300'>View</td>
                <td className='py-2 border-b border-gray-300'>Edit</td>

              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientTableAdmin;
