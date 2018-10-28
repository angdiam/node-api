const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //tell mongoose to use the systems library for promises
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI);


module.exports = {mongoose};
