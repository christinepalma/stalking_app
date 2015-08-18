


var instagram = require('instagram-node').instagram();


instagram.use({ access_token: process.env.WDI_PROJECT_3_INSTAGRAM_ACCESS_TOKEN});
instagram.use({ client_id: process.env.WDI_PROJECT_3_INSTAGRAM_CLIENT_ID,
                client_secret: process.env.WDI_PROJECT_3_INSTAGRAM_CLIENT_SECRET});




module.exports = instagram;
