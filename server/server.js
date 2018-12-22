const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
    })
    todo.save().then((doc) => {
        res.status(200)
        res.send(doc);
    }).catch((e) => {
        res.status(400)
        res.send(e);
        
    })
})
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    })
},(e) => {
    res.status(400).send(e)
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send({})
    }
    Todo.findById(id).then((todo) => {
        console.log(todo);
        
        if (!todo) {
            res.status(404).send({})
        }
        res.status(200).send(todo)
    }).catch((e) => {
        res.status(400).send({})
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000");
})

module.exports = {app};