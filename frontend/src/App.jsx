import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Subtopics from './pages/Subtopics';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen max-w-md mx-auto bg-gray-50 shadow-lg flex flex-col relative">
        <header className="bg-blue-600 text-white p-4 shadow-md text-center">
          <h1 className="text-xl font-bold">AptitudePro</h1>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/subtopics/:topicId" element={<PrivateRoute><Subtopics /></PrivateRoute>} />
            <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
            <Route path="/result" element={<PrivateRoute><Result /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
