var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new FacebookStrategy(
  {
    clientID      : process.env.WDI_PROJECT_3_FACEBOOK_APP_ID,
    clientSecret  : process.env.WDI_PROJECT_3_FACEBOOK_APP_SECRET,
    callbackURL   : "http://localhost:3000/auth/facebook/callback",
    profileFields : ["id","displayName","photos","emails","birthday","location"]
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.use(new GoogleStrategy(
  {
    clientID      : process.env.WDI_PROJECT_3_GOOGLE_CLIENT_ID,
    clientSecret  : process.env.WDI_PROJECT_3_GOOGLE_CLIENT_SECRET,
    callbackURL   : "http://127.0.0.1:3000/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

module.exports=passport;
