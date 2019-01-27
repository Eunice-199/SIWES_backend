const mongoose = require('mongoose');

var StudentEvaluate = mongoose.model('StudentEvaluate', {
    matricNo: { type: Number },
    score: { type: Number },
    grade: { type: String }

});

module.exports = { StudentEvaluate };