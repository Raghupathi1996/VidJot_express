const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Load user model
const User = mongoose.model('Users')

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        // Match the user
        User.findOne({
            email:email
        }).then(user => {
            if(!user){
                return done(null, false, {message: 'No User Found'});
            }
            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Password Incorrect'})
                }
            })
        })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user._id)
    })
    passport.deserializeUser(function(id, done) {
        User.findById(id)
        .then((user, err) => {
            done(err, user)
        })
        
    })
}