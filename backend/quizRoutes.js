const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const auth = require('../middleware/auth');

// @route   POST api/quiz
// @desc    Create a new quiz
// @access  Private (Teacher/Admin)
router.post('/', auth, quizController.createQuiz);

// @route   POST api/quiz/session
// @desc    Start a quiz session
// @access  Private (Teacher/Admin)
router.post('/session', auth, quizController.startQuizSession);

// @route   POST api/quiz/submit
// @desc    Submit quiz answers
// @access  Private (Student)
router.post('/submit', auth, quizController.submitQuiz);

module.exports = router;
