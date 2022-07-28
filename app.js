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
.then((result) => console.log('base connetced'))


const io = socket(server)

io.on('connection', (socket) => {
    console.log('socket coonected')
     socket.on("joinroom", (data) => {
        message.find()
        .then((result) => console.log(result))
       console.log('room number')
        
     });
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