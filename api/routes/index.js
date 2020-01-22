const Router = require('express').Router();
const bodyParser = require('body-parser');

const JSONParser = bodyParser.json();

const controller = require('../controllers');

Router.get('/todos', controller.getAllTodoLists);

Router.post('/todo-list', JSONParser, controller.addNewList);
Router.post('/todo-item', JSONParser, controller.addNewItem);

Router.put('/todo-item/:item_id', JSONParser, controller.updateTodoItem);

Router.delete('/todo-list/:list_id', controller.deleteTodoListById);
Router.delete('/todo-item/:item_id', controller.deleteTodoItemById);

module.exports = Router;
