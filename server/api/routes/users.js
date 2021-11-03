const express = require('express');

const { usersController } = require('../../src/controllers');

const router = express.Router();

router.post('/new', usersController.registerUser);

module.exports = router;
