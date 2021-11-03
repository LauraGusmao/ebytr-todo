const express = require('express');

const { usersController } = require('../controllers');

const router = express.Router();

router.post('/new', usersController.registerUser);

module.exports = router;
