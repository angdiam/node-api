var user = {name: 'Andrew', age: 25};
var {name} = user
console.log(name);

const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
if (err) {
  return console.log('Unable to connect to MongDB server',err);
}
console.log('Connected to MongoDB server');

//.find() can have no arguments and is a method on the collection.
//This returns a cursor and not the actual document. There are many functions on this returned cursor
//.toArray() returns a promise (although there is also another syntax)
db.collection('Todos').find().toArray().then((docs) => {
  console.log('Todos:');
  console.log(JSON.stringify(docs,undefined,2));
},(err) => {
  console.log('Unable to fetch Todos',err);
});

//query based on certain values set up {completed: true} key value pair as argument in find.
db.collection('Todos').find({completed: true}).toArray().then((docs) => {
  console.log('Todos that are true:');
  console.log(JSON.stringify(docs,undefined,2));
},(err) => {
  console.log('Unable to fetch Todos',err);
});

//by id it is slighly different because the _id is an ObjectID
db.collection('Todos').find({ _id: new ObjectID('5baf71db4cc8301ea7a784a0') }).toArray().then((docs) => {
  console.log('A Todos with specific _id:');
  console.log(JSON.stringify(docs,undefined,2));
},(err) => {
  console.log('Unable to fetch Todos',err);
});

//you can find more methods available to you besides toArray (what comes back from find)
// http://mongodb.github.io/node-mongodb-native/2.0/api/
db.collection('Todos').find().count().then((count) => {
  console.log(`Todos count: ${count}`);
},(err) => {
  console.log('Unable to fetch Todos',err);
});

/*
git init
git status
create .gitignore file and insert node_modules/
git add .
git commit -m 'Init commit'
create online repository and copy the bottom 2 lines in command prompt to push
*/

//Check Robomongo to see your collections
// db.close();   //closes the connection with the db server
})
