const loginRoute = require('./routes/loginRoute')
const manageUserRoute = require('./routes/manageUserRoute')
const resettingPasswordRoute = require('./routes/resettingPasswordRoute')
const encryptionRoute = require('./routes/encryptionRoute')
const subscriptionRoute = require('./routes/subscriptionRoute')

module.exports = (app, router) => {
    loginRoute.route(router)
    manageUserRoute.route(router)
    resettingPasswordRoute.route(router)
    encryptionRoute.route(router)
    subscriptionRoute.route(router)
};