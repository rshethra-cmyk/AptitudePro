import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get(
          `/api/quiz/questions?topic=${topic}&subtopic=${encodeURIComponent(subtopic)}`
        );
        setQuestions(res.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();

    // Timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = async () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q._id] === q.correctAnswer) score++;
    });

    try {
      const token = localStorage.getItem('token');
      await api.post('/api/quiz/submit',
        { topic, score, totalQuestions: questions.length },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/result', { state: { score, total: questions.length } });
    } catch (error) {
      console.error('Submit error:', error);
      navigate('/result', { state: { score, total: questions.length } });
    }
  };

  if (questions.length === 0) return <p className="p-4">Loading...</p>;

  const q = questions[currentIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
        <span className="font-bold text-gray-600">Q {currentIndex + 1} / {questions.length}</span>
        <span className={`font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
          ⏱ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">{q.question}</h3>
        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelectOption(q._id, opt)}
              className={`p-4 rounded-lg text-left border ${answers[q._id] === opt ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-700'} hover:bg-gray-50 transition-colors cursor-pointer w-full`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          className="px-6 py-2 bg-gray-200 rounded-lg font-semibold text-gray-700 disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        {currentIndex === questions.length - 1 ? (
          <button onClick={handleSubmit} className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold">
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
