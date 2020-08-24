const todoRouter = require('express').Router();
const todoController = require('../controllers/todoController');

// const jwt = require("jsonwebtoken");
// 
// todoRouter.get('/api/userOrders', (req, res) => {
// 	console.log('inne i routern')
//   // executes after authenticateToken
//   // ...
// })

todoRouter.delete('/delete/:todoId', (req, res) => {
	todoController.deleteTodo(req, res);
}); 

todoRouter.get('/:sorted/:direction/:page?', (req, res ) => {
    todoController.getTodos(req, res);
})

todoRouter.post('/add', (req, res) => {
    // console.log(req.body.title)
    todoController.addTodo(req, res);
});

todoRouter.put('/update/:todoId', (req, res) => {
    todoController.updateTodo(req, res);
});

todoRouter.put('/done/:todoId', (req, res) => {
    console.log(req.body)
    todoController.doneTodo(req, res);
});


module.exports = todoRouter