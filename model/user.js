const mongoose = require('mongoose')
const schema = mongoose.Schema
const { isEmail } = require('validator')
const bycrpt = require('bcrypt')

const user_shema = new schema({

    email:{
    type:String,
    required:[true, 'field cant be empty'],
    unique:true,
    
    validate:[isEmail, 'please enter a valid mail address']
     },
     username: {
         type:String,
         required:[true, 'please enter a username'],
         minlength:[4, 'character cant be less than 4']
     },
     number: {
         type:String,
       
     },
     password: {
         type:String,
         required:[true, 'please input a password'],
         minlength:[5, 'password cant be less than 5 digits']
     },
     gender: {
         type:String,
         required:[true, 'choose a gender']
     }
})

user_shema.pre('save', async function(next) {
  const salt = await bycrpt.genSalt()
  this.password = await bycrpt.hash(this.password, salt)
  next()
})

user_shema.statics.login = async function(email, password) {
    const user = await this.findOne({email})

    if(user) {

        const pass = await bycrpt.compare(password,user.password)
        if(pass) {
            return user
        } 
        throw Error('incorect password')
        
    }
    throw Error('incorrect email')
}

const User_model = mongoose.model('Rant', user_shema)

module.exports = User_model