var Twit = require('twit');

twitter = new Twit({
  consumer_key    : process.env.WDI_PROJECT_3_TWITTER_CONSUMER_KEY,
  consumer_secret : process.env.WDI_PROJECT_3_TWITTER_CONSUMER_SECRET,
  app_only_auth   : true
});

module.exports = twitter;
