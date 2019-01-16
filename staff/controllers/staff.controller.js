const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Staff = mongoose.model('Staff');

module.exports.register = (req, res, next) => {
    var staff = new Staff();
    staff.staffId = req.body.staffId;
    staff.email = req.body.email;
    staff.password = req.body.password;
    staff.save((err, doc) => {
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
    passport.authenticate('local', (err, staff, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (staff) return res.status(200).json({ "token": staff.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.staffDashboard = (req, res, next) => {
    Staff.findOne({ _id: req._id },
        (err, staff) => {
            if (!staff)
                return res.status(404).json({ status: false, message: 'Staff record not found.' });
            else
                return res.status(200).json({ status: true, staff: _.pick(staff, ['staffId', 'email']) });
        }
    );
}