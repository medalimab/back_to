const taskService = require('../services/taskService');

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(200).json({ success: true, data: task, message: 'Task created successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json({ success: true, data: task, message: 'Task updated successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const task = await taskService.updateStatus(req.params.id, req.body.status);
    res.status(200).json({ success: true, data: task, message: 'Task status updated successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllTasksByUserId = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasksByUserId(req.params.userId);
    res.status(200).json({ success: true, data: tasks, message: 'Tasks retrieved successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getTasksByUserIdAndStatus = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUserIdAndStatus(req.params.userId, req.params.status);
    res.status(200).json({ success: true, data: tasks, message: 'Tasks retrieved successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json({ success: true, data: task, message: 'Task retrieved successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteTaskIfIncomplete = async (req, res) => {
  try {
    const deletedCount = await taskService.deleteTaskIfIncomplete(req.params.id);
    res.status(200).json({ success: true, message: 'Task deleted successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createTask,
  updateTask,
  updateStatus,
  getAllTasksByUserId,
  getTasksByUserIdAndStatus,
  getTaskById,
  deleteTaskIfIncomplete,
};
