const NodeRSA = require('node-rsa');

// decryption
module.exports.resDecrypt = (text, key) => {
    let keyPrivate = new NodeRSA(key);
    let decrypted = keyPrivate.decrypt(text, 'utf8');
    return decrypted;
};

module.exports.rsaKeys = () => {
    const keys = new NodeRSA({ b: 512 });
    keys.setOptions({ encryptionScheme: 'pkcs1' });
    const publicKey = keys.exportKey('public');
    const privateKey = keys.exportKey('private');

    return {
        publicKey: publicKey,
        privateKey: privateKey
    };
};
