const mongoose = require('mongoose');

const TodoList = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Property name is required.']
  }
});

const TodoItem = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoLists',
  }
});

const TodoLists = module.exports.TodoLists = mongoose.model('TodoLists', TodoList);
const TodoItems = module.exports.TodoItems = mongoose.model('TodoItems', TodoItem);
