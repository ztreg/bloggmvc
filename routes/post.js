const postRouter = require('express').Router();
const postController = require('../controllers/postController');

// const jwt = require("jsonwebtoken");
// 
// PostRouter.get('/api/userOrders', (req, res) => {
// 	console.log('inne i routern')
//   // executes after authenticateToken
//   // ...
// })

postRouter.delete('/delete/:PostId', (req, res) => {
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

postRouter.post('/add/:userId?', (req, res) => {
    console.log('Kom till postroutern add')
    postController.addPost(req, res);
});

postRouter.put('/update/:PostId', (req, res) => {
    postController.updatePost(req, res);
});



module.exports = postRouter