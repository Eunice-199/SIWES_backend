const express = require('express');
const router = express.Router();

const ctrlStudent = require('../controllers/student.controller');
const jwtHelper = require('../config/jwtHelper');





router.post('/register', ctrlStudent.register);
router.post('/authenticate', ctrlStudent.authenticate);
router.get('/studentDashboard', jwtHelper.verifyJwtToken, ctrlStudent.studentDashboard);



module.exports = router;