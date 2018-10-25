var user = {name: 'Andrew', age: 25};
var {name} = user
console.log(name);

const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
if (err) {
  return console.log('Unable to connect to MongDB server',err);
}
console.log('Connected to MongoDB server');


//findOneAndUpdate(filter, update, options, callback)  Finds a document based on the filter and updates it
//if we omit the callback it returns a promise so we use .then which we prefer
//for update we have to use the mongoDB update operators such as $incr and $set (more in the APIdocs)
//google mongodb update operators  for more
db.collection('User').findOneAndUpdate({
    _id: new ObjectID('5baf723e9bdcfece6e511d4c')
},{
  $set: {
    name: 'Angel'
  },
  $inc: {
    age: 0.5    //incrementby 0.5
  }
},{
  returnOriginal: false   //becuase by default it returns the original document and not the updated one
}
).then((result) => {
  console.log(result);  //the result object contains a value object with the updated document
});

// db.close();   //closes the connection with the db server
})
