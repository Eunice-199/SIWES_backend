const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var evaluateControllers = require('./controllers/evaluateControllers');


var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3005, () => console.log('Server started at port : 3005'));


app.use('/evaluates', evaluateControllers);