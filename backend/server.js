const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mern-course-app')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));

// API Routes
app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
