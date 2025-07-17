# 📚 Quiz Attendance System (Anti-Fraud Based)

A React-based attendance system using quizzes and GPS verification. This project ensures secure, fair, and easy attendance tracking for students and institutions.

## 🧠 Key Features
- 🎯 Dual verification (session code + GPS)
- 🧪 Quiz-based attendance
- 🔐 Anti-fraud checks
- 🧾 LocalStorage based data saving (extendable to Firebase)
- 🖥️ Clean UI with Tailwind CSS

## 📸 Screenshots

| Login | Quiz Code Entry |
|-------|------------------|
| ![](assets/1-login.png) | ![](assets/2-quiz-entry.png) |

| Quiz | Submission |
|------|------------|
| ![](assets/3-quiz.png) | ![](assets/4-submit.png) |

## 🧰 Tech Stack

- React.js
- Tailwind CSS
- HTML5 Geolocation API
- LocalStorage (can integrate Firebase)

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/quiz-attendance-app.git
cd quiz-attendance-app
npm install
npm start
```

## 💡 Folder Structure

```bash
quiz-attendance-app/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── App.js
│   └── firebase.js
├── assets/
│   └── screenshots
├── README.md
└── package.json

