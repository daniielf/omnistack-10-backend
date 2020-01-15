const express = require('express');
const mongoose = require('mongoose');
const creds = require('../credentials/');
const routes = require('./routes');

const app = express();
mongoose.connect(`mongodb+srv://${creds.username}:${creds.password}@omnistackcluster-kudsu.mongodb.net/omni10?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);


app.listen(3333);