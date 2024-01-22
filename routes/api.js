// Load the express module
const express = require('express')
// Create an instance of express
const app = express()

// GET Route
app.get('/possibleMoves', (req, res, next) => {

  res.send('i am server')
})
