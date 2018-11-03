// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var user = {name: 'Andrew', age: 25}
// var {name} = user
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
    if (err) {
        return console.error(err);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')



    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.error('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
        
    // })
    
    db.collection('Users').insertOne({
        name: 'Andrew',
        age: 25,
        location: 'Philadelphia'
    }, (err, res) => {
        if (err) {
            return console.error(err);
        }
        console.log(JSON.stringify(res.ops, undefined, 4));
        
    })


    client.close();
});