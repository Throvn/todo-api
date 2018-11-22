const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.error('Unable to connect to MongoDB server');
        
    }
    console.log('Connected to MongoDB server')

    // deleteMany
    /*
    client.db('TodoApp').collection('Todos').deleteMany({text:'Walk the dog'}).then((res) => {
        console.log(res);
        
    });
    */

    // deleteOne
    /*
    client.db('TodoApp').collection('Todos').deleteOne({text: "Walk the dog"}).then((res) => {
        console.log(res.result);
        
    })
    */

    // findOneAndDelete
    /*
    client.db('TodoApp').collection('Todos').findOneAndDelete({completed: false}).then((res) => {
        console.log(res);
        
    })
    */



    client.db('TodoApp').collection('Users').findOneAndDelete({_id: 123}).then((res) => {
        console.log(res);
        
    })












    db.close();
})