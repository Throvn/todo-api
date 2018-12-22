const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:a123456@ds141674.mlab.com:41674/todoapp' || 'mongodb://localhost:27017/TodoApp')

module.exports.mongoose = mongoose;