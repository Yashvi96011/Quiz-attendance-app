module.exports = {
  database: {
    url: 'mongodb://localhost:27017/quiz_attendance',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  },
  jwt: {
    secret: 'your_jwt_secret_key',
    expiresIn: '1h'
  },
  session: {
    codeLength: 6,
    codeExpiry: 15 * 60 * 1000 // 15 minutes
  },
  gps: {
    allowedDistance: 50 // meters
  }
};
