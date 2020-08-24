const {Post, Comment} = require('../database/mongodb')

module.exports = {
    insertPost: async (title, content, userId) => {
        console.log("adding Post with userid " + userId)
        return await Post.create({
            Postitle: title,
            Postcontent: content,
            UserID: userId
        }).then((document,err ) => {
            if(err) return false;
            return document;
        });
    },
    updatePost: async (title, content, PostId) => {
        console.log("making update for..." +PostId)
        return await Post.findByIdAndUpdate(PostId, {"Postitle": title, "Postcontent": content,}, {useFindAndModify: false, versionKey: false})
            .then((document,err ) => {
                if(err) return false;
                console.log("made update..." + document)
                return document._id;
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
    getPosts: async() => {
            return await Post.find({}, {})
    },
    getPost: async(postId) => {
        return await Post.findOne({_id: postId})
    },
    getPostComments: async(postId) => {
        return await Comment.find({PostId: postId})      
    }
}