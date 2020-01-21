const Router = require('express').Router();
const bodyParser = require('body-parser');

const JSONParser = bodyParser.json();

Router.get('/todos', (req, res) => {
  res.send("All todos returned");
});

module.exports = Router;
