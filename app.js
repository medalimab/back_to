/** @format */

const express = require('express');
const sequelize = require('./models/index');
const userController = require('./controllers/userController');
const loginController = require('./controllers/LoginController');
const taskController = require('./controllers/taskController');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/login', loginController.login);

app.get('/users', userController.getUsers);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.get('/users/:id', userController.getUserById);

app.post('/tasks', taskController.createTask); 
app.put('/tasks/:id', taskController.updateTask); 
app.patch('/tasks/:id/status', taskController.updateStatus); 
app.patch('/tasks/:id', taskController.updateTask); 
app.get('/tasks/user/:userId', taskController.getAllTasksByUserId); 
app.get('/tasks/user/:userId/status/:status', taskController.getTasksByUserIdAndStatus); 
app.get('/tasks/:id', taskController.getTaskById); 
app.delete('/tasks/:id', taskController.deleteTaskIfIncomplete); 


sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  
    app.listen(3001, () => {
      console.log(`Server running on port ${3001}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
