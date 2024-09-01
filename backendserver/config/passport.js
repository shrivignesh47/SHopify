const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
require('dotenv').config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
    secretOrKey: process.env.JWT_SECRET // Secret key to verify the JWT
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                // Find the user by ID stored in JWT payload (_id)
                const user = await User.findById(jwt_payload._id);

                if (user) {
                    return done(null, user); // User found, attach user to req.user
                } else {
                    return done(null, false); // User not found
                }
            } catch (err) {
                console.error('Error in passport strategy:', err);
                return done(err, false); // Error in finding user
            }
        })
    );
};
