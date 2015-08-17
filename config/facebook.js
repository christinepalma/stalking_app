var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy(
  {
    clientID      : process.env.WDI_PROJECT_2_FACEBOOK_APP_ID,
    clientSecret  : process.env.WDI_PROJECT_2_FACEBOOK_APP_SECRET,
    callbackURL   : "http://localhost:3000/auth/facebook/callback",
    profileFields : ["id","displayName","photos","emails","birthday","location"]
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

module.exports=passport;
