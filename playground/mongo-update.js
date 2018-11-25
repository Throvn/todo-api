const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.error('Unable to connect to MongoDB server');
        
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5bdca37f10ad8b13e9ee43d3')
    },{
        $inc: {
            age: 1
        },
        $set:{
            name: 'Louis'
        }
    },{
        returnOriginal: false
    })












    //db.close();
})