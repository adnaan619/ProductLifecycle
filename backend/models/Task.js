const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: false,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    required: true,
    enum: ['to-do', 'in-progress', 'completed'],
    default: 'to-do'
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field on save
TaskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', TaskSchema);
