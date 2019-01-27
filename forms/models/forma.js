const mongoose = require('mongoose');

var Forma = mongoose.model('Forma', {
    name: { type: String },
    matricNo: { type: Number },
    position: { type: String },
    company: { type: String },
    address: { type: String },
    telephone: { type: Number }
});

module.exports = { Forma };