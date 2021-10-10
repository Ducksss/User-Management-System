//config.js
const dotenv = require('dotenv');
dotenv.config(); //Build the process.env object.
const config = {
    baseUrl: "http://localhost:8003/api", // No trailing slash here
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
};

export default config;