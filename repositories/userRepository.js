const User = require('../models/User');

const findAll = async () => {
  return await User.findAll();
};
const findOne = async (condition) => {
    return await User.findOne(condition);
  };

const create = async (userData) => {
  return await User.create(userData);
};
const update = async (id, updateData) => {
  
  const [affectedRows] = await User.update(updateData, {
    where: { id },
});


if (affectedRows === 0) {
    throw new Error('User not found or no changes made');
}


const updatedUser = await User.findOne({ where: { id } });


return [affectedRows, [updatedUser]];
};


module.exports = {
  findAll,
  create,
  findOne,
  update
};
