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
            password: hashPW(req.body.password),
            role: "member"
        }
        let addedId = await userModel.addUser(user)
        let status = addedId ? 201 : 500
        res.status(status).json({addedId})
    },
    updateUser: async (req, res) => {
        //req.user.userId != req.params.userId 
        let userToEdit = await userModel.getUser(req.params.userId)
        if(userToEdit) {
            if(!req.user.isOwner(userToEdit) ) {
                console.log('incorrect user is making the request')
                /**
                 * Return kommer avbryta hela metoden
                 */
                return res.json({msg: 'incorrect user is trying to edit this user'})
            }
            const userToUpdate = {
                userId: req.params.userId,
                Username: req.body.username,
                Password: req.body.password
            }
    
            if(req.body.username) userToUpdate.Username = req.body.username
            if(req.body.password) userToUpdate.Password = hashPW(req.body.password)

            console.log(userToUpdate)

            let lastId = await userModel.updateUser(userToUpdate)
            let status = lastId ? 201 : 500;
            res.status(status).json({updated_count: lastId});
        }
   
        

    },
    deleteUser: async (req, res) => {
        /**
         * Can only delete user if logged in as user
         */

        let userToDelete = await userModel.getUser(req.params.userId)
        console.log(userToDelete)
        if(userToDelete) {
            if(!req.user.isOwner(userToDelete) ) {
                console.log('incorrect user is making the request')
                /**
                 * Return kommer avbryta hela metoden
                 */
                return res.json({msg: 'incorrect user is trying to edit this user'})
               
            }
        }
        const deleteId = req.params.userId;

        let response = await userModel.deleteUser(deleteId)
        let status = response ? 201 : 500;
        res.status(status).json({response: response});
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