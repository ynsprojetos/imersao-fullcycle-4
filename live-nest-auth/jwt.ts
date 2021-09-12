

const base64Url = require('base64url');

const header = {
  alg: 'HS256', // Hmac + sha256 (tipo de criptografia)
  typ: 'JWT'
}

// corpo de dados - dados principais do token //
const payload = {
username: 'user1@user.com',
name: 'Yuri Silva',
exp: new Date().getTime, // timestamp 
};

const key = 'abcd123456';

const headerEncoded = base64Url(JSON.stringify(header)).toString('base64');
const payloadEncoded = base64Url(JSON.stringify(payload)).toString('base64');

console.log(headerEncoded, payloadEncoded);

const crypt = require('crypto');

const signature = crypt
.createHmac('sha256', key)
.update(`${headerEncoded}.${payloadEncoded}`)
.digest('bin');


console.log(`${headerEncoded}.${payloadEncoded}.${base64Url.encode(signature)}`);