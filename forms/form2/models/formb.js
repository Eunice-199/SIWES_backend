const mongoose = require('mongoose');

var Formb = mongoose.model('Formb', {
    name: { type: String },
    matricNo: { type: Number },
    department: { type: String },
    company: { type: String },
    address: { type: String },
    allowances: { type: Number },
    workdone: { type: String },
    weeks: { type: Number }
});

module.exports = { Formb };