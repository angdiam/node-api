var user = {name: 'Andrew', age: 25};
var {name} = user
console.log(name);

const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
if (err) {
  return console.log('Unable to connect to MongDB server',err);
}
console.log('Connected to MongoDB server');

//deleteMany   deletes all items that match the criterion
// db.collection('Todos').deleteMany({completed: false}).then( (result) => {
//   console.log(result);
//   //result returns a ton of stuff. All we care about is the very top line ok:1 means
//   //everything went well and n:3 inidcates that 3 documents were deleted
// });

//deleteOne deletes only the first document that matches the criterion
// db.collection('Todos').deleteOne({completed: false}).then( (result) => {
//   console.log(result);
// });

//find one and delete
db.collection('Todos').findOneAndDelete({completed: false}).then( (result) => {
  console.log(result);
  //the big difference is that the result here is an object that contains
  //lasterrorObjct with n: 1 meanign you deleted 1 document
  //value:  the document we have just deleted
  //ok : 1   that everything went ok
});

//NOTE: if you prefere you can omit having the .then or callback in all of them
// db.collection('Todos').findOneAndDelete({completed: false})


// db.close();   //closes the connection with the db server
})
