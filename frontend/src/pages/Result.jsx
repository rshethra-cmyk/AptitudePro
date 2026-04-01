import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const score = state?.score || 0;
  const total = state?.total || 10;
  const percentage = Math.round((score / total) * 100);

  let message = "Keep learning!";
  if (percentage >= 80) message = "Excellent! Outstanding performance.";
  else if (percentage >= 50) message = "Good job! But there's room for improvement.";

  return (
    <div className="flex flex-col items-center justify-center h-full pt-10 text-center">
      <div className="w-32 h-32 rounded-full border-8 border-blue-100 flex items-center justify-center mb-6">
        <span className="text-4xl font-black text-blue-600">{score}/{total}</span>
      </div>
      <h2 className="text-3xl font-bold mb-2 text-gray-800">{percentage}% Score</h2>
      <p className="text-gray-600 mb-10 px-4">{message}</p>
      
      <button 
        onClick={() => navigate('/')}
        className="w-full max-w-xs bg-blue-600 text-white p-4 rounded-xl font-bold uppercase tracking-wide shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
      >
        Back to Home
      </button>
    </div>
  );
}
