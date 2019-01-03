const express = require('express');
const router = express.Router();

const ctrlStudent = require('../controllers/student.controller');

router.post('/register', ctrlStudent.register);

module.exports = router;