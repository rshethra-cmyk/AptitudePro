import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Subtopics() {
  const { topicId } = useParams();
  const [subtopics, setSubtopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quiz/subtopics/${topicId}`);
        setSubtopics(res.data);
      } catch (error) {
        console.error('Error fetching subtopics');
      }
    };
    fetchSubtopics();
  }, [topicId]);

  return (
    <div className="flex flex-col h-full pt-4">
      <button onClick={() => navigate(-1)} className="text-blue-600 mb-4 self-start font-semibold">
        ← Back to Topics
      </button>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 capitalize">{topicId} Modules</h2>
      <div className="flex flex-col gap-3 overflow-y-auto pb-6">
        {subtopics.map((subtopic, index) => (
          <button 
            key={index}
            onClick={() => navigate(`/quiz?topic=${topicId}&subtopic=${subtopic}`)}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:bg-blue-50 transition-colors active:scale-95"
          >
            <span className="text-md font-medium text-gray-700">{subtopic}</span>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">Start Quiz</span>
          </button>
        ))}
        {subtopics.length === 0 && <p className="text-gray-500">No subtopics available.</p>}
      </div>
    </div>
  );
}
