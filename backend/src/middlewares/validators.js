const { codes } = require('../config/codes');
const validator = require('validator');
const rsaDecryption = require('../middlewares/rsaDecryption');
const key = require('../routes/encryptionRoute')

module.exports.validateEmail = (encrypted, res) => {
    try {
        return new Promise((resolve, reject) => {
            let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
            if (validator.isEmpty(decrypted)) {
                return reject("Missing Field");
            }
            if (!validator.isEmail(decrypted)) {
                return reject("Input is not an Email");
            }
            decrypted = validator.normalizeEmail(decrypted)
            return resolve(decrypted)
        });
    } catch (error) {
        return reject(error)
    }
}

module.exports.validateText = (encrypted) => {
    try {
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
    } catch (error) {
        return reject(error)
    }
}

module.exports.validateInt = (encrypted) => {
    try {
        return new Promise((resolve, reject) => {
            let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
            if (validator.isEmpty(decrypted)) {
                return reject("Missing Field");
            }
            if (!validator.isNumeric(decrypted)) {
                return reject("Input is not a number");
            }
            decrypted = validator.escape(decrypted)
            decrypted = validator.trim(decrypted)
            return resolve(decrypted)
        });
    } catch (error) {
        return reject(error)
    }
}

module.exports.validatePassword = (encrypted) => {
    try {
        return new Promise((resolve, reject) => {
            let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
            if (validator.isEmpty(decrypted)) {
                return reject("Missing Field");
            }
            if (!validator.isAscii(decrypted)) {
                return reject("Input is not Ascii");
            }
            return resolve(decrypted)
        });
    } catch (error) {
        return reject(error)
    }
}
