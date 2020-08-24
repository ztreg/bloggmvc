const bcrypt = require('bcryptjs')

// post /register
const passsword = "grillkorv123"
console.log(passsword)
const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync(passsword, salt)
console.log(hash) //spara io databasen
/*
{
    username: "omgomg",
    passswordHash : "goja"
}
*/

// post /login eller post /auth
const passwordAttempt = "grillkorv123"
const success = bcrypt.compareSync(passwordAttempt, hash)
console.log(success)