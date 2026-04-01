import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  subtopic: { type: String, required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
});

export default mongoose.model('Question', questionSchema);
