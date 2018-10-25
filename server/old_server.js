let mongoose = require('mongoose');

mongoose.Promise = global.Promise; //tell mongoose to use the systems library for promises
mongoose.connect('mongodb://localhost:27017/TodoApp');
//this is different to mongodb in the way that mongo db connects and has a callback that runs once we connect
//anything below will run instantly but the connection will require few miliseconds to be established
//mongoose will wait to connect  first and then run everything below. Also mongoose maintains the connection

 //now we will create a mongoose model to declare what structure we want our documents to have before adding them to the collection
 //remember that in mongodb you could add any type of document with mixed structures soemthing that may cuse confusion
//  var Todo = mongoose.model('Todo',{
//    //this is the structure and properties we want our docs to have
//    text: {
//      type: String
//    },
//    completed: {
//      type: Boolean
//    },
//    completedAt: {
//      type: Number
//    }
//  })
// //so now we have declared that the model to follow has properties text,completed,completedAt and these are of specific type
//
// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

//We have not demanded at the model all propertirs to exist so the newTodo created but not save a new document
//now we have to save it and this returns a promise
//the saved document has a _v version of mongoose created automatically and an _id from mongoDB created automatically
// newTodo.save().then((doc) => {
//   console.log('Saved todo ',doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });
//
// var otherTodo = new Todo({
//   text: 'Feed the cat',
//   completed: true,
//   completedAt: 123
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc,undefined,2));
// },(e) => {
//   console.log('Unbale to save the document ',e);
// });
//
//
// //mongoose validators allow us to require from our models to fulfill certain criteria before saving a new document
// //mongoose schemas will also structure our model. We will revisit this later on
// //here is how to change the above model Todo
// var Todo2 = mongoose.model('Todo2',{
//   //this is the structure and properties we want our docs to have
//   text: {
//     type: String,
//     required: true,    //means this property has to exist on evefy new document
//     minlength: 1,      //string needs to be at least 1 character long
//     trim: true         //removes whitespace
//   },
//   completed: {
//     type: Boolean,
//     default: false     //default value
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// })


var User = mongoose.model('User',{
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var user = new User({
  email: 'andrew@example.com  '
})

user.save().then((doc) => {
  console.log('User daved ',doc);
},(e) => {
  console.log('Unable to save user ',e);
});
