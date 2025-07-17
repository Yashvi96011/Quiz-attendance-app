const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    enum: ['mcq', 'text', 'math'],
    required: true
  },
  options: [String],
  correctAnswer: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 1
  }
});

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [QuestionSchema],
  timeLimit: {
    type: Number, // in minutes
    default: 10
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', QuizSchema);
