let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

//$npm i express@4.14.0 body-parser@1.15.2  --save
let express = require('express');
let bodyParser = require('body-parser');


let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); //set middleware for express to use This bodyParser.join() function
//will take the body from the client that is in JSON format and make it an object and attach it in the req object
//below in the post

//setting up a route that the client sends somethign to the server
app.post('/todos',(req,res) => {   //similar to any express request
  //we need to set up the bodyParser as middleware for express so that the
  console.log(req.body);  //req.body is where the body is get stored by the bodyParser
  //start the server tnen on Postman change GET to POST on a new tab and type localhost:3000/todos and choose body > raw > text(JSON)
  //create a JSON with property text: 'This is from Postman'
  //see that Postmsn has created a header to notify the server that the application is sending a JSON
  //you can see that this shows on the terminal now
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);    //sends back to the client the doc whihc has now more properties that were set up by the server
  }, (e) => {
    //see all the status codes at https://httpstatuses.com
    res.status(400).send(e);
  });

})

//next the lecturer sets up the testign suite which we need to do at some point
// Todo.find() fetches all Todos from the database and Todo.remove({}) deletes all database document. This is similar to the mongDB equivalent

//retrieving todos
app.get('/todos',(req,res) => {
  // Todo.find() //fetches all docs of the model form the database
  Todo.find().then((todosArray) => {
    res.send({todosArray});  //we could have sent back just the array todoArray but passing it as an object permits us the functionality to send more in the future
  },(e) => {
    res.status(400).send(e);
  });

  //in Postman you use GET localhost:3000/todos to get back the results
  //use Save As to create a collection of routes so that you can use these again and again without retyping the same route

});

//GET /todos/1234
const {ObjectID} = require('mongodb'); //this is only use in for validating the id that conforms to ObjectID type
app.get('/todos/:id',(req,res) => {  //id will be the name of the varible
   var id = req.params.id;   //req.params is an object that now has id as property and its value whatever we passed i  the url
   // res.send(req.params);

   if (!ObjectID.isValid(id)) {
     return res.status(404).send();   //we don't send the e error  as it may contain private information
   }

   Todo.findById(id).then((todo) => {
     if (!todo) {
        return res.status(404).send();
     }
     res.send({todo});   //by sending an object that contains todo it is more flecible if we need to add anything

   }).catch((e) => {
     res.status(400).send();
   })

})
//this is used on tests only but if you create var someID = new ObjectID() then someID.toHexString() make it a string

//Deleting a document  HERE ANGELOS
app.delete('/todos/:id',(req,res) => {
  var id = req.params.id;   //req.params is an object that now has id as property and its value whatever we passed i  the url

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();   //we don't send the e error  as it may contain private information
  };

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();   //we don't send the e error  as it may contain private information
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

})

//for PATCH we will install the lodash npm module
//node-todo-api$ npm i lodash@4.15.0 --save
const _ = require('lodash');
app.patch('/todos/:id',(req,res) => {
  var id = req.params.id;   //req.params is an object that now has id as property and its value whatever we passed i  the url
  var body = _.pick(req.body,['text','completed']);   //pick takes an object and an array of properties that you pull off if these exist crrateing a new object with these properties

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();   //we don't send the e error  as it may contain private information
  };

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;    //by setting it to null it is like removing the value from a database
  }

  //similar mongodbfindOneAndUpdate  remind yourself the set filters etc. from mongodb
  Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();   //we don't send the e error  as it may contain private information
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });


});


/*ONE THING TO KEEP IN MIND IS THAT IN THEORY FROM ANY ROUTE YOU COULD ASK TO DO ANYTHING I.E. FROM A DELETE ROUT YOU COULD POST AND VICE VERSA
BUT WE ARE USING THESE INDUSTRY STANDARDS WHERE YOU POST/GET/DELETE/PATCH */


//In Mongoose Todo.insertMany(todosExample) where todos is an array of object as the model expects
//inserts all documents into the database
// const todosExample = [
// {
//   text: 'First test todo'
// },
// {
//   text: 'Seond test todo'
// }
// ];
// Todo.find({'something'}); //will find any document that has the text 'something'






//the REST meaning of the API will be explained during the security and authentication in the next section

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})
