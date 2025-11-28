const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const lessonRoutes = require('./src/routes/lessonRoutes');
const quizRoutes = require('./src/routes/quizRoutes');
const mockExamRoutes = require('./src/routes/mockExamRoutes');
const progressRoutes = require('./src/routes/progressRoutes');
const subscriptionRoutes = require('./src/routes/subscriptionRoutes');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/mockexams', mockExamRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

const express = require('express');
const cors = require('cors');

const lessonRoutes = require('./src/routes/lessonRoutes');
const quizRoutes = require('./src/routes/quizRoutes');
const mockExamRoutes = require('./src/routes/mockExamRoutes');


// Any request starting with /api/lessons will be handled by lessonRoutes
app.use('/api/lessons', lessonRoutes);

// Any request starting with /api/quizzes will be handled by quizRoutes
app.use('/api/quizzes', quizRoutes);

// Any request starting with /api/mockexams will be handled by mockExamRoutes
app.use('/api/mockexams', mockExamRoutes);


// Start the server
app.listen(port, () => {
  console.log(`E-learning server running on http://localhost:${port}`);
  console.log('Ready to handle requests for lessons, quizzes, and mock exams!');
});

app.listen(port, () => {
  console.log(`E-learning server running on http://localhost:${port}`);
  console.log('Ready to handle requests!');
});