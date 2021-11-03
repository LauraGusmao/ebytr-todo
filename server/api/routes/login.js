const express = require('express');

const { loginController } = require('../../src/controllers');

const router = express.Router();

router.post('/', loginController);

module.exports = router;
