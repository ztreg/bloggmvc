const jwt = require('jsonwebtoken')
require('dotenv').config();
const secret = process.env.SECRET
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');
const e = require('express');

module.exports = {
    authorization: (req,res,next) => {
        if(!req.headers.authorization) return res.sendStatus(403)
        const token = req.headers.authorization.replace("Bearer ", "")
        try{
            const payload = jwt.verify(token, secret)
            req.user = payload
            console.log(req.user)
            next()
        }catch(error){
            if(error instanceof jwt.TokenExpiredError){
                res.status(403).json({msg: "Log in again fool"})
            } else {
                res.status(403).json({error: error})
            }
        }
    },
    checkUserID: (req, res, next) => {
        console.log(req.user.userId)
        if(req.user.userId === req.params.userId || req.user.userId === req.body.userId ) {
            console.log('correct user is making the request')
            next()
        } else {
            console.log('incorrect user is making the request')
            res.json({msg: 'incorrect user'})
        }
        
    },
    checkPostUser: async (req, res, next) => {
        const postUser = await postModel.getPost(req.params.PostId)
        console.log(postUser)
        if(postUser) {
            if(postUser.UserID === req.user.userId) {
                console.log('correct user is making the request')
                next()
            } else {
                console.log('incorrect user is making the request')
                res.json({msg: 'incorrect user making edit'})
            }
        } else {
            res.sendStatus(400)
        }


    },
    checkCommentUser: async (req, res, next) => {
        const commentUser = await commentModel.get(req.params.commentId)
        console.log(commentUser)
        if(commentUser) {
            if(commentUser.UserID === req.user.userId) {
                console.log('correct user is making the request')
                next()
            } else {
                console.log('incorrect user is making the request')
                res.json({msg: 'incorrect user making edit'})
            }
        } else {
            res.sendStatus(400)
        }
    }

}
