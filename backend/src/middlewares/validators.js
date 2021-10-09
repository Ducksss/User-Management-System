const validator = require('validator');
const rsaDecryption = require('../middlewares/rsaDecryption');
const key = require('../routes/encryptionRoute')

module.exports.validateEmail = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
    if (validator.isEmpty(decrypted)) {
        return res.status(409).send(codes(409, null, "Missing Field"));
    }
    if (!validator.isEmail(decrypted)) {
        return res.status(409).send(codes(409, null, "Input is not an Email"));
    }
    decrypted = validator.normalizeEmail(decrypted)
    return decrypted
}

module.exports.validateText = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
    if (validator.isEmpty(decrypted)) {
        return res.status(409).send(codes(409, null, "Missing Field"));
    }
    if (!validator.isAlphanumeric(decrypted)) {
        return res.status(409).send(codes(409, null, "Input is not alpha numeric"));
    }
    decrypted = validator.escape(decrypted)
    decrypted = validator.trim(decrypted)
    return decrypted
}

module.exports.validateInt = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
    if (validator.isEmpty(decrypted)) {
        return res.status(409).send(codes(409, null, "Missing Field"));
    }
    if (!validator.isNumeric(decrypted)) {
        return res.status(409).send(codes(409, null, "Input is not a number"));
    }
    decrypted = validator.escape(decrypted)
    decrypted = validator.trim(decrypted)
    return decrypted
}



// module.exports.validateLogin = () => {
//     return [
//         body('email').exists().isEmail(),
//         body('password').exists().isLength({ min: 5 }),
//     ]
// }

// module.exports.validateAddUser = () => {
//     console.log(body('firstName'))
//     return [
//         body('firstName').not().isEmpty().trim().escape(),
//         body('lastName').not().isEmpty().trim().escape(),
//         body('email').exists().isEmail(),
//         body('password').exists().isLength({ min: 5 }),
//         body('contact').exists().isInt(),
//     ]
// }
        // console.log(key.privateKey)
        // console.log(req.body.firstName)
        // let dFirstName = rsaDecryption.resDecrypt(req.body.firstName, key.privateKey);
        // let dLastName = rsaDecryption.resDecrypt(req.body.lastName, key.privateKey);
        // let dEmail = rsaDecryption.resDecrypt(req.body.email, key.privateKey);
        // let dPassword = rsaDecryption.resDecrypt(req.body.password, key.privateKey);
        // let dContact = rsaDecryption.resDecrypt(req.body.contact, key.privateKey)

        // let data = {
        //     firstName: dFirstName,
        //     lastName: dLastName,
        //     email: dEmail,
        //     password: dPassword,
        //     contact: dContact
        // }

        // console.log(data);
