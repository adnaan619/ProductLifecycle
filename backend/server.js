const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

// Import routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanagement';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
