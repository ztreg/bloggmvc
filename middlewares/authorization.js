require('dotenv').config();
const { verifyToken } = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = {
    authorization: async (req,res,next) => {
        if(!req.headers.authorization) return res.sendStatus(403).json({msg: "No token was sent ;("})
        const token = req.headers.authorization.replace("Bearer ", "")
        try{
            req.user = await verifyToken(token)
            console.log(req.user)
            next()
        }catch(error){
            if(error instanceof jwt.TokenExpiredError){
                res.status(403).json({msg: "Log in again fool"})
            } else {
                res.status(403).json({error: error})
            }
        }
    }
}
