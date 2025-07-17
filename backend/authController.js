const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

exports.register = async (req, res) => {
  try {
    const { studentId, name, email, password, role } = req.body;
    
    const userExists = await User.findOne({ $or: [{ studentId }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ studentId, name, email, password, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });

    res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { studentId, password, deviceId } = req.body;
    
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update device ID for fraud prevention
    if (deviceId) {
      user.deviceId = deviceId;
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
