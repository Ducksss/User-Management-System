const loginRoute = require('./routes/loginRoute')
const manageUserRoute = require('./routes/manageUserRoute')
const restaurantLandingPageRoute = require('./routes/restaurantLandingPageRoute')
const manageMenuRoute = require('./routes/manageMenuRoute')
const subscriptionRoute = require('./routes/subscriptionRoute')
module.exports = (app, router) => {
    loginRoute.route(router)
    manageUserRoute.route(router)
    restaurantLandingPageRoute.route(router)
    manageMenuRoute.route(router)
    subscriptionRoute.route(router)
};