const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const {ObjectID} = require('mongodb')
/* 
var id = '5c1bce44c59396d080845e3d11';

if (!ObjectID.isValid(id)) {
    console.log("ID not valid");
    
}

Todo.find({
    _id: id
}).then((todos)=> {
    console.log('Todos',todos);
    
})

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log(todo);
    
})

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log("ID not found");
        
    }
    console.log(todo);
    
}).catch((e) => {
    console.log(e);
    
}) */
const id = '5bfd767a30ed30699976915a11'
if (!ObjectID.isValid(id)) {
    console.error(id, "is invalid");
}
User.findById(id).then((user) => {
    if (!user) {
        return console.error('ID wrong');
    }
    console.log(user);
}).catch((e) => {
    console.warn(e);
    
})