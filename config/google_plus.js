var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').Strategy;

passport.use(new GoogleStrategy(
  {
    clientID      : process.env.WDI_PROJECT_2_GOOGLE_CLIENT_ID,
    clientSecret  : process.env.WDI_PROJECT_2_GOOGLE_CLIENT_SECRET,
    callbackURL   : "http://127.0.0.1:3000/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

module.exports=passport;
