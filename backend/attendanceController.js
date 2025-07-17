const Attendance = require('../models/Attendance');
const Quiz = require('../models/Quiz');
const User = require('../models/User');

exports.getAttendanceReport = async (req, res) => {
  try {
    const { quizId } = req.params;
    
    const attendances = await Attendance.find({ quiz: quizId })
      .populate('student', 'name studentId email')
      .sort({ timestamp: -1 });

    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyLocation = async (req, res) => {
  try {
    const { longitude, latitude, quizId } = req.body;
    
    // Get classroom location from quiz (assuming it's stored)
    const quiz = await Quiz.findById(quizId);
    if (!quiz || !quiz.classroomLocation) {
      return res.status(400).json({ message: 'Quiz or classroom location not found' });
    }

    // Calculate distance (simplified - in production use proper geospatial calculation)
    const distance = calculateDistance(
      latitude,
      longitude,
      quiz.classroomLocation.coordinates[1],
      quiz.classroomLocation.coordinates[0]
    );

    const isWithinRange = distance <= config.gps.allowedDistance;
    
    res.json({
      isWithinRange,
      distance,
      allowedDistance: config.gps.allowedDistance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Haversine formula implementation
  const R = 6371e3; // meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}
