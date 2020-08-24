const {User, Comment, Post} = require('../database/mongodb')

module.exports = {
    addUser: async (username, password) => {
        console.log("adding User with title " + username)
        return await User.create({
            Username: username,
            Password: password
        }).then((document,err ) => {
            if(err) return false;
            return document;
        });
    },
    updateUser: async (username, password, UserId) => {
        console.log("making update for..." +UserId)
        return await User.findByIdAndUpdate(UserId, {"Username": username, "password": password,}, {useFindAndModify: false, versionKey: false})
            .then((document,err ) => {
                if(err) return false;
                console.log("made update..." + document)
                return document._id;
            });
    },
    deleteUser: async (UserId) => {
        console.log("removing User with id" + UserId)
        return await User.deleteOne({_id: UserId})
            .then((document,err ) => {
                if(err) return false;
                return document.deletedCount;
            });
    },
    getUsers: async() => {
            return await User.find({}, {})
    },
    getUser: async(UserId) => {
        return await User.findOne({_id: UserId})
    },
    getUserComments: async(UserId) => {
        return await Comment.find({UserId: UserId})      
    },
    getUserPosts: async (UserId) => {
        return await Post.find({UserID: UserId})
    }
}