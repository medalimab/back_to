const Task = require('../models/Task');


const create = async (taskData) => {
  return await Task.create(taskData);
};


const updateTask = async (id, taskData) => {
  return await Task.update(taskData, { where: { id }, returning: true });
};


const updateStatus = async (id, status) => {
  return await Task.update({ status }, { where: { id }, returning: true });
};


const findAllByUserId = async (userId) => {
  return await Task.findAll({ where: { userId } });
};


const findByUserIdAndStatus = async (userId, status) => {
  return await Task.findAll({ where: { userId, status } });
};


const findById = async (id) => {
  return await Task.findByPk(id);
};


const deleteIfIncomplete = async (id) => {
  const task = await Task.findByPk(id);
  if (task && task.status === 'Incomplete') {
    return await Task.destroy({ where: { id } });
  }
  return null;
};

module.exports = {
  create,
  updateTask,
  updateStatus,
  findAllByUserId,
  findByUserIdAndStatus,
  findById,
  deleteIfIncomplete,
};
