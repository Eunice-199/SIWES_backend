const mongoose = require('mongoose');

var Supervisor = mongoose.model('Supervisor', {
    title: { type: String },
    name: { type: String },
    studMatNo: { type: Number },
    phoneNo: { type: Number },
    comments: { type: String },
    location: { type: String }

});

var matNo = mongoose.model('MatNo', {
    studMatNo: { type: Number },
});


module.exports = { Supervisor, matNo };