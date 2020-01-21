const { TodoLists, TodoItems } = require('../models');

module.exports = {

  getAllTodoLists: (req, res) => {
    // return all todolists in the db
    TodoLists.find({}, (err, data) => {
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
          message: 'listId passed non-existent'
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
      });
    })
  }

}
