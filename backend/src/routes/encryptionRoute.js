
const rsaDecryption = require('../middlewares/rsaDecryption');

const rsa = rsaDecryption.rsaKeys();
const privateKey = rsa.privateKey
const publicKey = rsa.publicKey

exports.route = router => {
    // gee
    router.get('/api/keys', (req, res) => {
        res.status(200).json({
            publicKey: publicKey
        })
    });
}

module.exports.privateKey = privateKey