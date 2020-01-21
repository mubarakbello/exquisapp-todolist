const { TodoLists, TodoItems } = require('../models');

module.exports = {

  getAllTodoLists: (req, res) => {
    // return all todolists in the db
    TodoLists
      .find({})
      .populate('items')
      .exec((err, data) => {
      if (err) {
        return res.json({
          error: true,
          message: err.message
        });
      }
      res.json({
        error: false,
        message: 'All todo lists returned',
        data: data
      });
    });
  },


  addNewList: (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.json({
        error: true,
        message: 'Todo List name must be passed'
      });
    }

    const newList = new TodoLists({ name });

    newList.save((err, data) => {
      if (err) {
        return res.json({
          error: true,
          message: err.message
        });
      }
      res.json({
        error: false,
        message: `New todo list with Id ${data._id} added`,
        data: data
      });
    });
  },


  addNewItem: (req, res) => {
    const listId = req.params.list_id;
    const { title } = req.body;

    if (!listId || !title) {
      return res.json({
        error: true,
        message: 'Both listId and todoItem title must be passed'
      });
    }

    TodoLists.findById(listId, (err, data) => {
      if (!data.length) {
        return res.json({
          error: true,
          message: 'TodoList with listId passed non-existent'
        });
      }

      const newItem = new TodoItems({ title, listId });

      newItem.save((err, data) => {
        if (err) {
          return res.json({
            error: true,
            message: err.message
          });
        }
        res.json({
          error: false,
          message: `New todo list item with Id ${data._id} added`,
          data: data
        });

        TodoLists.findById(data._id, (err, doc) => {
          if (err) {
            // pass
          } else {
            doc.items.push(data._id);
            doc.save();
          }
        })
      });
    });
  },


  updateTodoItem: (req, res) => {
    const itemId = req.params.item_id;
    const { title } = req.body;

    if (!itemId || !title) {
      return res.json({
        error: true,
        message: 'Both itemId and todoItem title to update must be passed'
      });
    }

    TodoItems.findOneAndUpdate({ itemId }, { title }, { new: true }, (err, doc) => {
      if (err) {
        return res.json({
          error: true,
          message: err.message
        });
      }

      res.json({
        error: false,
        message: `Todo list item with Id ${data._id} updated`,
        data: data
      });
    })
  },


  deleteTodoListById: (req, res) => {
    const listId = req.params.list_id;

    if (!listId) {
      return res.json({
        error: true,
        message: 'listId of Todo List to delete must be passed'
      });
    }

    TodoLists.findByIdAndDelete(listId, (err, data) => {
      if (!data) {
        return res.json({
          error: true,
          message: 'TodoList with listId passed non-existent'
        });
      }

      res.json({
        error: false,
        message: `TodoList with Id ${data._id} deleted`,
        data: data
      });
    })
  },


  deleteTodoItemById: (req, res) => {
    const itemId = req.params.item_id;

    if (!itemId) {
      return res.json({
        error: true,
        message: 'itemId of Todo List item to delete must be passed'
      });
    }

    TodoItems.findByIdAndDelete(itemId, (err, data) => {
      if (!data) {
        return res.json({
          error: true,
          message: 'TodoItem with itemId passed non-existent'
        });
      }

      res.json({
        error: false,
        message: `TodoItem with Id ${data._id} deleted`,
        data: data
      });
    })
  }

}
