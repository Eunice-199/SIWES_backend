const express = require('express');
const router = express.Router();


const jwtHelper = require('../config/jwtHelper');

const ctrlIsup = require('../controllers/isup.controller');



router.post('/register', ctrlIsup.register);
router.post('/authenticate', ctrlIsup.authenticate);
router.get('/isupDashboard', jwtHelper.verifyJwtToken, ctrlIsup.isupDashboard);

module.exports = router;