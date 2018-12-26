const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 4
};

var token = jwt.sign(data, '123abc')
console.log(token);

console.log(jwt.verify(token, '123abc'))
/*
const message = 'I am user 1'
const hash = SHA256(message).toString()
console.log("Hash", hash);
var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}
token.hash = SHA256(JSON.stringify(token.data)).toString()
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
if (resultHash === token.hash) {
    console.log('Data was not changed');
    
} else {
    console.log('Data was changed. Do not trust');
    
}*/