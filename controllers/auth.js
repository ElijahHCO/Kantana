const express = require('express');
const passport = require('passport')
const User = require('../models/user');
const Instrument = require("../models/instruments")
const router = express();
const userExists = require('../middleware/users/userExists')
const {hashedPassword} = require('../middleware/users/passwordHasser');
const backToProfile = require('../middleware/users/backToProfile')

//log in
router.post('/login', //this function send the log in request to the passport middleware
  passport.authenticate('local', { //"local" means with your credentials  is going to the localStrategy.js
  successRedirect: '/users/home',//if login "ok" sends you to users
  failureRedirect: '/home/login', //if you redirect send you back to login
  failureFlash: true //sends the failure message using flash
  }))

//make new user
router.post('/new', userExists , async (req, res)=>{ //to make new user
    const password = hashedPassword(req.body.password) //sending passport to bcrypt middleware to hash password inside the passwordHasser.js
    req.body.confirmPassword = null;
    req.body.username = '@' + req.body.username
    req.body.password = password                      //to save the new hashed one
    try{
        const newUser = await User.create(req.body) //making the new user
        req.logIn(newUser, (err) => { //req.logIn is a passport middlewear function to log users in using local strategy in the localStrategy.js file
          if (err) { //if error not login 
            console.log(err)
              return next(err);
          }
              return res.redirect('/users/home'); //if no error login user
      })
    }catch(err){ 
        console.log(err)
        res.redirect('/home/register')  //if error send back to register
    }
})


router.get('/', async (req, res) =>{ //this is going to send the user to their profile | the reason why we are not sending information here is because we have authCheck.js that there we made the user into a local variable
    res.render('template.ejs')
})


//show loginpage
//log in view
router.get('/login', backToProfile, (req, res) => { //login but if already logged it'll send you back to home because of the backtoProfile function
  res.render('login.ejs')
})

//show register page
///new user view
router.get('/register', backToProfile, (req, res) => { //to register an user , if logged in backtoProfiles sends you home
  res.render("users/signup.ejs")
})







module.exports = router;