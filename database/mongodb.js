const mongoose = require('mongoose');
const { stringify } = require('querystring');
// const url2 = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
const uri = `mongodb://${process.env.HOST}/${process.env.DATABASE}`;
mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true});
if(!mongoose.connection) {
    console.log("error bro")
    // throw new MongooseError('Could not connect to database')
}

var PostSchema = new mongoose.Schema(
{
    Postitle: {
        type: String
    },  
    Postcontent: {
        type: String
    },
    UserID : {
        type : String
    },
}, 
    {
        timestamps: true
    }
);

var CommentSchema = new mongoose.Schema(
    {
        Commentitle: {
            type: String
        },
        Commentcontent: {
            type: String
        },
        PostID: {
            type: mongoose.Schema.Types.ObjectId,
        },
        UserID : {
            type : mongoose.Schema.Types.ObjectId
        }
    }, 
        {
            timestamps: true
        }
    )
    var UserSchema = new mongoose.Schema(
        {
            Username: {
                type: String
            },
            Password: {
                type: String
            },
        }, 
            {
                timestamps: true
            }
        )

const Post =  mongoose.model("Post", PostSchema)
const Comment = mongoose.model("Comment", CommentSchema)
const User = mongoose.model("User", UserSchema)

module.exports = {Post, Comment, User}

