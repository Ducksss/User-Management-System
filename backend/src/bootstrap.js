const loginRoute = require('./routes/loginRoute')
const manageUserRoute = require('./routes/manageUserRoute')
const restaurantLandingPageRoute = require('./routes/restaurantLandingPageRoute')
const manageMenuRoute = require('./routes/manageMenuRoute')
const encryptionRoute = require('./routes/encryptionRoute')

module.exports = (app, router) => {
    loginRoute.route(router)
    manageUserRoute.route(router)
    restaurantLandingPageRoute.route(router)
    manageMenuRoute.route(router)
    encryptionRoute.route(router)
};