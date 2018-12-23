const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const {ObjectID} = require('mongodb')

Todo.remove({}).then((res) => {
    console.log(res);
    
})

Todo.findByIdAndRemove('')

Todo.findOneAndRemove({})