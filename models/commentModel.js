const {Comment} = require('../database/mongodb');

module.exports = {
    insertComment: async (title, done, postId, userId) => {
        console.log("adding Comment with title " + title)
        return await Comment.create({
            Commentitle: title,
            Commentcontent: done,
            PostID: postId,
            UserID: userId
        }).then((document,err ) => {
            if(err) return false;
            return document;
        });
    },
    updateComment: async (title, content, CommentId) => {
        console.log("making update for..." +CommentId)
        return await Comment.findByIdAndUpdate(CommentId, { "Commentitle": title, "Commentcontent": content}, {useFindAndModify: false, versionKey: false})
            .then((document,err ) => {
                if(err) return false;
                console.log("made update..." + document)
                return document._id;
            });
    },
    deleteComment: async (CommentId) => {
        console.log("removing Comment with id" + CommentId)
        return await Comment.deleteOne({_id: CommentId})
            .then((document,err ) => {
                if(err) return false;
                return document.deletedCount;
            });
    },
    getComments: async() => {
        return await Comment.find({}, {})
    },
    getComment: async(CommentId) => {
        return await Comment.findOne({_id: CommentId}, {})
    }
}