const postModel = require('../models/postModel');
// const { countDocuments } = require('../database/mongodb');

module.exports = {
    addPost: async (req, res) => {
        let lastId = await postModel.insertPost(req.body.title, req.body.content, req.params.userId);
        let status = lastId ? 201 : 500;
        res.status(status).json({lastId});
    },
    updatePost: async (req, res) => {
        let lastId = await postModel.updatePost(req.body.title, req.body.content, req.params.PostId)
        let status = lastId ? 201 : 500;
        res.status(status).json({last_inserted_id: lastId});
    },
    deletePost: async (req, res) => {
        let count = await postModel.deletePost(req.params.PostId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    },
    getPosts: async (req, res) => {
        // importera comments med specifikt postid
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