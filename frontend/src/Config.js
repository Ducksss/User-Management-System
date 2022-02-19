//config.js
const dotenv = require('dotenv');
dotenv.config(); //Build the process.env object.
const config = {
    baseUrl: "http://localhost:8003/api", // No trailing slash here
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: "pk_test_51JGzn3FHCNlc2sRxjF3QjRNI553RlKSJvYYb5aopFEWryIiNRVES320DyFdtLOQkE9PZgDJg3Jd6QBp4J1cyT0rW00tIu4SRDC",
};

export default config;