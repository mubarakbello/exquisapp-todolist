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
  }
  
}
