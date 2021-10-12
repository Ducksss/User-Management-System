const validator = require('validator');
const rsaDecryption = require('../middlewares/rsaDecryption');
const key = require('../routes/encryptionRoute')

module.exports.validateEmail = (encrypted, res) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
    if (validator.isEmpty(decrypted)) throw new Error('Missing Field')
    if (!validator.isEmail(decrypted)) throw new Error('Input is not an Email')
    
    decrypted = validator.normalizeEmail(decrypted)

    return decrypted
}

module.exports.validateText = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);

    if (validator.isEmpty(decrypted)) throw new Error("Missing Field");
    if (!validator.isAlphanumeric(decrypted)) throw new Error("Input is not Alpha Numeric");
    
    decrypted = validator.escape(decrypted)
    decrypted = validator.trim(decrypted)

    return decrypted
}

module.exports.validateInt = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);

    if (validator.isEmpty(decrypted)) throw new Error("Missing Field");
    if (!validator.isNumeric(decrypted)) throw new Error("Input is not a number");
    
    decrypted = validator.escape(decrypted)
    decrypted = validator.trim(decrypted)

    return decrypted
}

module.exports.validatePassword = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);

    if (validator.isEmpty(decrypted)) throw new Error("Missing Field"); 
    if (!validator.isAscii(decrypted)) throw new Error("Input is not Ascii");
    
    return decrypted
}
