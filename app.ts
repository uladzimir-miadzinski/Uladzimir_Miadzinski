const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users.json');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/users/:id', (req, res) => {
  res.json(users.find(user => user.id === parseInt(req.params.id)) || null);
});

app.post('/users/add', (req, res) => {

});

app.put('/users/:id', (req, res) => {
  let userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  res.send(userIndex);
});

app.delete('/users/:id', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log(`Server started and listening on port ${PORT}!`);
});

function findUserById() {

}