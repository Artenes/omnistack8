const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

//bad solution to store users
//better use key-value store
const connectedUsers = {}

io.on('connection', socket => {
    
    const { user } = socket.handshake.query

    console.log(user, socket.id)

    connectedUsers[user] = socket.id

})

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-g2hwa.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

app.use(cors())
app.use(express.json())
//everything must go before routes
app.use(routes)

server.listen(3333)