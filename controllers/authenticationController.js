require('dotenv').config();
const userModel = require('../models/userModel');
// const { countDocuments } = require('../database/mongodb');
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function createToken (payload) {
    return jwt.sign(payload, secret, {expiresIn : '1h'})
    
}

module.exports = {
    login: async (req, res) => {
        /**
         * Get user with username
         */
        const user = await userModel.getUser({Username: req.body.username})
        if(user) {
            // If we get a match on the username -> check hashed pw
            const checkedPassword = bcrypt.compareSync(req.body.password, user.Password)

            // If we get a match on the password -> return a token to the client
            if(checkedPassword) {
                let token = createToken({userId: user._id, role: user.Role})
                console.log(token)
                res.status(200).json({token: token, msg: "Logged in as " + user.Username + ' med roll: ' + user.Role})

            } else {
                res.status(401).json({msg: "wrong password"})
            }
        } else {
            res.status(404).json({msg: "wrong username"})
        }
    }
}