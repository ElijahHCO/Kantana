const express = require('express');
const passport = require('passport')
const User = require('../models/user');
const router = express();
const userExists = require('../middleware/users/userExists')
const {hashedPassword} = require('../middleware/users/passwordHasser');
const backToProfile = require('../middleware/users/backToProfile')
router.use(passport.session());
router.use(passport.initialize());

//log in
router.post('/login', //this function send the log in request to the passport middlewear
  passport.authenticate('local', { //"local" means with your credentials
  successRedirect: '/users/home',//if login "ok" sends you to users
  failureRedirect: '/home/login', //if you redirect send you back to login
  failureFlash: true //sends the failure message using flash
  }))

//make new user
router.post('/new', userExists , async (req, res)=>{ //to make new user
    const password = hashedPassword(req.body.password) //sending passport to bcrypt middlewear to hash password
    // const hobbies = req.body.hobbies.split(',') //makes and array for hobbies
    req.body.password = password //to save the new ones
    // req.body.hobbies = hobbies //to save the array
    try{
        const newUser = await User.create(req.body) //making the new user
        req.logIn(newUser, (err) => { //req.logIn is a passport middlewear function to log users in
          if (err) { //if error not login 
            console.log(err)
              return next(err);
          }
              return res.redirect('/home/login'); //else login
      })
    }catch(err){ 
        console.log(err)
        res.redirect('/home/register')  //if error send back to register
    }
})


router.get('/', (req, res) =>{
  res.render('main.ejs')
})


//show loginpage
//log in view
router.get('/login', backToProfile, (req, res)=> { //login but if already logged it'll send you back to home because of the backtoProfile function
  res.render('login.ejs')

})

//show register page
///new user view
router.get('/register', backToProfile, (req, res) => { //to register an user , if logged in backtoProfiles sends you home
  res.render("users/signup.ejs")
})







module.exports = router;