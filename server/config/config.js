//we need to be able to control the environment we are using.
//We may work on the production environment in heroku, in devlopment or in test environment
//depending on which environment we are working in we may want to use a test database for all our testing
//so that we don't alter our database while testing.
//for this we need to make some changes to the package.json and also define the process.env as below

//heroku sets process.env.NODE_ENV = 'production'
/*
process.env.NODE_ENV = 'production'     heroku
process.env.NODE_ENV = 'development'    localhost:3000
process.env.NODE_ENV = 'test'           mocha
*/

//make these changes in package.json
//  "test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/**/*.test.js",
//now heroku will set it to 'production', mocha will set it to 'test'and we set the default 'development' below
const env = process.env.NODE_ENV || 'development';
console.log('env ***',env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
};
