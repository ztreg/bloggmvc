const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const {authorization} = require('../middlewares/authorization')

userRouter.delete('/delete/:userId', authorization, userController.deleteUser);

userRouter.get('/:userId/comments', userController.getUserComments)

userRouter.get('/:userId/posts',  userController.getUserPosts)

userRouter.get('/', userController.getUsers);

userRouter.get('/:userId', userController.getUser);

userRouter.post('/add', userController.addUser);

userRouter.patch('/update/:userId', authorization, userController.updateUser)

module.exports = userRouter