var instagram = require('instagram-node').instagram();

instagram.use({ access_token: process.env.WDI_PROJECT_3_INSTAGRAM_ACCESS_TOKEN});

module.exports = instagram;
