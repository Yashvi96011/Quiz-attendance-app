const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  sessionCode: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      answer: String,
      isCorrect: Boolean,
      pointsEarned: Number
    }
  ],
  totalScore: {
    type: Number,
    default: 0
  },
  attendanceStatus: {
    type: String,
    enum: ['present', 'absent', 'late'],
    default: 'present'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

AttendanceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Attendance', AttendanceSchema);
