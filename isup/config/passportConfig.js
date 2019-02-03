const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Isup = mongoose.model('Isup');

passport.use(
    new localStrategy({ usernameField: 'phoneNo' },
        (username, password, done) => {
            Isup.findOne({ phoneNo: username },
                (err, isup) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!isup)
                        return done(null, false, { message: 'Phone Number is not registered' });
                    // wrong password
                    else if (!isup.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, isup);
                });
        })
);