const express = require('express');

const { tasksController } = require('../controllers');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.get('/', tasksController.getAllTasks);
router.get('/user', validateJWT, tasksController.getUsersTasks);
router.get('/search/:id', tasksController.findTaskById);
router.post('/new', validateJWT, tasksController.createTask);
router.put('/edit/:id', validateJWT, tasksController.updateTask);
router.delete('/delete/:id', validateJWT, tasksController.deleteTask);

module.exports = router;
