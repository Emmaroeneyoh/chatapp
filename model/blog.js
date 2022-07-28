const mongoose = require('mongoose')
const schema = mongoose.Schema

const blog_schema = new schema({
    title:{
        type:String,
        required:[true, 'please choose title']
    },
    body: {
        type:String,
        required:[true, 'please choose a body']
    },
    peep:{
          type:  mongoose.Schema.Types.ObjectId,
          ref:'Rant'
    }
})

const user_model = mongoose.model('check',blog_schema)

module.exports = user_model