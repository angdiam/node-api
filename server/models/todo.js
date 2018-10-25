let mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{ //mongoDB autmatically lower case and pluralises this
  //this is the structure and properties we want our docs to have
  text: {
    type: String,
    required: true,    //means this property has to exist on evefy new document
    minlength: 1,      //string needs to be at least 1 character long
    trim: true         //removes whitespace
  },
  completed: {
    type: Boolean,
    default: false     //default value
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
