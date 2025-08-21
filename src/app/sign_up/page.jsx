'use client';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('gymstore-production.up.railway.app/api/sign_up', {
        username, email, password
      });

      console.log("User data:", response.data.user);
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.error || "Failed to sign up");
    }

  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {isClient ? (
        <div className="p-5 rounded-lg shadow-lg bg-white max-w-md w-full">
          <h2 className="text-center mb-5 text-2xl font-semibold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
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
            <div className="mb-4">
              <label className="block mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2">Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <button type="submit" className="w-full p-2 rounded bg-blue-500 text-white text-lg">Sign Up</button>
          </form>
          <div className="text-center mt-4">
            <a href='/login' className="text-blue-500">Already have account? Let login</a>
          </div>

          {error && <p className='absolute text-red-600'>{error}</p>}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SignUpPage;