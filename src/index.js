const express = require('express');
const mongoose = require('mongoose');
const creds = require('../credentials/');
const routes = require('./routes');
const cors = require('cors');

const app = express();
console.log('BUILDING SERVER');
console.log('Connecting to DB');
mongoose.connect(`mongodb+srv://${creds.username}:${creds.password}@omnistackcluster-kudsu.mongodb.net/omni10?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB CONNECTED');
  console.log('STARTING SERVER . . . ');

  app.use(cors())
  app.use(express.json());
  app.use(routes);
  app.listen(3333);

}).catch((err) => {
  console.log('Mongoose Could Not Connect to DB');
  console.log('SHUTING DOWN SERVER GRACEFULLY...');
  process.exit();
});


