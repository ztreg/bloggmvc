const todoModel = require('../models/todoModel');
const { countDocuments } = require('../database/mongodb');

module.exports = {
    addTodo: async (req, res) => {
        let lastId = await todoModel.insertTodo(req.body.title, req.body.done = false);
        let status = lastId ? 201 : 500;
        res.status(status).json({lastId});
    },
    updateTodo: async (req, res) => {
        let lastId = await todoModel.updateTodo(req.body.title, req.body.done, req.params.todoId)
        let status = lastId ? 201 : 500;
        res.status(status).json({last_inserted_id: lastId});
    },
    doneTodo: async (req, res) => {
        console.log(req.body)
        let lastId = await todoModel.doneTodo(req.body.done, req.params.todoId)
        let status = lastId ? 201 : 500;
        res.status(status).json({last_inserted_id: lastId});
    },
    deleteTodo: async (req, res) => {
        let count = await todoModel.deleteTodo(req.params.todoId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    },
    getTodos: async (req, res) => {
        res.json(await todoModel.getTodos(req.params.sorted, req.params.direction, req.params.page))   
    },
}