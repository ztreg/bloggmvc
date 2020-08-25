const postModel = require('../models/postModel');
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

        const postToUpdate = {
            Postitle: req.body.title,
            Postcontent: req.body.content,
            PostId: req.params.postId
        }
        let lastId = await postModel.updatePost(postToUpdate)
        let status = lastId ? 201 : 500;
        res.status(status).json({updated_id: lastId});
    },
    deletePost: async (req, res) => {
        let count = await postModel.deletePost(req.params.PostId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    },
    getPosts: async (req, res) => {
        res.json(await postModel.getPosts())   
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