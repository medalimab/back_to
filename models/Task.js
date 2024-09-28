const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 
const user = require('./User'); 

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Incomplete',
  },
}, {
  tableName: 'tasks', 
  timestamps: true, 
});


user.hasMany(Task, {
  foreignKey: 'userId', 
  as: 'tasks',
  onDelete: 'CASCADE', 
});

Task.belongsTo(user, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = Task;
