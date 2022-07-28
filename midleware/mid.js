const jason = require('jsonwebtoken')
const model = require('../model/user')

const auth_check = (req, res, next) => {
     const toke = req.cookies.cook;

     if(toke) {
         jason.verify(toke,'mikeyoungman', (err, decodedToken) => {
             if(err) {
                 console.log(err.message)
                res.redirect('/authe/login')  
             } else {
                 console.log(decodedToken)
                 next()
             }
         } )
     } else {
         res.redirect('/authe/login')
     }
}

const user_check = (req, res, next) => {
    
    const toke = req.cookies.cook;
    

    if(toke) {
        jason.verify(toke,'mikeyoungman', async (err, decodedToken) => {
            if(err) {
                console.log(err)
                res.locals.user = null
               next()
            } else {
                console.log(decodedToken)
                const peepo = await model.findById(decodedToken.id)
                res.locals.user = peepo
                req.user = peepo
                
                console.log(req.user)
                next()
            }
        } )
    } else {
        res.locals.user = null
        next()
    }
}




module.exports = {
    auth_check, user_check
}