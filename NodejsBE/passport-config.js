var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var db = require('./db');
var User = db.usuarioModel;

passport.use('local', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'clave'
},
  function(username, password, done) {
    User.findOne({ usuario: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(_id, done) {
    User.findById(_id, function(err, user) {
      done(err, user);
    });
  });
