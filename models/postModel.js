const {Post, Comment, User} = require('../database/mongodb')

module.exports = {
    insertPost: async (post) => {
        console.log("adding Post with userid " + post.userId)
        return await Post.create({
            Postitle: post.title,
            Postcontent: post.content,
            UserID: post.userId
        }).then((document,err ) => {
            if(err) return false;
            return document;
        });
    },
    updatePost: async (postToUpdate) => {
        return await Post.updateOne({_id: postToUpdate.PostId}, {$set: postToUpdate}, {useFindAndModify: false, versionKey: false})
            .then((document,err ) => {
                if(err) return false;
                console.log(document)
                return document;
            });
    },
    deletePost: async (PostId) => {
        console.log("removing Post with id" + PostId)
        return await Post.deleteOne({_id: PostId})
            .then((document,err ) => {
                if(err) return false;
                return document.deletedCount;
            });
    },
    getPosts: async(UserID) => {
        if(UserID) {
            return await Post.find({UserID: UserID}, {})
        } else {
            return await Post.find({}, {})
        }
    },
    getPost: async(postId) => {
        return await Post.findOne({_id: postId})
    },
    getPostComments: async(postId) => {
        return await Comment.find({PostId: postId})      
    }
}