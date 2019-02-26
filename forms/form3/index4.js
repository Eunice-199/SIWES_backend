const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('../form3/db');
var supervisorControllers = require('../form3/controllers/supervisorControllers');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3004, () => console.log('Server started at port : 3004'));


app.use('/supervisors', supervisorControllers);