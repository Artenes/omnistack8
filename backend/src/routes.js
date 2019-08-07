const express = require('express')
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const routes = express.Router()

routes.get('/devs', DevController.index)
routes.get('/', (request, response) => {
    return response.send({ message: `Hello, ${request.query.name}! You are so hot today!` })
})

routes.post('/devs', DevController.store)
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DislikeController.store)

module.exports = routes