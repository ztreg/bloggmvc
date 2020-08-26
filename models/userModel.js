const {User, Comment, Post} = require('../database/mongodb')
const jwt = require('jsonwebtoken')

module.exports = {
    addUser: async (user) => {
        console.log("adding User with username " + user.username)
        return await User.create({
            Username: user.username,
            Password: user.password,
            Role: user.role
        }).then((document,err ) => {
            if(err) return false;
            return document;
        });
    },
    updateUser: async (userToUpdate) => {
        return await User.updateOne({_id: userToUpdate.userId},{ $set: userToUpdate}, {useFindAndModify: false, versionKey: false})
        .then((document,err ) => {
            if(err) return false;
            console.log(document)
            return document;
        });
        
    },
    deleteUser: (deleteId) => {
            return User.deleteOne({_id: deleteId})
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
    },
    verifyToken: async (token) => {
        const payload = jwt.verify(token, process.env.SECRET)
        return { 
            ...payload,
            owns(document) {
                return document.UserID === this.userId
            },
            isOwner(document){
                return document._id == this.userId
            },
            isAdmin(){
                return this.role === 'admin'
            },
            isMember() {
                return this.role === 'member'
            },
        }
        
    }
}

