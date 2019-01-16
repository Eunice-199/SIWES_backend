const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Staff = mongoose.model('Staff');

passport.use(
    new localStrategy({ usernameField: 'staffId' },
        (username, password, done) => {
            Staff.findOne({ staffId: username },
                (err, staff) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!staff)
                        return done(null, false, { message: 'Staff id is not registered' });
                    // wrong password
                    else if (!staff.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, staff);
                });
        })
);