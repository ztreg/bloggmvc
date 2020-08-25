const userModel = require('../models/userModel');
// const { countDocuments } = require('../database/mongodb');
const bcrypt = require('bcryptjs')

function hashPW (password) {
    return bcrypt.hashSync(password, 10)
}

module.exports = {
    addUser: async (req, res) => {
        const user = {
            username: req.body.username,
            password: hashPW(req.body.password)
        }
        let addedId = await userModel.addUser(user)
        let status = addedId ? 201 : 500
        res.status(status).json({addedId})
    },
    updateUser: async (req, res) => {
        
        console.log('inne i updateusercontroller')
        let userToUpdate = {
            userId: req.params.userId
        }
        if(req.body.username) {
            userToUpdate.Username = req.body.username
        }
        if(req.body.password) {
            userToUpdate.Password = hashPW(req.body.password)
        }

        let lastId = await userModel.updateUser(userToUpdate)
        let status = lastId ? 201 : 500;
        res.status(status).json({updated_count: lastId});
    },
    deleteUser: async (req, res) => {
        /**
         * Can only delete user if logged in as user
         */
        let count = await userModel.deleteUser(req.user.userId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    },
    getUsers: async (req, res) => {
        res.json(await userModel.getUsers())   
    },
    getUser: async (req, res) => {
        res.json(await userModel.getUser({Userinfo: req.params.userId}))  
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