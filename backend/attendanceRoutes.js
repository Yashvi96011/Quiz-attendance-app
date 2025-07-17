const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middleware/auth');

// @route   GET api/attendance/:quizId
// @desc    Get attendance report for a quiz
// @access  Private (Teacher/Admin)
router.get('/:quizId', auth, attendanceController.getAttendanceReport);

// @route   POST api/attendance/verify-location
// @desc    Verify student location
// @access  Private
router.post('/verify-location', auth, attendanceController.verifyLocation);

module.exports = router;
