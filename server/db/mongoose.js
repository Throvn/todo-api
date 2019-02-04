const mongoose = require('mongoose');

/*'mongodb://root:a123456@ds141674.mlab.com:41674/todoapp'*/

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

module.exports.mongoose = mongoose;