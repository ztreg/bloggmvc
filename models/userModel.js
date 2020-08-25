const {User, Comment, Post} = require('../database/mongodb')

module.exports = {
    addUser: async (user) => {
        console.log("adding User with username " + user.username)
        return await User.create({
            Username: user.username,
            Password: user.password
        }).then((document,err ) => {
            if(err) return false;
            return document;
        });
    },
    updateUser: async (userToUpdate) => {
        console.log("making update for: " +userToUpdate.userId)
        return await User.updateOne({_id: userToUpdate.userId},{ $set: userToUpdate}, {useFindAndModify: false, versionKey: false})
            .then((document,err ) => {
                if(err) return false;
                console.log(document)
                return document.n;
            });
    },
    deleteUser: async (UserId) => {
        console.log("trying to remove user with userid " + UserId)
        return await User.deleteOne({_id: UserId})
            .then((document,err ) => {
                if(err) return false;
                return document.deletedCount;
            });
    },
    getUsers: async() => {
            return await User.find({}, {})
    },
    getUser: async(Userinfo) => {
        return await User.findOne(Userinfo)
    },
    getUserComments: async(UserId) => {
        return await Comment.find({UserId: UserId})      
    },
    getUserPosts: async (UserId) => {
        return await Post.find({UserID: UserId})
    }
}