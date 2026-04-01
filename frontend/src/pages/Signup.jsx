import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://aptitudepro-backend-ywhf.onrender.com/api/auth/signup', { username, email, password });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Create Account</h2>
      <form onSubmit={handleSignup} className="w-full max-w-sm flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Username" 
          className="p-3 border rounded-lg outline-none focus:border-blue-500"
          value={username} onChange={e => setUsername(e.target.value)} required 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          className="p-3 border rounded-lg outline-none focus:border-blue-500"
          value={email} onChange={e => setEmail(e.target.value)} required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="p-3 border rounded-lg outline-none focus:border-blue-500"
          value={password} onChange={e => setPassword(e.target.value)} required 
        />
        <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg font-bold mt-2">
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login</Link>
      </p>
    </div>
  );
}
