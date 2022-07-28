const express = require('express')
const router = express.Router()
const model = require('../model/user')
const jason = require('jsonwebtoken')
const {auth_check, } = require('../midleware/mid')
const fact = require('../model/blog')

//


//

const age = 3* 24*60*60
const create_token = (id) => {
 return jason.sign( {id}, 'mikeyoungman', {
     expiresIn: age
 })
}

const handle_error = (err) => {
    console.log(err.message, err.code)
    let errors = {email:'', password:'', username:'', gender:'',title:'', body:''}

    if(err.code === 11000) {
        errors.email='email exist already'
    }
     if(err.message === 'incorrect email') {
         errors.email = 'email not registered'
     }

     if(err.message === 'incorect password') {
        errors.password = 'incorrect password'
    }
  
    if(err.message.includes('Rant validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]= properties.message
        })
    }
    if(err.message.includes('check validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]= properties.message
        })
    }
        return errors;

}

router.get('/home', auth_check,  (req, res) => {
      fact.find()
      .populate({
          path:'peep', select: 'username'
      })
      .then((result) => {
        res.render('home', {result})
      })
})

router.get('/login',  (req, res) => {
    res.render('login')
    
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const { email, password, username, gender} = req.body
    const number = Math.random()
    try {
        const User =  await model.create({ email, password, username, gender, number})
        const token = create_token(User._id)
        res.cookie('cook', token, {httpOnly:true, maxAge: age*1000})
        console.log(User)
        res.json({User:User._id})
    } catch (err) {
        const errors = handle_error(err)
        res.json({errors})
    }
})
router.post('/login', async (req, res) => {
    const { email, password} = req.body;

    try {
       const old_user = await model.login(email, password)
       const token = create_token(old_user._id)
       res.cookie('cook', token, {httpOnly:true, maxAge: age*1000})
       res.json({old_user:old_user._id}) 
    } catch (err) {
        const errors = handle_error(err)
        res.json({errors})
    }
})
router.get('/logout', (req, res) => {
    res.cookie('cook', '', {maxAge:1})
    res.render('login')
})
router.get('/profile', (req, res) => {
    res.render('profile')
})
router.get('/form/:id', async (req, res) => {
    const id = req.params.id
    try {
        
        res.render('form')
    } catch (error) {
        
    }

})

router.post('/form/:id', async (req, res) => {
    const id = req.params.id 
   

  try {
    const emma = new fact( {
        title : req.body.title,
       body: req.body.body,
       peep : id
      })
      const result = await emma.save()
      res.redirect('/authe/home')
      console.log(result)
  } catch (error) {
   console.log(error)
  }
   
   
    
    


})


module.exports = router