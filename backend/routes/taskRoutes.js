const express = require('express');
const { 
  getTasks, 
  getTask, 
  createTask, 
  updateTask, 
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');

// Auth middleware
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.route('/stats').get(protect, getTaskStats);

module.exports = router;
