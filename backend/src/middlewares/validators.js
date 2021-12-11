const validator = require('validator');
const { MissingError, InvalidInputError } = require('../errors/ParamError');
const rsaDecryption = require('../middlewares/rsaDecryption');
const key = require('../routes/encryptionRoute');

module.exports.validateEmail = (encrypted, res) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);
    if (validator.isEmpty(decrypted)) throw new MissingError(textfield);
    if (!validator.isEmail(decrypted)) throw new InvalidInputError();
    
    decrypted = validator.normalizeEmail(decrypted)

    decrypted = validator.normalizeEmail(decrypted);

    return decrypted;
};

module.exports.validateText = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);

    if (validator.isEmpty(decrypted)) throw new MissingError(textfield);
    if (!validator.isAscii(decrypted)) throw new InvalidInputError();
    
    decrypted = validator.escape(decrypted)
    decrypted = validator.trim(decrypted)

    decrypted = validator.escape(decrypted);
    decrypted = validator.trim(decrypted);

    return decrypted;
};

module.exports.validateInt = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);

    if (validator.isEmpty(decrypted)) throw new MissingError(textfield);
    if (!validator.isAscii(decrypted)) throw new InvalidInputError();
    
    decrypted = validator.escape(decrypted)
    decrypted = validator.trim(decrypted)

    decrypted = validator.escape(decrypted);
    decrypted = validator.trim(decrypted);

    return decrypted;
};

module.exports.validatePassword = (encrypted) => {
    let decrypted = rsaDecryption.resDecrypt(encrypted, key.privateKey);

    if (validator.isEmpty(decrypted)) throw new MissingError(textfield); 
    if (!validator.isAscii(decrypted)) InvalidInputError();
    
    return decrypted
}
