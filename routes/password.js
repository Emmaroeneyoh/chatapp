const router = require('express').Router()
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const { exists } = require('../model/user');
const model = require('../model/user')
const ejs = require('ejs')
const bycrpt = require('bcrypt')
const ObjectId = require('mongoose').Types.ObjectId

//create seceret

const jwt_secret = 'hello'


router.get('/forgot_password', (req,res) => {
    res.render('forgot')
})
router.post('/forgot_password', async (req,res) => {
 const  email = req.body.email
 console.log(email)
 try {
     const people = await model.findOne({email})
     if(people) {
         console.log(people._id, people.username)
         const secret = jwt_secret + people.password
         const payload = {
            email : people.email,
            id : people._id
        }
        const token = jwt.sign(payload, secret, {expiresIn : '50m'})
       const id = people._id
    
        const link = `http://localhost:3000/reset_password/${id}/${token}`
          //nodemailer
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'emmaroeneyoh@gmail.com',
                pass: 'hybrid68van'
            },
            tls: {
              rejectUnauthorized: false
          }
          });

          const data = await ejs.renderFile('./views/email.ejs',{link});

          var mailOptions = {
            from: 'emmaroeneyoh@gmail.com',
            
            to: `${email}`,
            subject: 'one time link',
            text: 'That was easy!',
            html: data
            
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              
            } else {
              console.log('Email sent: ' + info.response);
             
            }
          });
          
        //end nodemailer
        console.log(people, link)
     }
 } catch (error) {
     console.log(error)
 }
 
})
router.get('/reset_password/:id/:token', async (req,res) => {
    const { id, token} = req.params
    console.log(id)
    console.log(ObjectId.isValid(id))
   try {
      const people = await model.findById({_id:id})
      if(people) {
          console.log(people, people._id)
          const secret = jwt_secret + people.password
    const payload = jwt.verify(token,secret)
    res.render('reset', {id, token})
      }
    
   } catch (error) {
       console.log(error.message)
   }
})
router.post('/reset_password/:id/:token', async (req,res) => {
    const { id, token} = req.params
    const { password } = req.body
    console.log(password, id)
    
    try {
        const user = await model.findById({_id:id})
       if(user) {
           console.log(user) 
       } 
       
     
       const secret = jwt_secret + user.password
           const payload = jwt.verify(token,secret)
           user.password = password
          console.log(user)
       const peep =  await user.save()
        console.log(peep)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router