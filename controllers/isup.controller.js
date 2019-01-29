const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Isup = mongoose.model('Isup');

module.exports.register1 = (req, res, next) => {
    var isup = new Isup();
    isup.email = req.body.email;
    isup.phoneNo = req.body.phoneNo;
    isup.password = req.body.password;
    isup.save((err, doc) => {
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
module.exports.authenticate1 = (req, res, next) => {
    // call for passport authentication
    passport.authenticate1('local', (err, isup, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (isup) return res.status(200).json({ "token": isup.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.isupDashboard = (req, res, next) => {
    Isup.findOne({ _id: req._id },
        (err, isup) => {
            if (!isup)
                return res.status(404).json({ status: false, message: 'Industry Supervisor record not found.' });
            else
                return res.status(200).json({ status: true, is: _.pick(is, ['phoneNo', 'email']) });
        }
    );
}