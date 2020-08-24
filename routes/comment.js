const commentRouter = require('express').Router();
const commentController = require('../controllers/commentController');

commentRouter.delete('/delete/:commentId', (req, res) => {
	commentController.deleteComment(req, res);
}); 

commentRouter.get('/:commentId', (req, res ) => {
    console.log('Kom till commentroutern för en comment')
    commentController.getComment(req, res);
})

commentRouter.post('/add/:postId/:userId', (req, res) => {
    console.log('Kom till commentroutern add')
    commentController.addComment(req, res);
});

commentRouter.put('/update/:commentId', (req, res) => {
    commentController.updateComment(req, res);
});



module.exports = commentRouter