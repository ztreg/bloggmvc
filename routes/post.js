const postRouter = require('express').Router();
const postController = require('../controllers/postController');
const {authorization} = require('../middlewares/authorization')
const {checkUserID} = require('../middlewares/authorization')
const {checkPostUser} = require('../middlewares/authorization')

postRouter.delete('/delete/:PostId', authorization, checkPostUser, (req, res) => {
	postController.deletePost(req, res);
}); 

postRouter.get('/:postId/comments', (req, res) => {
    console.log('hämta kommentarer för postid' + req.params.postId)
    postController.getPostComments(req, res)
})

postRouter.get('/', (req, res ) => {
    console.log('Kom till postroutern GET ALL')
    postController.getPosts(req, res);
})

postRouter.get('/:userId/posts', (req, res ) => {
    console.log('Kom till postroutern GET ALL')
    postController.getUserPosts(req, res);
})

postRouter.get('/:postId', (req, res ) => {
    console.log('Kom till postroutern för en post')
    postController.getPost(req, res);
})

postRouter.post('/add', authorization, postController.addPost);

postRouter.patch('/update/:postId', authorization, checkPostUser, postController.updatePost)



module.exports = postRouter