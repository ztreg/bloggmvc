const express = require('express');

const jwt = require('jsonwebtoken')

const secret = "hemlighet, ingen får vet" //borde va hashad
const payload = {userid: 1337}
console.log(payload)

// Skapas på nån login route /auth
const token = jwt.sign(payload, secret, {expiresIn : '1s'})
console.log(token)

// /protected
setTimeout(() => {
  try {
    const decrypted = jwt.verify(token, secret)
    console.log(decrypted)
  } catch(error) {
    if(error instanceof jwt.TokenExpiredError) {
      console.log("Log in again fool")
    }
  }

}, 2000);

function myMiddleWare(req, res, next) {
    console.log("middleware")
    next()
  }
