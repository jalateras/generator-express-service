var passport = require('passport');
var util = require('util');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config/config');

module.exports = function(app) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
      clientID: config.get('GOOGLE_APP_ID'),
      clientSecret: config.get('GOOGLE_APP_SECRET'),
      callbackURL: '/auth/google/callback'
    },

    function(accessToken, refreshToken, profile, done) {
      if (config.isAuthorized(profile.emails[0].value)) {
        done(null, profile);
      } else {
        done(null, false, { message: util.format('%s is not an authorized email address.' + profile.emails[0].value)});
      }
    }
  ));

  app.get('/login', function(req, res, next) {
    passport.authenticate('google', {
        scope: 'https://www.googleapis.com/auth/userinfo.email',
        approvalPrompt: 'force'}
    )(req, res, next);
  });

  app.get('/auth/google/callback', function(req, res, next) {
    var successRedirect = req.session.returnTo || '/';
    passport.authenticate('google', {
      successRedirect: successRedirect,
      failureRedirect: '/login'
    })(req, res, next);
  });
};

