const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

var data = {
    id: 4
};

var token = jwt.sign(data, '123abc')
console.log(token);

console.log(jwt.verify(token, '123abc'))
/*
const message = 'I am user 1'
const hash = SHA256(message).toString()
console.log("Hash: ", hash);
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
var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
})

let hashedPassword = '$2a$10$4QdbIIRYdSEXT7/ZADKW1ussXKaTATe7gkQbvksfG9MMcGnt/yc1u'
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
    
})