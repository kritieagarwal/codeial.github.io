const passport = require('passport');
const JWYStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWYStrategy(opts, function (jwtPayload, done) {

    User.findById(jwtPayload._id)
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            console.log('Error in finding user from JWT');
            return
        });
}));

module.exports = passport;