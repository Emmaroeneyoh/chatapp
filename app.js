const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/auth_routing')
const message = require("./model/chat");
const pass = require('./routes/password')
const test = require('./routes/test')
const text = require('./routes/chat')
const cookieParser = require('cookie-parser')
const {user_check} = require('./midleware/mid')
const http = require('http')
const socket = require('socket.io')


const app = express()
const server = http.createServer(app)
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(express.json())
const base = 'mongodb+srv://emmaro:1234@tutorial.klpqo.mongodb.net/nodetut?retryWrites=true&w=majority'


mongoose.connect(base)
.then(() => console.log('database connetced'))


const io = socket(server)

io.on('connection', (socket) => {
    console.log('socket connected', socket.id)
     socket.on("joinroom", (data) => {
        console.log({data, msg})
        socket.join(data.trim()) // join the room
        // message.find()
        // .then((result) => console.log({result}))
     });

    socket.on("message", (msg, roomID) => {
        // send the message to the room
        // this means all members in the room should get the message
        // listen for this message in the same place where you have the [joinroom] function
        socket.to(roomID).emit(msg)
    })
})


app.set('view engine', 'ejs')
server.listen(9000, () => {
    console.log('connected')
})


app.use(express.static('public'))
app.get('*', user_check)
app.use('/authe', router)
app.use(pass)
app.use(test)
app.use(text)