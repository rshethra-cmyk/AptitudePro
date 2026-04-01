import express from 'express';
import Question from '../models/Question.js';
import Result from '../models/Result.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get topics
router.get('/topics', (req, res) => {
  res.json([
    { id: 'quantitative', name: 'Quantitative Aptitude' },
    { id: 'verbal', name: 'Verbal Ability' },
    { id: 'logical', name: 'Logical Reasoning' },
    { id: 'programming', name: 'Programming Languages' }
  ]);
});

// Get subtopics based on topic
router.get('/subtopics/:topic', (req, res) => {
  const { topic } = req.params;
  const subtopicsList = {
    quantitative: ['Time & Work', 'Profit & Loss', 'Simple Interest', 'Percentages'],
    verbal: ['Synonyms', 'Antonyms', 'Sentence Correction', 'Reading Comprehension'],
    logical: ['Number Series', 'Blood Relations', 'Coding Decoding', 'Seating Arrangement'],
    programming: ['C', 'Java', 'Python', 'C++']
  };
  
  res.json(subtopicsList[topic] || []);
});

// Get random 10 questions
router.get('/questions', async (req, res) => {
  try {
    const { topic, subtopic } = req.query;
    let match = {};
    if (topic) match.topic = topic;
    if (subtopic) match.subtopic = subtopic;

    const questions = await Question.aggregate([
      { $match: match },
      { $sample: { size: 10 } }
    ]);
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit quiz results
router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { topic, score, totalQuestions } = req.body;
    
    const result = new Result({
      userId: req.user.id,
      topic,
      score,
      totalQuestions: totalQuestions || 10
    });
    
    await result.save();
    res.status(201).json({ message: 'Result saved successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
