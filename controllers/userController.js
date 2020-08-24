const userModel = require('../models/userModel');
// const { countDocuments } = require('../database/mongodb');

module.exports = {
    addUser: async (req, res) => {
        let lastId = await userModel.addUser(req.body.username, req.body.password);
        let status = lastId ? 201 : 500;
        res.status(status).json({lastId});
    },
    updateUser: async (req, res) => {
        let lastId = await userModel.updateUser(req.body.username, req.body.password, req.params.userId)
        let status = lastId ? 201 : 500;
        res.status(status).json({last_inserted_id: lastId});
    },
    deleteUser: async (req, res) => {
        let count = await userModel.deleteUser(req.params.userId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    },
    getUsers: async (req, res) => {
        res.json(await userModel.getUsers())   
    },
    getUser: async (req, res) => {
        res.json(await userModel.getUser(req.params.userId))  
    },
    getUserComments: async(req, res) => {
        let response = await userModel.getUserComments(req.params.userId)
        if(response.length > 0) {
            res.status(200).json(response) 
        } else {
            res.status(404).json("userid not found") 
        }
         
    },
    getUserPosts: async(req, res) => {
        let response = await userModel.getUserPosts(req.params.userId)
        if(response.length > 0) {
            res.status(200).json(response) 
        } else {
            res.status(404).json("userid not found") 
        }
         
    }
}