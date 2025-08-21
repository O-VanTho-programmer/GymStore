'use client';
import getCurrentUser from '@/utils/getCurrentUser';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingWrapper from '@/components/Loading/LoadingWrapper';
import Loading from '@/components/Loading/Loading';

function Page() {
  const [email, setEmail] = useState('admin2@gmail.com');
  const [password, setPassword] = useState('123');
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await axios.post('gymstore-production.up.railway.app/api/login', { email, password });
      const token = response.data.token;

      if (token) {
        localStorage.setItem('user', token);
        const user = getCurrentUser(); 
        setCurrentUser(user); 
      } else {
        setError('No token returned from the server.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) {
    return (
      <LoadingWrapper loadingText="Welcome back!">
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
      </LoadingWrapper>
    );
  }

  return (
    <LoadingWrapper loadingText="Loading login page...">
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
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full p-2 rounded text-white text-lg transition-colors ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loading size="small" text="" />
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <a href="/sign_up" className="text-blue-500">
              Don't have an account? Sign up
            </a>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </LoadingWrapper>
  );
}

export default Page;
