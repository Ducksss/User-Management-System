const { body } = require('express-validator')

module.exports.validateLogin = () => {
    return [
        body('email').exists().isEmail(),
        body('password').exists().isLength({ min: 5 }),
    ]
}

module.exports.validateAddUser = () => {
    return [
        body('firstName').not().isEmpty().trim().escape(),
        body('firstName').not().isEmpty().trim().escape(),
        body('email').exists().isEmail(),
        body('password').exists().isLength({ min: 5 }),
        body('contact').exists().isInt(),
    ]
}
