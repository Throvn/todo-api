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

   const db = client.db('TodoApp')

    // db.collection('Users').findOneAndDelete({_id: new ObjectID("5bdd75ff0b70414f6a904ec3")}).then((res) => {
    //     console.log(res);
        
    // })

        db.collection('Users').deleteMany({name: "Andrew"}).then((res) => {
            console.log(res);
            
        })












    //db.close();
})