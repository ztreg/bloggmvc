const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
// const { countDocuments } = require('../database/mongodb');

module.exports = {
    addPost: async (req, res) => {
        const post = {
            title: req.body.title,
            content: req.body.content,
            userId: req.user.userId
        }
        let lastId = await postModel.insertPost(post);
        let status = lastId ? 201 : 500;
        res.status(status).json({lastId});
    },
    updatePost: async (req, res) => {
        /**
         * Hämta användarIDt på personen som har gjort posten, kolla om det är samma som försöker edita
         */
        const postToEdit = await postModel.getPost(req.params.postId)
        if(postToEdit) {
            if(!req.user.owns(postToEdit) ) {
                console.log('incorrect user is making the delete request')
                /**
                 * Return kommer avbryta hela metoden
                 */
                return res.json({msg: 'incorrect user is trying to delete this user'})
            }
        }
        const postToUpdate = {
            Postitle: req.body.title,
            Postcontent: req.body.content,
            PostId: req.params.postId
        }
        let updated_id = await postModel.updatePost(postToUpdate)
        let status = updated_id ? 201 : 500;
        res.status(status).json({updated: updated_id});
    },
    deletePost: async (req, res) => {
         /**
         * Hämta användarIDt på personen som har gjort posten som skall tas bort, kolla om det är samma som försöker ta bort
         */
        const postToDelete = await postModel.getPost(req.params.PostId)
        console.log(postToDelete)
        if(postToDelete) {
            if(!req.user.owns(postToDelete) ) {
                console.log('incorrect user is making the delete request')
                /**
                 * Return kommer avbryta hela metoden
                 */
                return res.json({msg: 'incorrect user is trying to delete this user'})
            }
        }
      
        let count = await postModel.deletePost(req.params.PostId)
        let status = count ? 201 : 500;
        let info = count ? "removed something" : "removed nothing"
        res.status(status).json({removed_info: info});

    },
    getPosts: async (req, res) => {
         // Hämta medlemskap för usern
         // let membership = await userModel.getUser(Userinfo)
         
         if(req.user.isAdmin()) {
            res.json(await postModel.getPosts()) 
         } else if (req.user.isMember()) {
            res.json(await postModel.getPosts(req.user.userId))  
         }
    },
    getPost: async (req, res) => {
        console.log('vi hämtar en post nu :D')
        res.json(await postModel.getPost(req.params.postId))  
    },
    getPostComments: async(req, res) => {
        console.log('här kommer kommentarerna')
        let response = await postModel.getPostComments(req.params.postId)
        if(response.length > 0) {
            res.status(200).json(response) 
        } else {
            res.status(404).json("postid not found") 
        }   
    },
    getUserPosts: async(req, res) => {
        res.json(await postModel.getUserPosts(req.params.userId))  
    }
}