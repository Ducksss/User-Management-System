const loginRoute = require('./routes/loginRoute')
const manageUserRoute = require('./routes/manageUserRoute')
const resettingPasswordRoute = require('./routes/resettingPasswordRoute')
const encryptionRoute = require('./routes/encryptionRoute')

module.exports = (app, router) => {
    loginRoute.route(router)
    manageUserRoute.route(router)
    resettingPasswordRoute.route(router)
};