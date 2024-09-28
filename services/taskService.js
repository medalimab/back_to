const taskRepository = require('../repositories/taskRepository');
const userRepository = require('../repositories/userRepository');

const createTask = async (taskData) => {
  
  const user = await userRepository.findOne({ where: { id: taskData.userId } });
  if (!user) {
    throw new Error('User does not exist.');
  }
  return await taskRepository.create(taskData);
};

const updateTask = async (id, taskData) => {
  
  const task = await taskRepository.findById(id);
  if (!task) {
    throw new Error('Task not found.');
  }
  return await taskRepository.updateTask(id, taskData);
};

const updateStatus = async (id, status) => {
  
  const task = await taskRepository.findById(id);
  if (!task) {
    throw new Error('Task not found.');
  }
  return await taskRepository.updateStatus(id, status);
};

const getAllTasksByUserId = async (userId) => {
  
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User does not exist.');
  }
  return await taskRepository.findAllByUserId(userId);
};

const getTasksByUserIdAndStatus = async (userId, status) => {
  
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User does not exist.');
  }
  return await taskRepository.findByUserIdAndStatus(userId, status);
};

const getTaskById = async (id) => {
  const task = await taskRepository.findById(id);
  if (!task) {
    throw new Error('Task not found.');
  }
  return task;
};

const deleteTaskIfIncomplete = async (id) => {
  const deletedCount = await taskRepository.deleteIfIncomplete(id);
  if (deletedCount === null) {
    throw new Error('Task not found or not incomplete.');
  }
  return deletedCount;
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
