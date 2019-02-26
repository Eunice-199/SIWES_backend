const mongoose = require('mongoose');

var Evaluate = mongoose.model('Evaluate', {
    matricNo: { type: Number },
    dressing: { type: Number },
    presentation: { type: Number },
    audibility: { type: Number },
    composture: { type: Number },
    workdone: { type: Number }


});

module.exports = { Evaluate };