const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash')

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

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

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id
    const body = _.pick(req.body, ['text', 'completed'])

    if(!ObjectID.isValid(id)){
        return res.status(404).send({})
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{
        $set: body
    },{
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send({})
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(404).send({})
    })
})


app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send({})
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({})
        }
        res.status(200).send({todo})
    }).catch((e) => {
        res.status(400).send({})
        
    })
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

app.get('/', (req,res) => {
    res.sendFile('../public/index.html')
})

app.listen(port, () => {
    console.log("Server is up on port"+ port);
})

module.exports = {app};