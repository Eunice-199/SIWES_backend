const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('../form2/db');
var formbControllers = require('../form2/controllers/formbControllers');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3003, () => console.log('Server started at port : 3003'));


app.use('/formbs', formbControllers);