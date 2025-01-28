'use client';
import getCurrentUser from '@/utils/getCurrentUser';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const token = response.data.token;

      if (token) {
        localStorage.setItem('user', token);
        const user = getCurrentUser(); 
        setCurrentUser(user); 
      } else {
        console.error('No token returned from the server.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to log in');
    }
  };

  if (currentUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-5 rounded-lg shadow-lg bg-white max-w-md w-full">
          <h3 className="text-2xl font-semibold text-center">Welcome Back!</h3>
          <p className="text-center text-gray-600 mt-2">
            Logged in as {currentUser.username}, a {currentUser.isTrainer ? 'Trainer' : 'Client'}
          </p>
          <div className="mt-5 flex justify-center">
            <a href="/store" className="p-2 bg-orange-500 text-white rounded-lg">
              Go to Store
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
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
          <button type="submit" className="w-full p-2 rounded bg-blue-500 text-white text-lg">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/sign_up" className="text-blue-500">
            Don't have an account? Sign up
          </a>
        </div>
        {error && <p className="absolute text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default Page;
