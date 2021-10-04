const { body } = require('express-validator')

module.exports.validateAddUser = () => {
    return [
        body('firstName').not().isEmpty().trim().escape(),
        body('firstName').not().isEmpty().trim().escape(),
        body('email').exists().isEmail(),
        body('password').exists().isLength({ min: 5 }),
        body('contact').exists().isInt(),
    ]
}

// firstName: values.firstName,
// lastName: values.lastName,
// email: values.email,
// password: values.password,
// contact: values.contactNumber,