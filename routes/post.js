const postRouter = require('express').Router();
const postController = require('../controllers/postController');
const {authorization} = require('../middlewares/authorization')
const {checkUserID} = require('../middlewares/authorization')
const {checkPostUser} = require('../middlewares/authorization')



postRouter.get('/:postId/comments', postController.getPostComments)

postRouter.get('/', authorization, postController.getPosts)

postRouter.get('/:userId/posts',  postController.getUserPosts)

postRouter.get('/:postId',  postController.getPost)

postRouter.post('/add', authorization, postController.addPost);

postRouter.delete('/delete/:PostId', authorization, postController.deletePost)

postRouter.patch('/update/:postId', authorization, postController.updatePost)


module.exports = postRouter