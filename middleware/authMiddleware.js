const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;

    //check json web token exists & is verified
    if (token) {
        jwt.verify(token, ' net ninja seret ',(err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}



// check current user

const checkuser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, ' net ninja seret ',async (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; // res.locals.yourvariablename
                next();
            }
        })

    } else {
        res.locals.user = null;
        next();
        
    }
}

module.exports = { requireAuth, checkuser };