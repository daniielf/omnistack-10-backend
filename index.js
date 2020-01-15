const express = require('express');
const mongoose = require('mongoose');
const creds = require('credentials/index.js');

const app = express();
mongoose.connect(`mongodb+srv://${creds.username}:${creds.password}@omnistackcluster-kudsu.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.use(express.json());
app.get('/', (req, resp) => {
  return resp.json({ message: 'GET ANYTHING'});
});

app.get('/users', (req, resp) => {
  return resp.json({ message: 'GET ALL USER'});
});

app.get('/users/:id', (req, resp) => {
  return resp.json({ message: 'GET USER ' + req.params.id});
});

app.post('/users/create', (req, resp) => {
  return resp.json({ message: 'ADD USER'});
});

app.listen(3333);