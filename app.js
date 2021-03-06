require('dotenv').config();
const express = require('express');

/**
 * Require routes
 */
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment')
const userRoute = require('./routes/user')
const authenticationRoute = require('./routes/authentication')

const app = express();
const cors = require('cors')

// const frondEnd = require('./routes/frontend');

const path = require('path')
const port = process.env.PORT || 8081;

/**
 * Middleware
 */
// app.use(myMiddleWare)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('./public'))
app.use(cors())

/**
 * Route link
 */
// app.use('/', todoRoute);
app.use('/posts', postRoute);
app.use('/comments', commentRoute);
app.use('/users', userRoute)
app.use('/authentication', authenticationRoute)

app.listen(port, () => {
    console.log(`Listen on ${port}`);
})


