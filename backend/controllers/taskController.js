const Task = require('../models/Task');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to access this task' });
    }

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to update this task' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this task' });
    }

    await task.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get task statistics for analytics
// @route   GET /api/tasks/stats
// @access  Private
exports.getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $match: { user: mongoose.Types.ObjectId(req.user.id) }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format the data for easy consumption by the frontend
    const formattedStats = {
      'to-do': 0,
      'in-progress': 0,
      'completed': 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.status(200).json({ success: true, data: formattedStats });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
