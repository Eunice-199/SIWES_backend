const express = require('express');
const router = express.Router();

const ctrlStaff = require('../controllers/staff.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlStaff.register);
router.post('/authenticate', ctrlStaff.authenticate);
router.get('/staffDashboard', jwtHelper.verifyJwtToken, ctrlStaff.staffDashboard);

module.exports = router;