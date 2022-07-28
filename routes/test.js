const router = require('express').Router()
const { body, validationResult , check  } = require('express-validator');
const model = require('../model/user')

router.get('/test',(req,res) => {
    res.render('test')
})

router.post('/test', 
//validate
body('email').custom(email => {
    return model.find(email).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),

//end
(req,res) => {
    const {email, password} = req.body
    console.log(email, password)
     //validate
       
     const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const alert = errors.array()
        console.log(alert)
    
    }else {

    }
     
})
module.exports = router