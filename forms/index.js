const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var formaControllers = require('./controllers/formaControllers');
var studentEvaluateControllers = require('./controllers/studentEvaluateControllers');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3002, () => console.log('Server started at port : 3002'));


app.use('/formas', formaControllers);
app.use('/studEva', studentEvaluateControllers);