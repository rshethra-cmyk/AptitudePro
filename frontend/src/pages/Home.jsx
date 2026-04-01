import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get('https://aptitudepro-backend-ywhf.onrender.com/api/quiz/topics');
        setTopics(res.data);
      } catch (error) {
        console.error('Error fetching topics');
      }
    };
    fetchTopics();
  }, []);

  return (
    <div className="flex flex-col h-full pt-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Select a Topic</h2>
      <div className="grid grid-cols-1 gap-4">
        {topics.map(topic => (
          <button 
            key={topic.id}
            onClick={() => navigate(`/subtopics/${topic.id}`)}
            className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow active:scale-95"
          >
            <span className="text-lg font-semibold text-gray-700">{topic.name}</span>
            <span className="text-blue-500 font-bold text-xl">➔</span>
          </button>
        ))}
      </div>
    </div>
  );
}
