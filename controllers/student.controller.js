const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Student = mongoose.model('Student');

module.exports.register = (req, res, next) => {
    var student = new Student();
    student.matricNo = req.body.matricNo;
    student.email = req.body.email;
    student.password = req.body.password;
    student.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, student, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (student) return res.status(200).json({ "token": student.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.studentDashboard = (req, res, next) => {
    Student.findOne({ _id: req._id },
        (err, student) => {
            if (!student)
                return res.status(404).json({ status: false, message: 'Student record not found.' });
            else
                return res.status(200).json({ status: true, student: _.pick(student, ['matricNo', 'email']) });
        }
    );
}