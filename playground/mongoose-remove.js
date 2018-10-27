const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb'); //this is only use in for validating the id that conforms to ObjectID type

//removes all documents and prints results ok:1 nnd n:3 if 3 items were deleted
Todo.remove({}).then((result) => {
  console.log(result);
});


//Delete the first item that matches the query
Todo.findOneAndRemove({_id: 'sjhdgfsdfhsdf'}).then((todo) => {
  console.log((todo)); //it returns the deleted item
})

//Delete the item with specific id
Todo.findByIdAndRemove('sdhsgjdfgksjhdfg').then((todo) => {
  console.log(todo); //it returns the deleted item
});
