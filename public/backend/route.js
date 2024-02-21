const express = require('express');
const router = express.Router();
const { getAllUsers } = require('./controller');

router.get('/users', getAllUsers);

module.exports = router;
