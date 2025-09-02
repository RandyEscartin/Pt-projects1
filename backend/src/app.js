const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is running!',
    endpoints: {
      'GET /api/tasks': 'Get all tasks (with search & filter)',
      'GET /api/tasks/:id': 'Get single task',
      'POST /api/tasks': 'Create new task',
      'PUT /api/tasks/:id': 'Update task',
      'DELETE /api/tasks/:id': 'Delete task'
    },
    queryParams: {
      search: 'Search by keyword in title/description',
      status: 'Filter by status (pending, in-progress, completed)',
      priority: 'Filter by priority (low, medium, high)'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

module.exports = app;
