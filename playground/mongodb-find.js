const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true} ,(err, client) => {
    if (err) {
        return console.error(err);
    }
    const db = client.db('TodoApp');
    console.log('Connected to MongoDB');

    // db.collection('Todos').find().count().then((count)=> {
    //     console.log('Todos count'+ count);
        
    //     console.log(JSON.stringify(count, undefined, 3));
        
    // }, (err) => {
    //     console.error(err);
        
    // })

    db.collection('Users').find({age: 16}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 3));
    }, (err) => {
        console.error(err);
    })
    

    //db.close()
})