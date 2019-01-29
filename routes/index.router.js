const express = require('express');
const router = express.Router();

const ctrlStudent = require('../controllers/student.controller');
const jwtHelper = require('../config/jwtHelper');

const ctrlIsup = require('../controllers/isup.controller');



router.post('/register', ctrlStudent.register);
router.post('/authenticate', ctrlStudent.authenticate);
router.get('/studentDashboard', jwtHelper.verifyJwtToken, ctrlStudent.studentDashboard);

router.post('/register1', ctrlIsup.register1);
router.post('/authenticate1', ctrlIsup.authenticate1);
router.get('/isupDashboard', jwtHelper.verifyJwtToken, ctrlIsup.isupDashboard);

module.exports = router;