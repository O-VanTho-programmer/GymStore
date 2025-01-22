'use client';
import React, { useEffect, useState } from 'react';

function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [isClient, setIsClient] = useState(false);
 
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {isClient ? 
      <div className="p-5 rounded-lg shadow-lg bg-white max-w-md w-full">
        <h2 className="text-center mb-5 text-2xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>
          <button type="submit" className="w-full p-2 rounded bg-blue-500 text-white text-lg">Login</button>
        </form>
        <div className="text-center mt-4">
            <a href='/sign_up' className="text-blue-500">Don't have an account? Sign up</a>
        </div>
      </div> 
      : <></>}
    </div>
  );
}

export default page;