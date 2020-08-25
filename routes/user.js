const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const {authorization} = require('../middlewares/authorization')
const {checkUserID} = require('../middlewares/authorization')

userRouter.delete('/delete/:userId', authorization, checkUserID, (req, res) => {
	userController.deleteUser(req, res);
})

userRouter.get('/:userId/comments', (req, res) => {
    console.log('hämta kommentarer för userid' + req.params.userId)
    userController.getUserComments(req, res)
})

userRouter.get('/:userId/posts', (req, res) => {
    console.log('hämta kommentarer för postid' + req.params.postId)
    userController.getUserPosts(req, res)
})

userRouter.get('/', (req, res ) => {
    console.log('Kom till postroutern GET ALL')
    userController.getUsers(req, res);
})

userRouter.get('/:userId', (req, res ) => {
    console.log('Kom till postroutern för en post')
    userController.getUser(req, res);
})

userRouter.post('/add', (req, res) => {
    console.log('Kom till postroutern add')
    userController.addUser(req, res);
});

userRouter.patch('/update/:userId', authorization, checkUserID, userController.updateUser)

module.exports = userRouter