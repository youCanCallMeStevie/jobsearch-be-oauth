const express = require('express')
const apiRouter = express.Router()
const userRoutes = require('./users/route')


apiRouter.use('/users',userRoutes)



module.exports = apiRouter