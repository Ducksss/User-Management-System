const { codes } = require('../config/codes');
const validator = require('validator');
const rsaDecryption = require('../middlewares/rsaDecryption');
const key = require('../routes/encryptionRoute')

module.exports.validateEmail = (encrypted, res) => {
    try {
        return new Promise((resolve, reject) => {
            let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
            if (validator.isEmpty(decrypted)) {
                return reject(res.status(409).send(codes(409, null, "Missing Field")));
            }
            if (!validator.isEmail(decrypted)) {
                return reject(res.status(409).send(codes(409, null, "Input is not an Email")));
            }
            decrypted = validator.normalizeEmail(decrypted)
            return resolve(decrypted)
        });
    } catch (error) {
        return reject(error)
    }
}

module.exports.validateText = (encrypted) => {

    return new Promise((resolve, reject) => {
        let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
        if (validator.isEmpty(decrypted)) {
            return reject("Missing Field");
        }
        if (!validator.isAlphanumeric(decrypted)) {
            return reject("Input is not Alpha Numeric");
        }
        decrypted = validator.escape(decrypted)
        decrypted = validator.trim(decrypted)
        return resolve(decrypted)
    });
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

module.exports.validatePassword = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
    if (validator.isEmpty(decrypted)) {
        return res.status(409).send(codes(409, null, "Missing Field"));
    }
    if (!validator.isAscii(decrypted)) {
        return res.status(409).send(codes(409, null, "Input is not alpha numeric"));
    }
    decrypted = validator.trim(decrypted)
    return decrypted
}
