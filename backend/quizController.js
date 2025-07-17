const Quiz = require('../models/Quiz');
const Attendance = require('../models/Attendance');
const config = require('../config/config');
const { generateSessionCode } = require('../utils/helpers');

exports.createQuiz = async (req, res) => {
  try {
    const { title, description, questions, timeLimit } = req.body;
    
    const quiz = new Quiz({
      title,
      description,
      questions,
      timeLimit,
      createdBy: req.user.id
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.startQuizSession = async (req, res) => {
  try {
    const { quizId, location } = req.body;
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const sessionCode = generateSessionCode(config.session.codeLength);
    const expiryTime = new Date(Date.now() + config.session.codeExpiry);

    res.json({
      sessionCode,
      expiryTime,
      quizId: quiz._id,
      timeLimit: quiz.timeLimit
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, sessionCode, answers, location } = req.body;
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Verify session code (implementation depends on your session management)
    // Verify location (should be within allowed distance from classroom)

    let totalScore = 0;
    const answerResults = answers.map(answer => {
      const question = quiz.questions.id(answer.questionId);
      const isCorrect = question.correctAnswer === answer.answer;
      if (isCorrect) totalScore += question.points;
      
      return {
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect,
        pointsEarned: isCorrect ? question.points : 0
      };
    });

    const attendance = new Attendance({
      student: req.user.id,
      quiz: quizId,
      sessionCode,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      },
      answers: answerResults,
      totalScore
    });

    await attendance.save();
    res.json({ 
      message: 'Quiz submitted successfully',
      score: totalScore,
      totalPossible: quiz.questions.reduce((sum, q) => sum + q.points, 0)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
