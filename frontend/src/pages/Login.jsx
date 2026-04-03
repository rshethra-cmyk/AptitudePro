import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Welcome Back</h2>
      <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
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
          Login
        </button>
      </form>
      <p className="mt-6 text-gray-600">
        Don't have an account? <Link to="/signup" className="text-blue-600 font-bold">Sign up</Link>
      </p>
    </div>
  );
}
