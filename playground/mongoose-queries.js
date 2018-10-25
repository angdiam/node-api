const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');



//get the id of one of the database document so that we can use it as an example
const id = '5bcba1062e5c32dd5ca1ba7a';  //don't worry about this not beign an ObjectID type but a string
//mongoose takes care all of that by converting the above string to an ObjectID

const {ObjectID} = require('mongodb'); //this is only use in for validating the id that conforms to ObjectID type
if (!ObjectID.isValid(id)) {
  console.log('id is not of valid ObjectID type');
};



Todo.find({
  _id: id      //will search all docs for _id equal to id
}).then((todos) => {
  console.log('Todos: ',todos);   //this is the array that holds all matching documents
});

Todo.findOne({
  _id: id      //will search just the first document for _id equal to id
}).then((todo) => {
  console.log('Todo: ',todo);   //this is just the first document that matches the criteria
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id: ',todo);   //this is the first document that matches the id
}).catch((e) => {
  console.log('ID is ivalid ',e);
});

//if a query does not find anything returns either empty array or null depending on the query
//mongoose.js documentation has even more on this in the queries section
