import NodeRSA from 'node-rsa';

// encryption
export const resEncrypt = (text, key) => {
    let keyPublic = new NodeRSA(key);
    let encrypted = keyPublic.encrypt(text, 'base64');
    return encrypted
}

