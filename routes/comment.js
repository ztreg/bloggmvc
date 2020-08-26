const commentRouter = require('express').Router();
const commentController = require('../controllers/commentController');
const {authorization} = require('../middlewares/authorization')
const {checkCommentUser} = require('../middlewares/authorization')

commentRouter.delete('/delete/:commentId', authorization, (req, res) => {
	commentController.deleteComment(req, res);
}); 

commentRouter.get('/:commentId', (req, res ) => {
    console.log('Kom till commentroutern för en comment')
    commentController.getComment(req, res);
})

commentRouter.post('/add/:postId/:userId', authorization, (req, res) => {
    console.log('Kom till commentroutern add')
    commentController.addComment(req, res);
});

commentRouter.put('/update/:commentId', authorization, (req, res) => {
    commentController.updateComment(req, res);
});



module.exports = commentRouter