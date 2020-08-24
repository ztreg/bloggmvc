const commentModel = require('../models/commentModel');
// const { countDocuments } = require('../database/mongodb');

module.exports = {
    addComment: async (req, res) => {
        let lastId = await commentModel.insertComment(req.body.title, req.body.content, req.params.postId, req.params.userId);
        let status = lastId ? 201 : 500;
        res.status(status).json({lastId});
    },
    updateComment: async (req, res) => {
        let lastId = await commentModel.updateComment(req.body.title, req.body.content, req.params.commentId)
        let status = lastId ? 201 : 500;
        res.status(status).json({last_inserted_id: lastId});
    },
    deleteComment: async (req, res) => {
        let count = await commentModel.deleteComment(req.params.commentId)
        let status = count ? 201 : 500;
        res.status(status).json({removed_count: count});
    },
    getComments: async (req, res) => {
        // importera comments med specifikt postid
        res.json(await commentModel.getComments())   
    },
    getComment: async (req, res) => {
        console.log('vi hämtar en kommentar nu :D')
        res.json(await commentModel.getComment(req.params.postId))  
    },
    getUserComments: async (req, res) => {
        res.json(await commentModel.getComment(req.params.postId))
    }
}